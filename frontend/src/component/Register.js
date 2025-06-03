import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const RegisterUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setMsg("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setMsg("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        username,
        password
      });

      setMsg("Registration successful! Redirecting to login...");
      
      // Clear form
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response) {
        // Handle different error responses from backend
        switch (error.response.status) {
          case 400:
            setMsg(error.response.data.msg || "Username sudah digunakan");
            break;
          case 500:
            setMsg("Terjadi kesalahan server");
            break;
          default:
            setMsg(error.response.data.msg || "Registrasi gagal");
        }
      } else {
        setMsg("Gagal terhubung ke server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white rounded-full opacity-60 animate-ping delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-70 animate-ping delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300 rounded-full opacity-50 animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Glowing card container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
          {/* Header with gradient text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-white/70 text-sm">Join us and start your journey</p>
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
              <div className="w-4 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
            </div>
          </div>

          <form onSubmit={RegisterUser} className="space-y-6">
            {msg && (
              <div className={`${msg.includes('successful') ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'} border rounded-xl p-3 text-center animate-shake`}>
                <p className="text-sm font-medium">{msg}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <input
                  type="password"
                  placeholder="Enter your password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="relative w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 hover:from-pink-600 hover:via-purple-600 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <div className="text-center">
                <span className="text-white/60 text-sm">Already have an account? </span>
                <Link 
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="flex justify-center mt-6 space-x-4">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
            
        {/* Glowing effects */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-xl opacity-60"></div>
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full blur-sm opacity-60"></div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full blur-sm opacity-60"></div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Register;
