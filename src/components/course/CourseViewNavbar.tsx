import React from 'react'

import { motion } from 'framer-motion';
import { GraduationCap, Menu, X ,ChevronLeft} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationDropdown } from '../dashboard/NotificationDropdown';
import { UserProfileDropdown } from '../dashboard/UserProfileDropdown';



export default function CourseViewNavbar({courseTitle}: {courseTitle: string}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return <header className="bg-white shadow-sm">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className='flex items-center gap-4'>
      <button onClick={() => navigate(-1)} className='hover:text-blue-700 transition-all duration-300'>
        <ChevronLeft className="w-4 h-4 text-blue-900"  />
      </button>
      <p className='text-lg font-semibold'>{courseTitle}</p>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationDropdown />
        <UserProfileDropdown />
      </div>
    </div>
  </div>
</header>
    // <motion.nav
    //   initial={{ y: -100 }}
    //   animate={{ y: 0 }}
    //   className="fixed w-full bg-white/90 backdrop-blur-lg shadow-lg z-50"
    // >
    //   <div className="container mx-auto px-4">
    //     <div className="flex items-center justify-between h-20">
          {/* <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-900" />
            <span className="text-2xl font-bold text-blue-900">CourseKori</span>
          </Link> */}

          

      //     <button
      //       className="md:hidden text-blue-900"
      //       onClick={() => setIsMenuOpen(!isMenuOpen)}
      //     >
      //       {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      //     </button>
      //   </div>
      // </div>

      {/* Mobile menu */}
      // {isMenuOpen && (
      //   <motion.div
      //     initial={{ opacity: 0, y: -20 }}
      //     animate={{ opacity: 1, y: 0 }}
      //     exit={{ opacity: 0, y: -20 }}
      //     className="md:hidden bg-white border-t"
      //   >
      //     <div className="container mx-auto px-4 py-4">
      //       <div className="flex flex-col space-y-4">
      //         <MobileNavLink href="#courses">Courses</MobileNavLink>
      //         <MobileNavLink href="#ai-tutor">AI Tutor</MobileNavLink>
      //         <MobileNavLink href="#about">About</MobileNavLink>
      //         <MobileNavLink href="#contact">Contact</MobileNavLink>
              
      //       </div>
      //     </div>
      //   </motion.div>
      // )}
    // </motion.nav>
  
}

