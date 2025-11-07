import mongoose from "mongoose";

const compareScheme = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    ans: {
        type: [String],
        require: true,
    },
}, {
    timestamps: true
});

const Compare = mongoose.model("Compare", compareScheme);

export default Compare;