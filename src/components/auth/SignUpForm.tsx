import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import { InterestSelector } from './InterestSelector';
import { AuthService } from '../../services/auth';

export function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        interests: selectedInterests
      });

      if (response.success) {
        toast.success('Successfully registered! Please sign in.');
        navigate('/sign-in');
      } else {
        toast.error(response.error?.message || 'Failed to register');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={<User className="w-5 h-5 text-gray-500" />}
            required
            disabled={isLoading}
          />
          <InputField
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            icon={<User className="w-5 h-5 text-gray-500" />}
            required
            disabled={isLoading}
          />
        </div>

        <InputField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5 text-gray-500" />}
          required
          disabled={isLoading}
        />

        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          required
          disabled={isLoading}
        />

        <InterestSelector
          selectedInterests={selectedInterests}
          onChange={setSelectedInterests}
          disabled={isLoading}
        />

        <div className="space-y-4">
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'} {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/sign-in" className="font-medium text-blue-900 hover:text-blue-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}