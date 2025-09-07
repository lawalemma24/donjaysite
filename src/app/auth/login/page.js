
export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header Section */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="w-32 md:w-40 h-auto object-contain" 
          />
        </div>
        
        {/* Form Section */}
        <div className="px-5 sm:px-6 md:px-8 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600 text-center text-sm md:text-base mb-4 md:mb-6">Welcome back! Please enter your details</p>
          
          <form className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--input-label)]" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl border-2 text-[var(--input-text)] placeholder-[var(--input-placeholder)] border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  transition: 'border-color 0.3s var(--ease-fluid), box-shadow 0.3s var(--ease-fluid)'
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--input-label)]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-2xl border-2 text-[var(--input-text)] placeholder-[var(--input-placeholder)] border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  transition: 'border-color 0.3s var(--ease-fluid), box-shadow 0.3s var(--ease-fluid)'
                }}
              />
            </div>
            
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mt-4">
              <div className="flex items-start sm:items-start   xs:items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 border-2 border-[var(--input-border)] rounded-2xl focus:border-[var(--input-border-focus)] focus:ring-0"
                  style={{
                    transition: 'border-color 0.3s var(--ease-fluid), box-shadow 0.3s var(--ease-fluid)'
                  }}
                />
                <label htmlFor="rememberMe" className="text-sm text-[var(--input-label)] whitespace-nowrap ">
                  Remember me
                </label>
              </div>
              
              <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors xs:self-center">
                Forgot Password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-4 md:mt-6"
            >
              Sign in
            </button>
          </form>
          
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Don't have an account?{' '}
              <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}