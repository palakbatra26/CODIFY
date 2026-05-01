import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Result from "../models/Result.js";


export const getTotalNumberOf_Q_U_C = async (req, res) => {
    try {
        const allQuiz = await Quiz.find()
        const allUsers = await User.find({ role: "user" })
        const allCreator = await User.find({ role: "creator" })
        const data = {
            totalQuizzes: allQuiz.length,
            totalUsers: allUsers.length,
            totalCreators: allCreator.length
        }
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
    }
}

export const Owner_GetAllUsers = async (req, res) => {
    try {
        const data = await User.find({ role: "user" });
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}

export const Owner_GetAllCreator = async (req, res) => {
    try {
        const data = await User.find({ role: "creator" });
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}

export const Owner_GetAllQuizzes = async (req, res) => {
    try {
        const data = await Quiz.find();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

export const Quiz_by_creator = async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = await Quiz.find({ createdBy: "695932b3aef3f3825c43ce93" })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.id;

        const user = await User.find({ _id: userId });
        res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error)
    }
}

export const getQuizzesByTech = async (req, res) => {
    try {
        const { tech } = req.query;

        if (!tech) {
            return res.status(400).json({ message: "Technology required" });
        }

        const quizzes = await Quiz.find({ tech })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: quizzes,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const user_solvedQuiz = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const quizzes = await Result.find({ userId: id })
//         res.send(quizzes)
//     } catch (error) {
//         console.log(error)
//     }
// }  

export const user_solvedQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await Result.find({ userId: id })
            .populate({
                path: "quizId",
                select: "title tech createdBy",
                populate: {
                    path: "createdBy",
                    select: "name",
                },
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.log(error)
    }
}

export const creator_CreatedQuizzes = async (req, res) => {
    try {
        const { id } = req.params;
        const quizzes = await Quiz.find({ createdBy: id })
        res.json({
            data: quizzes
        })
    } catch (error) {

    }
}



// export const getQuizGrowthData = async (req, res) => {
//     try {
//         const result = await Quiz.aggregate([
//             {
//                 $group: {
//                     _id: { $month: "$createdAt" },
//                     quizzes: { $sum: 1 }
//                 },
//             },
//             { $sort: { "_id": 1 } }
//         ]);

//         const monthNames = [
//             "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//         ];

//         const formattedData = result.map(item => ({
//             month: monthNames[item._id],
//             quizzes: item.quizzes,
//         }));

//         res.status(200).json({ data: formattedData });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }
// }

export const getQuizGrowthData = async (req, res) => {
    try {
        const result = await Quiz.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    quizzes: { $sum: 1 }
                }
            }
        ]);

        const monthNames = [
           "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const monthMap = {};
        result.forEach(item => {
            monthMap[item._id] = item.quizzes;
        });

        const formattedData = monthNames.map((month, index) => ({
            month,
            quizzes: monthMap[index + 1] || 0
        }));

        res.status(200).json({ data: formattedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getTechWiseQuizData = async (req, res) => {
    try {
        const result = await Quiz.aggregate([
            {
                $group: {
                    _id: "$tech",
                    quizzes: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    tech: "$_id",
                    quizzes: 1,
                },
            },
        ]);

        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
