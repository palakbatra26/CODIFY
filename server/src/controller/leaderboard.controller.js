import Result from "../models/Result.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
  
/**
 * GLOBAL TOP USERS
 * Highest average score
 */
export const globalLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          attempts: { $sum: 1 },
          avgScore: { $avg: "$percentage" }
        }
      },
      { $sort: { avgScore: -1 } },
      { $limit: 10 }
    ]);

    const populated = await User.populate(leaderboard, {
      path: "_id",
      select: "name email role"
    });

    res.json({
      success: true,
      data: populated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * QUIZ-WISE LEADERBOARD
 */
export const quizLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;

    const leaderboard = await Result.find({ quizId })
      .sort({ score: -1 })
      .limit(10)
      .populate("userId", "name email");

    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * TOP CREATORS
 * Based on totalAttempts
 */
export const topCreators = async (req, res) => {
  try {
    const creators = await Quiz.aggregate([
      {
        $group: {
          _id: "$createdBy",
          totalQuizzes: { $sum: 1 },
          totalAttempts: { $sum: "$totalAttempts" }
        }
      },
      { $sort: { totalAttempts: -1 } },
      { $limit: 10 }
    ]);

    const populated = await User.populate(creators, {
      path: "_id",
      select: "name email"
    });

    res.json({
      success: true,
      data: populated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
