import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '../ui/Button';

export function SocialSignIn() {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        fullWidth
        onClick={() => {/* Handle Google sign in */}}
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        fullWidth
        onClick={() => {/* Handle GitHub sign in */}}
      >
        <Github className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>
    </div>
  );
}