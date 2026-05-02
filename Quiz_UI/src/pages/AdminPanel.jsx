import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Layout, Shield, ArrowLeft, Mail, Calendar, Eye, Trash2, Zap, BarChart3, Database } from "lucide-react";
import API from "../utils/api";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalQuizzes: 0, totalUsers: 0, totalCreators: 0 });
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    if (window.confirm(`Are you sure you want to change user role to ${newRole}?`)) {
      try {
        await API.patch(`/admin/users/${userId}/role`, { role: newRole });
        // Update local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === userId ? {...user, role: newRole} : user
          )
        );
      } catch (err) {
        console.error(err);
        alert("Failed to update user role");
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus === 'banned' ? 'ban' : 'activate'} this user?`)) {
      try {
        await API.patch(`/admin/users/${userId}/status`, { status: newStatus });
        // Update local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === userId ? {...user, status: newStatus} : user
          )
        );
      } catch (err) {
        console.error(err);
        alert("Failed to update user status");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await API.delete(`/admin/users/${userId}`);
        // Remove from local state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      } catch (err) {
        console.error(err);
        alert("Failed to delete user");
      }
    }
  };

  const handleApproveQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to approve this quiz?")) {
      try {
        await API.patch(`/admin/quizzes/${quizId}/approve`, { moderationNotes: "Approved via admin panel" });
        // Update local state
        setQuizzes(prevQuizzes => 
          prevQuizzes.map(quiz => 
            quiz._id === quizId ? {...quiz, status: "approved"} : quiz
          )
        );
      } catch (err) {
        console.error(err);
        alert("Failed to approve quiz");
      }
    }
  };

  const handleRejectQuiz = async (quizId) => {
    const notes = window.prompt("Please provide a reason for rejecting this quiz:");
    if (notes === null) return; // User cancelled
    
    if (notes.trim() === "") {
      alert("Please provide a reason for rejection");
      return;
    }
    
    if (window.confirm("Are you sure you want to reject this quiz?")) {
      try {
        await API.patch(`/admin/quizzes/${quizId}/reject`, { moderationNotes: notes });
        // Update local state
        setQuizzes(prevQuizzes => 
          prevQuizzes.map(quiz => 
            quiz._id === quizId ? {...quiz, status: "rejected"} : quiz
          )
        );
      } catch (err) {
        console.error(err);
        alert("Failed to reject quiz");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, quizzesRes] = await Promise.all([
          API.get("/admin/users/stats"),
          API.get("/admin/users"),
          API.get("/admin/quizzes")
        ]);
        setStats(statsRes.data.data);
        setUsers(usersRes.data.data);
        setQuizzes(quizzesRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30 pb-20">
      {/* HEADER */}
      <div className="sticky top-0 z-[100] bg-[#0a192f]/60 backdrop-blur-2xl border-b border-cyan-500/10 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition">
                <ArrowLeft size={20} /> BACK
            </button>
            <div className="flex items-center gap-3">
                <Shield size={24} className="text-cyan-400" />
                <span className="text-2xl font-black tracking-widest uppercase">Platform Authority</span>
            </div>
            <div className="hidden md:flex gap-4">
                <button 
                    onClick={() => setActiveTab("stats")} 
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'stats' ? 'bg-cyan-500 text-[#0a192f]' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    OVERVIEW
                </button>
                <button 
                    onClick={() => setActiveTab("users")} 
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'users' ? 'bg-cyan-500 text-[#0a192f]' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    USERS
                </button>
                <button 
                    onClick={() => setActiveTab("quizzes")} 
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'quizzes' ? 'bg-cyan-500 text-[#0a192f]' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    QUIZZES
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-16">
        {/* STATS OVERVIEW */}
        {activeTab === "stats" && (
            <div className="space-y-12 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AdminStatCard icon={<Database className="text-cyan-400" />} label="Total Data Points" value={stats.totalQuizzes + stats.totalUsers + stats.totalCreators} color="cyan" />
                    <AdminStatCard icon={<Users className="text-blue-400" />} label="Platform Citizens" value={stats.totalUsers} color="blue" />
                    <AdminStatCard icon={<Shield className="text-purple-400" />} label="Authorized Creators" value={stats.totalCreators} color="purple" />
                </div>

                <div className="bg-[#112240] p-12 rounded-[48px] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10">
                        <BarChart3 className="text-cyan-400" size={32} />
                        <h2 className="text-3xl font-black uppercase tracking-tight">Growth Metrics</h2>
                    </div>
                    <p className="text-cyan-100/40 text-lg mb-8">Platform expansion is currently at 124% capacity compared to last quarter.</p>
                    <div className="h-64 flex items-end gap-2 px-4">
                        {[40, 70, 45, 90, 65, 80, 100, 55, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-cyan-500/20 hover:bg-cyan-500 transition-all rounded-t-xl group relative" style={{ height: `${h}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0a192f] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">Month {i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* USERS LIST */}
        {activeTab === "users" && (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter">Citizens</h2>
                        <p className="text-cyan-100/40 font-medium">Monitoring all authenticated accounts on the network.</p>
                    </div>
                    <div className="text-cyan-400 font-black text-xl">{users.length} TOTAL</div>
                </div>

                 <div className="bg-[#112240] rounded-[48px] border border-white/5 overflow-hidden">
                     <table className="w-full text-left">
                         <thead className="bg-white/5">
                             <tr>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Engineer</th>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Credentials</th>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Role</th>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Joined</th>
                                 <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                             {users.map((u) => (
                                 <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                                     <td className="px-8 py-6">
                                         <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black">
                                                 {u.name.charAt(0).toUpperCase()}
                                             </div>
                                             <span className="font-bold text-lg">{u.name}</span>
                                         </div>
                                     </td>
                                     <td className="px-8 py-6 text-gray-400 font-medium">{u.email}</td>
                                     <td className="px-8 py-6">
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : u.role === 'creator' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                             {u.role}
                                         </span>
                                     </td>
                                     <td className="px-8 py-6">
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.status === 'active' ? 'bg-green-500/20 text-green-400' : u.status === 'banned' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                             {u.status}
                                         </span>
                                     </td>
                                     <td className="px-8 py-6 text-gray-500 text-sm font-bold">{new Date(u.createdAt).toLocaleDateString()}</td>
                                     <td className="px-8 py-6 text-right">
                                         <div className="flex gap-2">
                                             <button 
                                                 onClick={() => handleRoleChange(u._id, u.role === 'admin' ? 'user' : 'admin')}
                                                 className="p-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                             >
                                                 {u.role === 'admin' ? 'Demote' : 'Promote'}
                                             </button>
                                             <button 
                                                 onClick={() => handleStatusChange(u._id, u.status === 'active' ? 'banned' : 'active')}
                                                 className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                             >
                                                 {u.status === 'active' ? 'Ban' : 'Activate'}
                                             </button>
                                             <button 
                                                 onClick={() => handleDeleteUser(u._id)}
                                                 className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                             >
                                                 <Trash2 size={16} />
                                             </button>
                                         </div>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
            </div>
        )}

        {/* QUIZZES & QUESTIONS */}
        {activeTab === "quizzes" && (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter">Resources</h2>
                        <p className="text-cyan-100/40 font-medium">Full repository of deployment modules and questions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {quizzes.map((q) => (
                        <div key={q._id} className={`bg-[#112240] p-10 rounded-[48px] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 ${q.status === 'pending' ? 'border-yellow-500/30' : q.status === 'approved' ? 'border-green-500/30' : 'border-red-500/30'}`}>
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-widest uppercase mb-4 inline-block">
                                        {q.tech}
                                    </span>
                                    <h3 className="text-3xl font-black">{q.title}</h3>
                                </div>
                                <div className="text-right">
                                    <div className="flex flex-col items-end">
                                        <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                                            Status
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${q.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : q.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                                        </div>
                                        <div className="text-xs font-black text-gray-500 uppercase tracking-widest mt-2">
                                            Total Logic Points
                                        </div>
                                        <div className="text-2xl font-black text-white">
                                            {q.questions.length} Questions
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <details className="group">
                                    <summary className="list-none flex items-center gap-2 text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition-colors">
                                        <Eye size={18} /> VIEW QUESTIONS & ANSWERS
                                    </summary>
                                    <div className="mt-6 space-y-4 pt-6 border-t border-white/5">
                                        {q.questions.map((qn, idx) => (
                                            <div key={idx} className="bg-[#0a192f] p-6 rounded-2xl border border-white/5">
                                                <p className="font-bold text-lg mb-2"><span className="text-cyan-500 mr-2">Q{idx+1}.</span> {qn.question}</p>
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {qn.options.map((opt, oIdx) => (
                                                        <span key={oIdx} className={`px-4 py-2 rounded-xl text-xs font-bold border ${opt === qn.answer ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                                                            {opt}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                                {q.status === 'pending' && (
                                    <div className="flex gap-4 pt-6">
                                        <button 
                                            onClick={() => handleApproveQuiz(q._id)}
                                            className="flex-1 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 font-bold hover:bg-green-500 hover:text-white transition-all"
                                        >
                                            APPROVE
                                        </button>
                                        <button 
                                            onClick={() => handleRejectQuiz(q._id)}
                                            className="flex-1 px-6 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            REJECT
                                        </button>
                                    </div>
                                )}
                                {q.status !== 'pending' && (
                                    <div className="pt-4 text-xs font-bold text-gray-400">
                                        {q.moderatedBy ? `Moderated by: ${q.moderatedBy.name}` : 'Not yet moderated'} 
                                        {q.moderatedAt ? ` on ${new Date(q.moderatedAt).toLocaleString()}` : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const AdminStatCard = ({ icon, label, value, color }) => {
    const colors = {
        cyan: "from-cyan-500/20 border-cyan-500/20 text-cyan-400",
        blue: "from-blue-500/20 border-blue-500/20 text-blue-400",
        purple: "from-purple-500/20 border-purple-500/20 text-purple-400"
    };

    return (
        <div className={`bg-gradient-to-br ${colors[color]} to-transparent p-10 rounded-[40px] border flex flex-col items-center text-center group hover:scale-105 transition-all duration-500`}>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                {icon}
            </div>
            <div className="text-5xl font-black mb-2 tracking-tighter text-white">{value}</div>
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{label}</div>
        </div>
    );
};

export default AdminPanel;
