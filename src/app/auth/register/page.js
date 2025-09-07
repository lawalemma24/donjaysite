

// import Link from "next/link";

// export default function Register() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
//         {/* Header Section */}
//         <div className="py-6 px-4 flex justify-center">
//           <img
//             src="/images/logo.png"
//             alt="Logo"
//             className="w-40 h-auto object-contain"
//           />
//         </div>
        
//         {/* Form Section */}
//         <div className="px-8 py-6">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign Up</h1>
//           <p className="text-gray-600 text-center mb-6">Please enter your details to sign up</p>
          
//           <form className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirm"
//                 type="password"
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//               />
//             </div>
            
           
//             <div className="flex flex-nowrap items-start">
//             <div className="flex items-center h-5 mt-0.5">
//              <input
//                id="terms"
//                 type="checkbox"
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//     />
//   </div>
//   <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
//     I agree with the Terms of Service and <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Privacy Policy</span>
//   </label>
// </div>
            
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-6"
//             >
//               Sign Up
//             </button>
//           </form>

//           <div >

//           <p>Already have an account? <Link href="/auth/login">Sign In</Link></p>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header Section */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-32 md:w-40 h-auto object-cover"
          />
        </div>
        
        {/* Form Section */}
        <div className="px-5 sm:px-6 md:px-8 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-600 text-center text-sm md:text-base mb-4 md:mb-6">Please enter your details to sign up</p>
          
          <form className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5 shrink-0">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree with the Terms of Service and <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-4 md:mt-6"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}