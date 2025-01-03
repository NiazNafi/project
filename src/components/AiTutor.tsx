import { motion } from 'framer-motion';
import { Bot, MessageSquare, Brain, Zap } from 'lucide-react';

export function AiTutor() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Bot className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Meet Your AI Tutor</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience personalized learning with our advanced AI tutor that adapts to your pace and style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <MessageSquare className="w-8 h-8" />,
              title: "24/7 Support",
              description: "Get instant answers to your questions anytime, anywhere"
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: "Adaptive Learning",
              description: "AI analyzes your progress and adjusts the curriculum accordingly"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Interactive Practice",
              description: "Engage in dynamic exercises tailored to your skill level"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8"
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors">
            Try AI Tutor Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}