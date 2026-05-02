import Quiz from "../models/Quiz.js";

/**
 * GET ALL QUIZZES FOR MODERATION - Admin only
 */
export const getAllQuizzesForModeration = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, tech, search } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (tech) filter.tech = tech;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { tech: { $regex: search, $options: "i" } }
      ];
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const quizzes = await Quiz.find(filter)
      .populate("createdBy", "name email")
      .populate("moderatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Quiz.countDocuments(filter);
    
    res.json({
      success: true,
      data: quizzes,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET QUIZ BY ID FOR MODERATION - Admin only
 */
export const getQuizByIdForModeration = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("moderatedBy", "name email");
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE QUIZ - Admin only
 */
export const approveQuiz = async (req, res) => {
  try {
    const { moderationNotes } = req.body;
    
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        moderationNotes: moderationNotes || "",
        moderatedBy: req.user.userId,
        moderatedAt: new Date()
      },
      { new: true }
    )
    .populate("createdBy", "name email")
    .populate("moderatedBy", "name email");
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.json({
      success: true,
      message: "Quiz approved successfully",
      data: quiz
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REJECT QUIZ - Admin only
 */
export const rejectQuiz = async (req, res) => {
  try {
    const { moderationNotes } = req.body;
    
    if (!moderationNotes || moderationNotes.trim() === "") {
      return res.status(400).json({ message: "Moderation notes are required for rejection" });
    }
    
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        moderationNotes: moderationNotes,
        moderatedBy: req.user.userId,
        moderatedAt: new Date()
      },
      { new: true }
    )
    .populate("createdBy", "name email")
    .populate("moderatedBy", "name email");
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.json({
      success: true,
      message: "Quiz rejected successfully",
      data: quiz
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET QUIZ MODERATION STATISTICS - Admin only
 */
export const getQuizStats = async (req, res) => {
  try {
    const stats = await Quiz.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const techStats = await Quiz.aggregate([
      {
        $group: {
          _id: "$tech",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalQuizzes = await Quiz.countDocuments();
    
    res.json({
      success: true,
      data: {
        totalQuizzes,
        byStatus: stats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        byTech: techStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};