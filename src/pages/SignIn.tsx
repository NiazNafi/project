import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { SignInForm } from '../components/auth/SignInForm';

export function SignIn() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <GraduationCap className="w-10 h-10 text-blue-900" />
              <span className="text-3xl font-bold text-blue-900">CourseKori</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to continue your learning journey</p>
          </div>

          <SignInForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div className="h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90 mix-blend-multiply"></div>
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3"
            alt="Students learning"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white p-12">
            <div className="max-w-xl text-center">
              <h3 className="text-3xl font-bold mb-4">Transform Your Learning Experience</h3>
              <p className="text-lg text-blue-100">
                Join thousands of learners who are advancing their careers with CourseKori's AI-powered education platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}