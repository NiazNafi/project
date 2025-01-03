import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { CourseService, Course } from '../services/course';
import { CourseGrid } from '../components/explore/CourseGrid';
import { FilterTabs } from '../components/explore/FilterTabs';
import { SearchInput } from '../components/explore/SearchInput';

export function ExploreCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [selectedInterest, searchQuery, courses]);

  const loadCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      setCourses(response);
      setFilteredCourses(response);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    // Apply interest filter
    if (selectedInterest !== 'all') {
      filtered = filtered.filter(course => course.interestName === selectedInterest);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Explore Our Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Discover courses that match your interests and goals
          </motion.p>
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <FilterTabs 
          selectedInterest={selectedInterest}
          onSelectInterest={setSelectedInterest}
          courses={courses}
        />
        
        <CourseGrid courses={filteredCourses} />
      </div>
    </div>
  );
}