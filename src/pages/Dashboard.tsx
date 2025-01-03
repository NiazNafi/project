import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CourseService, Course, DashboardData } from '../services/course';
import { ContinueLearning } from '../components/dashboard/ContinueLearning';
import { RecommendedCourses } from '../components/dashboard/RecommendedCourses';
import { ExploreSkills } from '../components/dashboard/ExploreSkills';
import { SearchBar } from '../components/dashboard/SearchBar';
import { UserProfileDropdown } from '../components/dashboard/UserProfileDropdown';
import { NotificationDropdown } from '../components/dashboard/NotificationDropdown';

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-in');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const data = await CourseService.getDashboardData();
      setDashboardData(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <SearchBar />
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {dashboardData?.continueLearning.length > 0 && (
          <ContinueLearning courses={dashboardData.continueLearning} />
        )}

        <RecommendedCourses courses={dashboardData?.recommended || []} />
        
        {dashboardData?.exploreNewSkills.length > 0 && (
          <ExploreSkills courses={dashboardData.exploreNewSkills} />
        )}
      </main>
    </div>
  );
}