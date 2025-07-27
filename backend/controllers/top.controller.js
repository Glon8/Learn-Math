import Participant from '../models/participant.model.js';
import { verify } from "../util/token.util.js";

export const signToTop = async (req, res) => {
    const token = req.body.token;

    //token verification before user delition
    const verImage = await verify(token);

    if (!!verImage) {
        const participantModel = new Participant({ userId: verImage?._id });

        try {
            await participantModel.save();

            res.status(200).json({ success: true, message: 'User has been added to top list!' });
        }
        catch (error) {
            console.log('Error in signing to the top list: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in signing to the top list: expired token!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteFromTop = async (req, res) => {
    const token = req.body.token;

    //token verification before user delition
    const verImage = await verify(token);

    if (!!verImage) {
        try {
            await Participant.deleteOne({ userId: verImage?._id });

            res.status(200).json({ success: true, message: 'User has been removed from top list!' });
        }
        catch (error) {
            console.log('Error in removing from the top list: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

export const getTop = async (get, res) => {
    try {
        const scoresPipeline = [
            {
                $lookup: {
                    from: "scores",
                    localField: "userId",
                    foreignField: "userId",
                    as: "participantInfo"
                }
            },
            {
                $match: {
                    "participantInfo.0": { $exists: true }
                }
            },
            {
                $addFields: {
                    scoresArray: {
                        $objectToArray: {
                            $mergeObjects: [
                                {
                                    "sum_substract": { $arrayElemAt: ["$participantInfo.sum_substract", 0] },
                                    "multiply_divide": { $arrayElemAt: ["$participantInfo.multiply_divide", 0] },
                                    "mixed": { $arrayElemAt: ["$participantInfo.mixed", 0] },
                                    "power_root": { $arrayElemAt: ["$participantInfo.power_root", 0] },
                                    "fraction_fractionMixed": { $arrayElemAt: ["$participantInfo.fraction_fractionMixed", 0] },
                                    "forms_sizes": { $arrayElemAt: ["$participantInfo.forms_sizes", 0] },
                                    "exam_basic": { $arrayElemAt: ["$participantInfo.exam_basic", 0] },
                                    "equasions_basic": { $arrayElemAt: ["$participantInfo.equasions_basic", 0] },
                                    "equations_two_more": { $arrayElemAt: ["$participantInfo.equations_two_more", 0] },
                                    "verbal_problems": { $arrayElemAt: ["$participantInfo.verbal_problems", 0] },
                                    "geometry": { $arrayElemAt: ["$participantInfo.geometry", 0] },
                                    "quadratic_equation": { $arrayElemAt: ["$participantInfo.quadratic_equation", 0] },
                                    "circles": { $arrayElemAt: ["$participantInfo.circles", 0] },
                                    "exam_advanced": { $arrayElemAt: ["$participantInfo.exam_advanced", 0] }
                                }
                            ]
                        }
                    }
                }
            },
            {
                $addFields: {
                    validScores: {
                        $filter: {
                            input: "$scoresArray",
                            as: "score",
                            cond: { $ne: ["$$score.v", null] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    averageScore: {
                        $divide: [
                            {
                                $sum: "$validScores.v"
                            },
                            14
                        ]
                    }
                }
            },
            {
                $addFields: {
                    "sum_substract": { $arrayElemAt: ["$participantInfo.sum_substract", 0] },
                    "multiply_divide": { $arrayElemAt: ["$participantInfo.multiply_divide", 0] },
                    "mixed": { $arrayElemAt: ["$participantInfo.mixed", 0] },
                    "power_root": { $arrayElemAt: ["$participantInfo.power_root", 0] },
                    "fraction_fractionMixed": { $arrayElemAt: ["$participantInfo.fraction_fractionMixed", 0] },
                    "forms_sizes": { $arrayElemAt: ["$participantInfo.forms_sizes", 0] },
                    "exam_basic": { $arrayElemAt: ["$participantInfo.exam_basic", 0] },
                    "equasions_basic": { $arrayElemAt: ["$participantInfo.equasions_basic", 0] },
                    "equations_two_more": { $arrayElemAt: ["$participantInfo.equations_two_more", 0] },
                    "verbal_problems": { $arrayElemAt: ["$participantInfo.verbal_problems", 0] },
                    "geometry": { $arrayElemAt: ["$participantInfo.geometry", 0] },
                    "quadratic_equation": { $arrayElemAt: ["$participantInfo.quadratic_equation", 0] },
                    "circles": { $arrayElemAt: ["$participantInfo.circles", 0] },
                    "exam_advanced": { $arrayElemAt: ["$participantInfo.exam_advanced", 0] }
                }
            },
            {
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "averageScore": 1,
                    "sum_substract": 1,
                    "multiply_divide": 1,
                    "mixed": 1,
                    "power_root": 1,
                    "fraction_fractionMixed": 1,
                    "forms_sizes": 1,
                    "exam_basic": 1,
                    "equasions_basic": 1,
                    "equations_two_more": 1,
                    "verbal_problems": 1,
                    "geometry": 1,
                    "quadratic_equation": 1,
                    "circles": 1,
                    "exam_advanced": 1
                }
            },
            {
                $sort: { averageScore: -1 }
            },
            {
                $limit: 10
            }
        ];

        const usersPipeline = [
            {
                $addFields: {
                    userObjectId: { $toObjectId: "$userId" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userObjectId",
                    foreignField: "_id",
                    as: "check"
                }
            },
            {
                $match: {
                    "check.0": { $exists: true }
                }
            },
            {
                $unwind: "$check"
            },
            {
                $project: {
                    "_id": "$check._id",
                    "name": "$check.name"
                }
            }
        ];

        const scores = await Participant.aggregate(scoresPipeline);
        const users = await Participant.aggregate(usersPipeline);

        const box = {
            users: users,
            scores: scores
        }

        res.status(200).json({ success: true, message: 'Top list has been loaded!', data: box });
    }
    catch (error) {
        console.log('Error in retreiving the top: ' + error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}