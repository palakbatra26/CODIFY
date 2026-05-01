// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AnswerContextProvider } from "./context/AnswersContext";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Subject from "./pages/Subject";
// import Qus from "./pages/Qus";
// import Result from "./components/Result";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CreateQuiz from "./pages/CreateQuiz";
// import CreatorRoute from "./components/CreatorRoute";
// import CreatorDashboard from "./pages/CreatorDashboard";
// import Navbar from "./components/Navbar";
// import TechQuizzes from "./pages/TechQuizzes";
// import Profile from "./pages/Profile";
// import QuizSolvers from "./pages/QuizSolvers";
// import UserRoute from "./components/UserRoutes";
// import UserHeader from "./components/UserHeader";


// const App = () => {
//   return (
//     <AnswerContextProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* ---------------- PUBLIC ---------------- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* ---------------- USER ONLY ---------------- */}
//           <Route
//             path="/technology"
//             element={
//               <ProtectedRoute>
//                 <UserRoute>
//                   <>
//                     <UserHeader />
//                     <Subject />
//                   </>
//                 </UserRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/technology/:tech"
//             element={
//               <ProtectedRoute>
//                 <UserRoute>
//                   <>
//                     <UserHeader />
//                     <TechQuizzes />
//                   </>
//                 </UserRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/quiz/:quizId"
//             element={
//               <ProtectedRoute>
//                 <UserRoute>
//                   <>
//                     <UserHeader />
//                     <Qus />
//                   </>
//                 </UserRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/result"
//             element={
//               <ProtectedRoute>
//                 <UserRoute>
//                   <>
//                     <UserHeader />
//                     <Result />
//                   </>
//                 </UserRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <UserRoute>
//                   <>
//                     <Profile />
//                   </>
//                 </UserRoute>
//               </ProtectedRoute>
//             }
//           />

//           {/* ---------------- CREATOR ONLY ---------------- */}
//           <Route
//             path="/creator/dashboard"
//             element={
//               <ProtectedRoute>
//                 <CreatorRoute>
//                   <CreatorDashboard />
//                 </CreatorRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/creator"
//             element={
//               <ProtectedRoute>
//                 <CreatorRoute>
//                   <CreateQuiz />
//                 </CreatorRoute>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/creator/quiz/:quizId"
//             element={
//               <ProtectedRoute>
//                 <CreatorRoute>
//                   <QuizSolvers />
//                 </CreatorRoute>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AnswerContextProvider>
//   );
// };

// export default App;










import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { AnswerContextProvider } from "./context/AnswersContext";

// -------- LAZY PAGES --------
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Subject = lazy(() => import("./pages/Subject"));
const TechQuizzes = lazy(() => import("./pages/TechQuizzes"));
const Qus = lazy(() => import("./pages/Qus"));
const Result = lazy(() => import("./components/Result"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateQuiz = lazy(() => import("./pages/CreateQuiz"));
const CreatorDashboard = lazy(() => import("./pages/CreatorDashboard"));
const QuizSolvers = lazy(() => import("./pages/QuizSolvers"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

// -------- COMPONENTS --------
import LazyWrapper from "./components/LazyWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatorRoute from "./components/CreatorRoute";
import UserRoute from "./components/UserRoutes";
import UserHeader from "./components/UserHeader";

const App = () => {
  return (
    <AnswerContextProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<LazyWrapper><Home /></LazyWrapper>} />
          <Route path="/login" element={<LazyWrapper><Login /></LazyWrapper>} />
          <Route path="/register" element={<LazyWrapper><Register /></LazyWrapper>} />

          {/* USER */}
          <Route
            path="/technology"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <>
                      <UserHeader />
                      <Subject />
                    </>
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/technology/:tech"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <>
                      <UserHeader />
                      <TechQuizzes />
                    </>
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <>
                      <UserHeader />
                      <Qus />
                    </>
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <>
                      <UserHeader />
                      <Result />
                    </>
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <Profile />
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <Leaderboard />
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <UserRoute>
                  <LazyWrapper>
                    <AdminPanel />
                  </LazyWrapper>
                </UserRoute>
              </ProtectedRoute>
            }
          />

          {/* CREATOR */}
          <Route
            path="/creator/dashboard"
            element={
              <ProtectedRoute>
                <CreatorRoute>
                  <LazyWrapper>
                    <CreatorDashboard />
                  </LazyWrapper>
                </CreatorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/creator"
            element={
              <ProtectedRoute>
                <CreatorRoute>
                  <LazyWrapper>
                    <CreateQuiz />
                  </LazyWrapper>
                </CreatorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/creator/quiz/:quizId"
            element={
              <ProtectedRoute>
                <CreatorRoute>
                  <LazyWrapper>
                    <QuizSolvers />
                  </LazyWrapper>
                </CreatorRoute>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AnswerContextProvider>
  );
};

export default App;
