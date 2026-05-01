import { Link } from "react-router-dom";
import { Code, Brain, Rocket, CheckCircle, ArrowRight, Zap, Trophy, Users, Star, Terminal, Shield, Sparkles, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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
    <div className="min-h-screen w-full bg-[#0a192f] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      {/* ADVANCED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-teal-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-75"></div>
      </div>

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0a192f]/60 backdrop-blur-2xl px-6 md:px-16 py-5 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
            <Terminal size={22} className="text-white" />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 tracking-tighter">
            CODIFY
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-400">
            <a href="#how-it-works" className="hover:text-cyan-400 transition">WORKFLOW</a>
            <a href="#features" className="hover:text-cyan-400 transition">FEATURES</a>
            <a href="#community" className="hover:text-cyan-400 transition">COMMUNITY</a>
        </div>

        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="relative group px-6 py-2.5 text-sm font-black text-white bg-cyan-600 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-600/20">
             <span className="relative z-10">GET STARTED</span>
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-black tracking-widest mb-10 animate-fade-in shadow-[0_0_20px_rgba(6,182,212,0.1)] uppercase">
          <Sparkles size={14} className="animate-spin-slow" />
          <span>Next Generation Learning</span>
        </div>
        
        <h1 className="text-7xl md:text-[140px] font-black tracking-tighter mb-8 leading-[0.8] animate-fade-in-up">
          <span className="opacity-40">BEYOND</span> <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-700 drop-shadow-2xl">
            CODING.
          </span>
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl text-cyan-100/60 mb-14 leading-relaxed font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Stop memorizing syntax. Start building intuition. Codify is the first engineering-first platform designed to test your logical depth.
        </p>

        <div className="flex flex-col sm:row gap-6 mb-32 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={handleStartLearning}
            className="group relative px-12 py-6 rounded-full bg-cyan-500 text-[#0a192f] font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(6,182,212,0.3)]"
          >
            LAUNCH JOURNEY
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D INTERACTIVE MOCKUP */}
        <div 
            className="w-full max-w-6xl rounded-[40px] border border-cyan-500/20 bg-[#112240] p-3 shadow-2xl relative transition-transform duration-500 ease-out"
            style={{ 
                transform: `perspective(1000px) rotateX(${Math.max(0, 20 - scrollY * 0.05)}deg) scale(${Math.min(1, 0.8 + scrollY * 0.0005)})`,
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
            }}
        >
            <div className="rounded-[30px] overflow-hidden bg-gradient-to-br from-[#112240] to-[#0a192f] aspect-video flex flex-col items-center justify-center relative group">
                <div className="absolute top-10 left-10 flex gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070" 
                    alt="Mockup" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <Code size={120} className="text-cyan-400/20 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-700" />
                    <div className="mt-10 text-xl font-black tracking-widest text-cyan-400/10 uppercase group-hover:text-cyan-400/60 transition-all">SYSTEM_READY</div>
                </div>
            </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3D CARDS */}
      <section id="how-it-works" className="py-40 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-cyan-500">THE WORKFLOW.</h2>
            <p className="text-cyan-100/40 text-xl font-medium">Simple steps to elite level engineering.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <WorkStep 
                num="01" 
                title="CHOOSE DOMAIN" 
                desc="Select from our high-density tech stacks including JavaScript, React, and MongoDB."
                icon={<Globe className="text-cyan-400" />}
            />
            <WorkStep 
                num="02" 
                title="ANALYZE LOGIC" 
                desc="Solve 20 high-priority questions designed to find your logical blind spots."
                icon={<Brain className="text-cyan-300" />}
            />
            <WorkStep 
                num="03" 
                title="GET CERTIFIED" 
                desc="Review results instantly and track your growth on your global developer profile."
                icon={<Shield className="text-cyan-200" />}
            />
         </div>
      </section>

      {/* COMMUNITY STATS */}
      <section id="community" className="py-40 border-y border-cyan-500/10 bg-cyan-500/[0.02]">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-16">
            <div className="max-w-xl text-center md:text-left">
                <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">TRUSTED BY <br /><span className="text-cyan-400">10,000+</span> DEVS.</h2>
                <p className="text-cyan-100/60 text-xl leading-relaxed">Join a community of builders who value depth over surface-level knowledge.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                <StatCard label="Quizzes Solved" value="542,019" />
                <StatCard label="Elite Creators" value="1,290" />
                <StatCard label="Avg. Score" value="74%" />
                <StatCard label="Global Rank" value="#12" />
            </div>
         </div>
      </section>

      {/* FEATURES - GRID */}
      <section id="features" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
                <div className="absolute -inset-10 bg-cyan-600/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative rounded-[40px] border border-cyan-500/10 bg-[#112240] p-12 overflow-hidden shadow-2xl">
                    <Trophy size={60} className="text-cyan-400 mb-8" />
                    <h3 className="text-4xl font-black mb-6 italic text-white">REWARDING EXCELLENCE.</h3>
                    <p className="text-cyan-100/60 text-lg leading-relaxed mb-8">Our leaderboard tracks your speed and accuracy. Only the top 1% achieve the Elite Badge.</p>
                    <div className="flex gap-4">
                        {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Users size={20} className="text-cyan-500" /></div>)}
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <FeatureRow 
                    icon={<Zap size={24} className="text-cyan-400" />}
                    title="Real-time Analytics"
                    desc="Detailed breakdown of your performance by technology and category."
                />
                <FeatureRow 
                    icon={<Rocket size={24} className="text-cyan-400" />}
                    title="Career Accelerator"
                    desc="Use your Codify profile to prove your technical depth to top employers."
                />
                <FeatureRow 
                    icon={<Code size={24} className="text-cyan-400" />}
                    title="Creator Tools"
                    desc="Powerful interface for creators to build and scale their own quiz ecosystems."
                />
            </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-60 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-600/5 -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 text-white">READY TO <br /><span className="text-cyan-500">ASCEND?</span></h2>
            <button 
                onClick={handleStartLearning}
                className="px-16 py-8 rounded-full bg-cyan-500 text-[#0a192f] font-black text-2xl hover:bg-cyan-400 hover:scale-110 active:scale-95 transition-all shadow-3xl shadow-cyan-500/50"
            >
                START YOUR TRIAL
            </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 border-t border-cyan-500/10 px-6 bg-[#081b33]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="max-w-xs">
                <div className="text-3xl font-black mb-6 text-cyan-400">CODIFY.</div>
                <p className="text-cyan-100/40 leading-relaxed">The premium engineering platform for the modern developer era.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
                <FooterLinks title="Platform" links={["Technologies", "Quizzes", "Pricing", "API"]} />
                <FooterLinks title="Company" links={["About", "Careers", "Blog", "Privacy"]} />
                <FooterLinks title="Community" links={["Discord", "Twitter", "GitHub", "Events"]} />
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-cyan-500/10 flex flex-col md:flex-row justify-between items-center gap-6 text-cyan-100/40 text-sm font-medium">
            <span>© 2026 CODIFY PLATFORM. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
                <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
                <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
            </div>
        </div>
      </footer>

      {/* STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

const WorkStep = ({ num, title, desc, icon }) => (
    <div className="group p-10 rounded-[40px] bg-[#112240] border border-cyan-500/10 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] text-9xl font-black text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-colors">{num}</div>
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 flex items-center justify-center mb-8 border border-cyan-500/10 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 tracking-tight text-white">{title}</h3>
        <p className="text-cyan-100/40 leading-relaxed font-medium group-hover:text-cyan-100/80 transition-colors">{desc}</p>
    </div>
);

const StatCard = ({ label, value }) => (
    <div className="p-8 rounded-3xl bg-[#112240] border border-cyan-500/10 text-center group hover:bg-cyan-500/5 transition-colors">
        <div className="text-3xl font-black mb-1 tracking-tighter text-cyan-400 group-hover:scale-105 transition-transform">{value}</div>
        <div className="text-xs font-black text-cyan-100/40 uppercase tracking-widest">{label}</div>
    </div>
);

const FeatureRow = ({ icon, title, desc }) => (
    <div className="flex gap-8 group">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-[#0a192f] transition-all">
            {icon}
        </div>
        <div>
            <h4 className="text-2xl font-black mb-2 text-white">{title}</h4>
            <p className="text-cyan-100/40 leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
);

const FooterLinks = ({ title, links }) => (
    <div className="flex flex-col gap-6">
        <h5 className="text-xs font-black text-cyan-100/40 uppercase tracking-widest">{title}</h5>
        <div className="flex flex-col gap-4 text-cyan-100/40 font-bold">
            {links.map(l => <span key={l} className="hover:text-cyan-400 cursor-pointer transition-colors">{l}</span>)}
        </div>
    </div>
);

export default Home;