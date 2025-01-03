import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to CourseKori
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Transform your learning journey with AI-powered education
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/explore')}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors"
            >
              Explore Courses
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Meet Your AI Tutor
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: <GraduationCap className="w-12 h-12" />,
              title: "Expert-Led Courses",
              description: "Learn from industry professionals and academic experts"
            },
            {
              icon: <Brain className="w-12 h-12" />,
              title: "AI Personal Tutor",
              description: "24/7 personalized learning assistance powered by AI"
            },
            {
              icon: <BookOpen className="w-12 h-12" />,
              title: "Interactive Learning",
              description: "Engage with dynamic content and real-time feedback"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}