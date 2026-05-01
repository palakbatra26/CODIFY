import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes.js";
import authRoutes from "./routes/auth.route.js";
import { protect, creatorOnly } from "./middleware/auth.middleware.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import resultRoutes from './routes/result.route.js'
import ownerRoutes from './routes/owner.routes.js'

const app = express();

app.use(cors()); // Allow all origins for deployment
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Codify Backend v2.0 - Active 🚀");
});

// API routes
app.use("/api/quizzes", quizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/results", resultRoutes);
app.use('/api/owner',ownerRoutes)



app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user,
    });
});

app.get("/api/creator-test", protect, creatorOnly, (req, res) => {
    res.json({
        message: "You are a creator",
    });
});




export default app;
