"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation.js";
import { 
  Home, 
  Brain,
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Briefcase, 
  User, 
  Bell, 
  LogOut,
  Target,
  Upload,
  CheckCircle,
  Clock,
  Award,
  Leaf,
  TrendingUp,
  Users,
  Bot
} from "lucide-react";
import QuizGenerator from "./QuizGenerator.jsx";
import RealtimeChat from "./RealtimeChat.jsx";

export default function StudentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState({
    ecoPoints: 0,
    level: "school",
    classroom: null,
    rank: 0,
    completedTasks: 0,
    pendingSubmissions: 0,
    environmentalImpact: {
      co2Saved: 0,
      treesPlanted: 0,
      plasticReduced: 0
    }
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [learningPaths, setLearningPaths] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showEcoBot, setShowEcoBot] = useState(false);
  const [ecoBotInput, setEcoBotInput] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchLearningPaths();
    fetchSubmissions();
    fetchOpportunities();
    fetchNotifications();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      // Fetch student profile from Firestore/Supabase
      // This is a mock - replace with actual Firestore calls
      setStudentData({
        ecoPoints: 1250,
        level: "college",
        classroom: "ENV-101-A",
        rank: 12,
        completedTasks: 24,
        pendingSubmissions: 3,
        environmentalImpact: {
          co2Saved: 45.5,
          treesPlanted: 8,
          plasticReduced: 12.3
        }
      });
    }
  };

  const fetchLearningPaths = () => {
    // Mock data - replace with Firestore fetch
    setLearningPaths([
      { id: 1, title: "Water Conservation Basics", progress: 75, difficulty: "Beginner", points: 100 },
      { id: 2, title: "Renewable Energy Systems", progress: 30, difficulty: "Intermediate", points: 150 },
      { id: 3, title: "Sustainable Agriculture", progress: 0, difficulty: "Advanced", points: 200 }
    ]);
  };

  const fetchSubmissions = () => {
    // Mock data
    setSubmissions([
      { id: 1, action: "Planted 5 trees in local park", status: "approved", points: 150, date: "2025-10-01" },
      { id: 2, action: "Organized beach cleanup", status: "pending", points: 200, date: "2025-10-02" },
      { id: 3, action: "Created recycling program", status: "under_review", points: 180, date: "2025-10-03" }
    ]);
  };

  const fetchOpportunities = () => {
    // Mock data
    setOpportunities([
      { id: 1, title: "Green Peace Internship", ngo: "GreenPeace", duration: "3 months", minPoints: 1000 },
      { id: 2, title: "Wildlife Conservation Volunteer", ngo: "WWF", duration: "2 weeks", minPoints: 500 },
      { id: 3, title: "Climate Action Ambassador", ngo: "Climate Reality", duration: "6 months", minPoints: 1500 }
    ]);
  };

  const fetchNotifications = () => {
    // Mock data
    setNotifications([
      { id: 1, message: "Your tree planting submission was approved! +150 points", time: "2 hours ago", read: false },
      { id: 2, message: "New opportunity: Green Peace Internship", time: "5 hours ago", read: false },
      { id: 3, message: "You've reached Rank 12 on the leaderboard!", time: "1 day ago", read: true }
    ]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, sender: "user", time: new Date() }]);
      setChatInput("");
      // Simulate community response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Great question! I'm working on something similar.", 
          sender: "other", 
          name: "Alex K.",
          time: new Date() 
        }]);
      }, 1000);
    }
  };

  const sendEcoBotMessage = () => {
    if (ecoBotInput.trim()) {
      setChatMessages([...chatMessages, { text: ecoBotInput, sender: "user", time: new Date() }]);
      setEcoBotInput("");
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Based on your progress, I recommend focusing on the Water Conservation module next. You're doing great with 1250 EcoPoints!", 
          sender: "bot", 
          time: new Date() 
        }]);
      }, 1500);
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}! 🌱</h2>
        <p className="text-green-100">You're making a real difference. Keep up the amazing work!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">EcoPoints</p>
              <p className="text-2xl font-bold text-gray-800">{studentData.ecoPoints}</p>
            </div>
            <Award className="text-yellow-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Leaderboard Rank</p>
              <p className="text-2xl font-bold text-gray-800">#{studentData.rank}</p>
            </div>
            <Trophy className="text-blue-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{studentData.completedTasks}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{studentData.pendingSubmissions}</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Leaf className="text-green-600" />
          Your Environmental Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{studentData.environmentalImpact.co2Saved} kg</p>
            <p className="text-gray-600 text-sm mt-1">CO₂ Reduced</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{studentData.environmentalImpact.treesPlanted}</p>
            <p className="text-gray-600 text-sm mt-1">Trees Equivalent</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{studentData.environmentalImpact.plasticReduced} kg</p>
            <p className="text-gray-600 text-sm mt-1">Plastic Saved</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Recent Submissions</h3>
        <div className="space-y-3">
          {submissions.slice(0, 3).map(sub => (
            <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {sub.status === "approved" && <CheckCircle className="text-green-500" size={20} />}
                {sub.status === "pending" && <Clock className="text-orange-500" size={20} />}
                {sub.status === "under_review" && <TrendingUp className="text-blue-500" size={20} />}
                <div>
                  <p className="font-medium text-gray-800">{sub.action}</p>
                  <p className="text-sm text-gray-500">{sub.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                sub.status === "approved" ? "bg-green-100 text-green-700" :
                sub.status === "pending" ? "bg-orange-100 text-orange-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {sub.status === "approved" ? `+${sub.points}` : sub.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Personalized Learning Paths</h2>
        <p className="text-gray-600 mb-6">AI-curated modules tailored for {studentData.level} level</p>
        
        <div className="space-y-4">
          {learningPaths.map(path => (
            <div key={path.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{path.title}</h3>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {path.difficulty}
                  </span>
                </div>
                <span className="text-green-600 font-bold">{path.points} pts</span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-800 font-medium">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
              </div>
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                {path.progress > 0 ? "Continue Learning" : "Start Module"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Action */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Upload className="text-green-600" />
          Submit Eco-Action
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action Description</label>
            <textarea 
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="3"
              placeholder="Describe your environmental action..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence (Photo/Video)</label>
            <input 
              type="file" 
              className="w-full border rounded-lg p-2"
              accept="image/*,video/*"
            />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
            Submit for AI Verification
          </button>
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Community Leaderboard
      </h2>
      
      <div className="space-y-3">
        {[
          { rank: 1, name: "Sarah Chen", points: 2850, avatar: "SC" },
          { rank: 2, name: "Marcus Johnson", points: 2640, avatar: "MJ" },
          { rank: 3, name: "Emily Rodriguez", points: 2420, avatar: "ER" },
          { rank: 12, name: "You", points: studentData.ecoPoints, avatar: "ME", highlight: true }
        ].map(student => (
          <div 
            key={student.rank}
            className={`flex items-center justify-between p-4 rounded-lg ${
              student.highlight ? "bg-green-50 border-2 border-green-500" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                student.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                student.rank === 2 ? "bg-gray-300 text-gray-700" :
                student.rank === 3 ? "bg-orange-400 text-orange-900" :
                "bg-gray-200 text-gray-600"
              }`}>
                {student.rank}
              </div>
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                {student.avatar}
              </div>
              <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-500">{student.points} EcoPoints</p>
              </div>
            </div>
            {student.rank <= 3 && (
              <Trophy className={
                student.rank === 1 ? "text-yellow-500" :
                student.rank === 2 ? "text-gray-400" :
                "text-orange-400"
              } size={24} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="text-blue-600" />
          Community Chat
        </h2>
        
        <div className="border rounded-lg h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                }`}>
                  {msg.sender === "other" && <p className="text-xs font-bold mb-1">{msg.name}</p>}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Type a message..."
            />
            <button 
              onClick={sendChatMessage}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Briefcase className="text-purple-600" />
        NGO Opportunities
      </h2>
      
      <div className="space-y-4">
        {opportunities.map(opp => (
          <div key={opp.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{opp.title}</h3>
                <p className="text-gray-600 text-sm mt-1">by {opp.ngo}</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                {opp.duration}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Minimum Required:</p>
              <p className="text-gray-800 font-medium">{opp.minPoints} EcoPoints</p>
            </div>
            
            <button 
              disabled={studentData.ecoPoints < opp.minPoints}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                studentData.ecoPoints >= opp.minPoints
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {studentData.ecoPoints >= opp.minPoints ? "Apply Now" : `Need ${opp.minPoints - studentData.ecoPoints} more points`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
          <select className="w-full border rounded-lg p-3">
            <option value="school">School</option>
            <option value="college">College</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Classroom Code</label>
          <input 
            type="text"
            value={studentData.classroom || ""}
            className="w-full border rounded-lg p-3"
            placeholder="Enter classroom code"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
          <input 
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="e.g., Climate Change, Renewable Energy"
          />
        </div>
        
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">EcoMentor</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={24} className="text-gray-700" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-4 top-20 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b">
              <h3 className="font-bold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notif => (
                <div 
                  key={notif.id}
                  className={`p-4 border-b hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}
                >
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 space-y-2 sticky top-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "home" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </button>
              
              <button
                onClick={() => setActiveTab("learning")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "learning" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BookOpen size={20} />
                <span className="font-medium">Learning</span>
              </button>
              <button
                  onClick={() => setActiveTab("quiz")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "quiz" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                  <Brain size={20} />
                  <span className="font-medium">AI Quizzes</span>
              </button>
              
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "leaderboard" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Trophy size={20} />
                <span className="font-medium">Leaderboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab("community")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "community" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MessageSquare size={20} />
                <span className="font-medium">Community</span>
              </button>
              
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "opportunities" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Briefcase size={20} />
                <span className="font-medium">Opportunities</span>
              </button>
              
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "profile" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={20} />
                <span className="font-medium">Profile</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === "home" && renderHome()}
            {activeTab === "learning" && renderLearning()}
            {activeTab === "leaderboard" && renderLeaderboard()}
            {activeTab === "community" && <RealtimeChat />}
            {activeTab === "opportunities" && renderOpportunities()}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "quiz" && <QuizGenerator />}
          </div>
        </div>
      </div>

      {/* EcoBot Floating Button */}
      <button
        onClick={() => setShowEcoBot(!showEcoBot)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        <Bot size={28} />
      </button>

      {/* EcoBot Chat Window */}
      {showEcoBot && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-2xl border overflow-hidden z-50">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <h3 className="font-bold">EcoBot Assistant</h3>
            </div>
            <button 
              onClick={() => setShowEcoBot(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
            <div className="flex justify-start">
              <div className="max-w-xs p-3 rounded-lg bg-white shadow-sm">
                <p className="text-sm">Hi! I'm EcoBot 🌱 Ask me about your progress, learning paths, or eco-actions!</p>
              </div>
            </div>
            
            {chatMessages.filter(m => m.sender === "user" || m.sender === "bot").map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user" 
                    ? "bg-green-600 text-white" 
                    : "bg-white text-gray-800 shadow-sm"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-3 bg-white">
            <div className="flex gap-2">
              <input 
                type="text"
                value={ecoBotInput}
                onChange={(e) => setEcoBotInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendEcoBotMessage()}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ask EcoBot..."
              />
              <button 
                onClick={sendEcoBotMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}