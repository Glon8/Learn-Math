import { Double } from "bson";
import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    sum_substract: {
        type: Double
    },
    multiply_divide: {
        type: Double
    },
    mixed: {
        type: Double
    },
    power_root: {
        type: Double
    },
    fraction_fractionMixed: {
        type: Double
    },
    forms_sizes: {
        type: Double
    },
    exam_basic: {
        type: Double
    },
    equasions_basic: {
        type: Double
    },
    equations_two_more: {
        type: Double
    },
    verbal_problems: {
        type: Double
    },
    geometry: {
        type: Double
    },
    quadratic_equation: {
        type: Double
    },
    circles: {
        type: Double
    },
    exam_advanced: {
        type: Double
    }
}, {
    timestamps: true
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;