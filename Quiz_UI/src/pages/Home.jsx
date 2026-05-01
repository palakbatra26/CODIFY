import { Link } from "react-router-dom";
import { Code, Brain, Rocket, CheckCircle, ArrowRight, Zap, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const handleStartLearning = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (user.role === "user") {
      navigate("/technology");
      return;
    }

    if (user.role === "creator") {
      navigate("/creator/dashboard");
      return;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* GLOW BACKGROUND EFFECTS */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* HEADER / NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md px-6 md:px-16 py-4 flex justify-between items-center">
        <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tighter">
          CODIFY
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium hover:text-blue-400 transition">Login</Link>
          <Link to="/register" className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-gray-200 transition">Join Now</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold mb-8 animate-fade-in">
          <Zap size={16} fill="currentColor" />
          <span>TRANSFORM YOUR CODING LOGIC</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
          Master The <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            Fundamentals.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          The ultimate platform for developers to sharpen their core skills through precision-engineered quizzes across all modern tech stacks.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={handleStartLearning}
            className="group px-10 py-5 rounded-full bg-blue-600 font-bold text-lg flex items-center gap-3 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/20"
          >
            Get Started Free
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#features"
            className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm font-bold text-lg hover:bg-white/10 transition"
          >
            Explore Platform
          </a>
        </div>

        {/* MOCKUP PREVIEW */}
        <div className="mt-24 w-full max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 shadow-2xl animate-float">
            <div className="rounded-xl overflow-hidden aspect-video bg-gray-900 flex items-center justify-center border border-white/5">
                <Code size={80} className="text-blue-500/20 animate-pulse" />
            </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <StatItem label="Active Users" value="10k+" />
            <StatItem label="Quizzes Taken" value="50k+" />
            <StatItem label="Tech Stacks" value="10+" />
            <StatItem label="Success Rate" value="98%" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Designed for Growth.</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Everything you need to move from a beginner to a confident senior developer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<Brain className="text-blue-400" size={32} />}
                title="Deep Concept Learning"
                text="We don't test syntax. We test your logical understanding of how things actually work under the hood."
            />
            <FeatureCard 
                icon={<Trophy className="text-yellow-400" size={32} />}
                title="Real-time Feedback"
                text="Get instant results and detailed explanations for every answer to fix your mistakes immediately."
            />
            <FeatureCard 
                icon={<Users className="text-purple-400" size={32} />}
                title="Creator Ecosystem"
                text="Built for the community. Anyone can contribute high-quality quizzes and track user performance."
            />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="text-2xl font-black mb-8 opacity-50">CODIFY</div>
        <p className="text-gray-500 text-sm">© 2026 CoDiFy Platform. All rights reserved.</p>
      </footer>

      {/* STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

const StatItem = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
);

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{text}</p>
  </div>
);

export default Home;