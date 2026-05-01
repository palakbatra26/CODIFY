import { technologies } from "../data/technologies";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Cpu, Globe, Layers, Zap } from "lucide-react";

const Subject = () => {
  const navigator = useNavigate();
 
  const scrollToId = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const openQus = (tech) => {
    navigator(`/technology/${tech}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a192f] text-white selection:bg-cyan-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-md text-sm font-bold text-cyan-400 mb-8 animate-bounce-slow">
            <Globe size={16} />
            <span>GLOBAL LEARNING ECOSYSTEM</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85] perspective-1000">
          <span className="block text-cyan-100/20">CHOOSE YOUR</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-2xl">
            MASTERCLASS.
          </span>
        </h1>

        <p className="max-w-3xl text-lg md:text-2xl text-cyan-100/40 leading-relaxed font-medium mb-12">
          Engineered for depth. Each technology below opens a gateway to professional-grade knowledge.
        </p>

        <button
          onClick={() => scrollToId("tech-sec")}
          className="group relative px-12 py-5 rounded-full bg-cyan-500 text-[#0a192f] font-black text-xl overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            SELECT TRACK <ArrowDown className="group-hover:translate-y-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {/* Technologies Section */}
      <div
        id="tech-sec"
        className="max-w-7xl mx-auto px-6 py-32"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">AVAILABLE PATHS</h2>
                <p className="text-cyan-100/40 font-medium text-lg">Pick a technology to start your 20-question deep dive.</p>
            </div>
            <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-3">
                    <Cpu className="text-cyan-500" />
                    <span className="text-sm font-bold text-white">10+ STACKS</span>
                </div>
                <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-3">
                    <Zap className="text-cyan-400" />
                    <span className="text-sm font-bold text-white">INSTANT RESULTS</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              onClick={() => openQus(tech.name)}
              className="group relative perspective-1000 cursor-pointer"
            >
              <div className="relative h-full bg-gradient-to-b from-[#112240] to-[#0a192f] border border-cyan-500/10 rounded-[40px] p-8 transition-all duration-500 preserve-3d group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:border-cyan-500/50 group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)]">
                {/* 3D FLOATING ICON */}
                <div className="mb-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 transform translate-z-10 group-hover:translate-z-20 transition-transform duration-500 shadow-xl overflow-hidden">
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain group-hover:scale-125 transition-transform duration-500" />
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white mb-4 transform translate-z-10 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>

                <p className="text-cyan-100/40 text-sm font-medium leading-relaxed mb-8 transform translate-z-5 group-hover:text-cyan-100/80 transition-colors">
                  {tech.description}
                </p>

                <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm tracking-widest uppercase transform translate-z-10">
                  <span>Start Tracking</span>
                  <Layers size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* BACKGROUND GLOW */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[40px] opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES FOR 3D EFFECTS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .translate-z-10 { transform: translateZ(20px); }
        .translate-z-20 { transform: translateZ(40px); }
        .translate-z-5 { transform: translateZ(10px); }
        .rotate-x-12 { transform: rotateX(10deg); }
        .rotate-y-12 { transform: rotateY(-10deg); }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default Subject;
