"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import {
  Lock,
  Mail,
  GraduationCap,
  BookOpen,
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const handleAuth = async (e) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    if (isLogin) {
      // ============ SIGN IN ============
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const { user } = data;

      // Fetch user profile to get role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error("Could not fetch user profile");
      }

      // Redirect based on role using else-if chain
      if (profile.role === "student") {
        router.push("/dashboard/student");
      } else if (profile.role === "teacher") {
        router.push("/dashboard/teacher");
      } else if (profile.role === "administrator") {
        router.push("/dashboard/admin");
      } else {
        throw new Error("Invalid user role");
      }
    } else {
      // ============ SIGN UP ============
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const { user } = data;

      // Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: fullName,
        role,
      });

      if (profileError) {
        console.error("Profile insert error:", profileError);
        throw new Error("Failed to create profile: " + profileError.message);
      }

      // Insert into user_details table (institution and education level)
      const { error: detailsError } = await supabase.from("user_details").insert({
        user_id: user.id,
        institution,
        education_level: educationLevel,
      });

      if (detailsError) {
        console.error("User details insert error:", detailsError);
        throw new Error("Failed to save user details: " + detailsError.message);
      }

      alert("Signup successful! Please login.");
      setIsLogin(true);
      
      // Clear form fields
      setEmail("");
      setPassword("");
      setFullName("");
      setInstitution("");
      setEducationLevel("");
      setRole("student");
    }
  } catch (err) {
    setError(err.message || "An error occurred");
    console.error("Auth error:", err);
  } finally {
    setIsLoading(false);
  }
};

  const roleIcons = {
    student: <GraduationCap className="w-5 h-5" />,
    teacher: <BookOpen className="w-5 h-5" />,
    administrator: <Shield className="w-5 h-5" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-200/40 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-green-100/60 rounded-full blur-3xl bottom-0 left-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-green-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center relative">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Join Us"}
              </h2>
              <p className="text-green-50 text-sm">
                {isLogin ? "Sign in to your account" : "Create your new account"}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3.5 bg-green-50/50 border-2 border-green-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600/60 group-focus-within:text-green-600 transition-colors pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-green-50/50 border-2 border-green-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600/60 group-focus-within:text-green-600 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-green-50/50 border-2 border-green-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600/60 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Signup-only fields */}
            {!isLogin && (
              <>
                {/* Full Name */}

                {/* Institution Name */}
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold block">Institution Name</label>
                  <input
                    type="text"
                    placeholder="Your school or university"
                    className="w-full px-4 py-3.5 bg-green-50/50 border-2 border-green-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                  />
                </div>

                {/* Education Level */}
                {role === "student" && (
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold block">Education Level</label>
                  <select
                    className="w-full px-4 py-3.5 bg-green-50/50 border-2 border-green-200 rounded-xl text-gray-800 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    required
                    
                  >
                    <option value="" disabled>Select level</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                    ))}
                    <option value="College/University">College/University</option>
                  </select>
                </div>
                )}

                {/* Role selector */}
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold block">Select Your Role</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["student", "teacher", "administrator"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                          role === r
                            ? "border-green-500 bg-green-50 shadow-lg shadow-green-200/50"
                            : "border-green-200 bg-white hover:bg-green-50/50"
                        }`}
                      >
                        <div className={`${role === r ? "text-green-600" : "text-gray-500"}`}>
                          {roleIcons[r]}
                        </div>
                        <span className={`text-xs font-semibold capitalize ${role === r ? "text-green-700" : "text-gray-600"}`}>
                          {r}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm text-center font-medium">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleAuth}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>

            {/* Toggle auth mode */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="text-green-700 hover:text-green-800 text-sm font-semibold transition-colors inline-flex items-center gap-2 group"
              >
                {isLogin ? (
                  <>
                    Need an account?
                    <span className="underline decoration-2 underline-offset-4 group-hover:text-emerald-700">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span className="underline decoration-2 underline-offset-4 group-hover:text-emerald-700">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-green-200/40 to-emerald-200/40 blur-3xl rounded-3xl transform scale-105"></div>
      </div>
    </div>
  );
}
