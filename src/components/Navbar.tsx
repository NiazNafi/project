import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/90 backdrop-blur-lg shadow-lg z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-900" />
            <span className="text-2xl font-bold text-blue-900">CourseKori</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#courses">Courses</NavLink>
            <NavLink href="#ai-tutor">AI Tutor</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <Link 
              to="/sign-in"
              className="text-blue-900 hover:text-blue-800 transition-colors font-medium"
            >
              Sign In
            </Link>
            <button 
              onClick={() => navigate('/sign-up')}
              className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors"
            >
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-blue-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#courses">Courses</MobileNavLink>
              <MobileNavLink href="#ai-tutor">AI Tutor</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
              <Link 
                to="/sign-in"
                className="text-gray-600 hover:text-blue-900 transition-colors font-medium block py-2"
              >
                Sign In
              </Link>
              <button 
                onClick={() => navigate('/sign-up')}
                className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-colors w-full"
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-900 transition-colors font-medium"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-900 transition-colors font-medium block py-2"
    >
      {children}
    </a>
  );
}