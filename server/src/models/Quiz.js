import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true
        },
        answer: {
            type: String,
            required: true
        },
    },
    { _id: false }
);



const quizSchema = new mongoose.Schema({
    tech: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    totalAttempts: {
        type: Number,
        default: 0
    },
    timer: {
        type: Number,
        default: 30 // in minutes
    },
}, { timestamps: true }
)

const Quiz = mongoose.model("Quiz",quizSchema);

export default Quiz;