import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';

const courses = [
  {
    id: uuidv4(),
    title: 'Web Development Bootcamp',
    description: 'Master full-stack web development with modern technologies including HTML5, CSS3, JavaScript, React, Node.js, and MongoDB. Build real-world projects and deploy them to the cloud.',
    imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3',
    instructor: 'Sarah Johnson',
    duration: '12 weeks',
    level: 'BEGINNER',
    rating: 4.8,
    students: 2456
  },
  {
    id: uuidv4(),
    title: 'Advanced Machine Learning',
    description: 'Deep dive into machine learning algorithms, neural networks, and AI applications. Learn PyTorch, TensorFlow, and implement cutting-edge ML models.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3',
    instructor: 'Dr. Michael Chen',
    duration: '10 weeks',
    level: 'ADVANCED',
    rating: 4.9,
    students: 1823
  },
  {
    id: uuidv4(),
    title: 'Digital Marketing Masterclass',
    description: 'Learn comprehensive digital marketing strategies including SEO, social media marketing, content marketing, and PPC advertising.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    instructor: 'Emily Parker',
    duration: '8 weeks',
    level: 'INTERMEDIATE',
    rating: 4.7,
    students: 3102
  },
  {
    id: uuidv4(),
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn industry-standard tools like Figma and create stunning digital experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3',
    instructor: 'Alex Turner',
    duration: '6 weeks',
    level: 'BEGINNER',
    rating: 4.6,
    students: 1567
  },
  {
    id: uuidv4(),
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native. Create beautiful, native apps for iOS and Android from a single codebase.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3',
    instructor: 'David Wilson',
    duration: '10 weeks',
    level: 'INTERMEDIATE',
    rating: 4.8,
    students: 2089
  }
];

const users = [
  {
    id: uuidv4(),
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123'
  },
  {
    id: uuidv4(),
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    password: 'password123'
  },
  {
    id: uuidv4(),
    email: 'mike.brown@example.com',
    firstName: 'Mike',
    lastName: 'Brown',
    password: 'password123'
  }
];

const interests = [
  { id: uuidv4(), name: 'programming' },
  { id: uuidv4(), name: 'design' },
  { id: uuidv4(), name: 'business' },
  { id: uuidv4(), name: 'marketing' },
  { id: uuidv4(), name: 'data-science' },
  { id: uuidv4(), name: 'languages' }
];

const courseInterestMappings = [
  { courseIndex: 0, interests: ['programming', 'design'] },
  { courseIndex: 1, interests: ['programming', 'data-science'] },
  { courseIndex: 2, interests: ['marketing', 'business'] },
  { courseIndex: 3, interests: ['design'] },
  { courseIndex: 4, interests: ['programming'] }
];

const userInterestMappings = [
  { userIndex: 0, interests: ['programming', 'data-science'] },
  { userIndex: 1, interests: ['design', 'marketing'] },
  { userIndex: 2, interests: ['business', 'programming'] }
];

const enrollments = [
  { userIndex: 0, courseIndex: 0, progress: 75 },
  { userIndex: 0, courseIndex: 1, progress: 30 },
  { userIndex: 1, courseIndex: 2, progress: 100 },
  { userIndex: 1, courseIndex: 3, progress: 50 },
  { userIndex: 2, courseIndex: 0, progress: 90 },
  { userIndex: 2, courseIndex: 4, progress: 25 }
];

const courseRatings = [
  { userIndex: 0, courseIndex: 0, rating: 5 },
  { userIndex: 0, courseIndex: 1, rating: 4 },
  { userIndex: 1, courseIndex: 2, rating: 5 },
  { userIndex: 1, courseIndex: 3, rating: 4 },
  { userIndex: 2, courseIndex: 0, rating: 5 },
  { userIndex: 2, courseIndex: 4, rating: 5 }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await query('DELETE FROM course_ratings');
    await query('DELETE FROM enrollment');
    await query('DELETE FROM courses_interests');
    await query('DELETE FROM user_interests');
    await query('DELETE FROM course');
    await query('DELETE FROM user');
    await query('DELETE FROM interest');

    // Insert interests
    for (const interest of interests) {
      await query(
        'INSERT INTO interest (id, name) VALUES (?, ?)',
        [interest.id, interest.name]
      );
    }

    // Insert users with hashed passwords
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await query(
        'INSERT INTO user (id, email, firstName, lastName, password) VALUES (?, ?, ?, ?, ?)',
        [user.id, user.email, user.firstName, user.lastName, hashedPassword]
      );
    }

    // Insert courses
    for (const course of courses) {
      await query(
        'INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [course.id, course.title, course.description, course.imageUrl, course.instructor, course.duration, course.level, course.rating, course.students]
      );
    }

    // Insert course-interest relationships
    for (const mapping of courseInterestMappings) {
      const courseId = courses[mapping.courseIndex].id;
      for (const interestName of mapping.interests) {
        const interest = interests.find(i => i.name === interestName);
        if (interest) {
          await query(
            'INSERT INTO courses_interests (courseId, interestId) VALUES (?, ?)',
            [courseId, interest.id]
          );
        }
      }
    }

    // Insert user-interest relationships
    for (const mapping of userInterestMappings) {
      const userId = users[mapping.userIndex].id;
      for (const interestName of mapping.interests) {
        const interest = interests.find(i => i.name === interestName);
        if (interest) {
          await query(
            'INSERT INTO user_interests (userId, interestId) VALUES (?, ?)',
            [userId, interest.id]
          );
        }
      }
    }

    // Insert enrollments
    for (const enrollment of enrollments) {
      const id = uuidv4();
      const userId = users[enrollment.userIndex].id;
      const courseId = courses[enrollment.courseIndex].id;
      await query(
        'INSERT INTO enrollment (id, userId, courseId, progress) VALUES (?, ?, ?, ?)',
        [id, userId, courseId, enrollment.progress]
      );
    }

    // Insert course ratings
    for (const rating of courseRatings) {
      const id = uuidv4();
      const userId = users[rating.userIndex].id;
      const courseId = courses[rating.courseIndex].id;
      await query(
        'INSERT INTO course_ratings (id, userId, courseId, rating) VALUES (?, ?, ?, ?)',
        [id, userId, courseId, rating.rating]
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

export { seedDatabase };