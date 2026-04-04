import { useNavigate } from "react-router";
import { Icon } from "@repo/ui/Icon";
import { Button } from "@repo/ui/button";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-8 border border-white/20">
          <div className="text-center space-y-2">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Icon name="Lock" className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Please sign in to your project</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Icon name="Mail" size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Icon name="ShieldCheck" size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
            </div>

            <Button
              type="submit"
              variant="default"
              size="full-size"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <a href="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Create account</a>
          </p>
        </div>
      </div>
    </div>
  );
};
