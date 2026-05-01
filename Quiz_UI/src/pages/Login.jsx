import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API from "../utils/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
 
      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔀 ROLE-BASED REDIRECTION
      const user = res.data.user;
      if (user.role === "creator") {
        navigate("/creator/dashboard");
      } else {
        navigate("/technology");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-6 selection:bg-cyan-500/30">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112240] p-10 rounded-3xl w-full max-w-[420px] border border-cyan-500/10 shadow-2xl"
      >
        <h1 className="text-4xl text-white mb-8 text-center font-black tracking-tighter">Login</h1>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-[#0a192f] text-white outline-none border border-transparent focus:border-cyan-500 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-[#0a192f] text-white outline-none border border-transparent focus:border-cyan-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-400 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-4 rounded-2xl bg-cyan-600 text-[#0a192f] font-black text-lg hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Access Dashboard"}
        </button>

        <p className="text-cyan-100/40 text-sm text-center mt-6 font-medium">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline font-bold">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
