import mongoose from "mongoose";

const participantScheme = mongoose.Schema({
    userId: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const Participant = mongoose.model("Participant", participantScheme);

export default Participant;