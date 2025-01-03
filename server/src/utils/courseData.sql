-- First, clear existing data
DELETE FROM courses_interests;
DELETE FROM course;

-- Programming Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'Modern JavaScript Development', 'Master JavaScript ES6+, async programming, and modern development practices.', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', 'John Smith', '10 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Python for Beginners', 'Learn Python programming from scratch with practical projects.', 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0', 'Emma Davis', '8 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Full Stack Web Development', 'Build complete web applications with React and Node.js.', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613', 'Michael Johnson', '12 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Java Programming Masterclass', 'Comprehensive Java course covering core concepts to advanced topics.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 'Sarah Wilson', '14 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Mobile App Development', 'Create iOS and Android apps using React Native.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', 'David Brown', '10 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'C++ Game Development', 'Learn game development principles using C++ and modern frameworks.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Robert Martinez', '16 weeks', 'ADVANCED', 0, 0);

-- Design Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'UI/UX Design Fundamentals', 'Master user interface and experience design principles.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 'Alice Cooper', '8 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Advanced Graphic Design', 'Create stunning visual designs using modern tools and techniques.', 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67', 'Tom Anderson', '10 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Web Design Mastery', 'Learn responsive web design and modern CSS frameworks.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8', 'Emily White', '6 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Motion Graphics Design', 'Create engaging animations and motion graphics.', 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c', 'Chris Taylor', '12 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Brand Identity Design', 'Design compelling brand identities and visual systems.', 'https://images.unsplash.com/photo-1524383902171-424a40d4a3cd', 'Lisa Garcia', '8 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Product Design Workshop', 'Learn end-to-end product design process and methodologies.', 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e', 'Mark Williams', '10 weeks', 'INTERMEDIATE', 0, 0);

-- Business Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'Business Strategy Fundamentals', 'Learn core business strategy and management principles.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'James Wilson', '8 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Entrepreneurship 101', 'Start and grow your own successful business.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', 'Patricia Moore', '12 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Financial Management', 'Master financial planning and management techniques.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f', 'Robert Lee', '10 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Project Management Professional', 'Learn professional project management methodologies.', 'https://images.unsplash.com/photo-1552664730-d307ca884978', 'Susan Taylor', '14 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Business Analytics', 'Use data analytics for better business decisions.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Michael Chen', '8 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Leadership and Management', 'Develop essential leadership and management skills.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', 'Elizabeth Brown', '6 weeks', 'INTERMEDIATE', 0, 0);

-- Marketing Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'Digital Marketing Fundamentals', 'Master the basics of digital marketing.', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07', 'Sarah Johnson', '8 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Social Media Marketing', 'Create effective social media marketing strategies.', 'https://images.unsplash.com/photo-1611926653458-09294b3142bf', 'David Miller', '6 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Content Marketing Strategy', 'Develop compelling content marketing campaigns.', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', 'Jennifer Davis', '10 weeks', 'ADVANCED', 0, 0),
(UUID(), 'SEO and SEM Mastery', 'Master search engine optimization and marketing.', 'https://images.unsplash.com/photo-1571721795195-a2ca2c0950ce', 'Andrew Wilson', '12 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Email Marketing', 'Create successful email marketing campaigns.', 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f', 'Laura Thompson', '6 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Brand Marketing', 'Build and grow strong brand presence.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', 'Richard Clark', '8 weeks', 'ADVANCED', 0, 0);

-- Data Science Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'Data Science Fundamentals', 'Introduction to data science and analytics.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Dr. John Davis', '10 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Machine Learning Basics', 'Learn fundamental machine learning algorithms.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c', 'Dr. Sarah Chen', '12 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Big Data Analytics', 'Master big data processing and analytics.', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0', 'Dr. Michael Lee', '14 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Python for Data Science', 'Use Python for data analysis and visualization.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Emma Wilson', '8 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Deep Learning', 'Advanced neural networks and deep learning.', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', 'Dr. Robert Zhang', '16 weeks', 'ADVANCED', 0, 0),
(UUID(), 'Statistical Analysis', 'Master statistical methods for data science.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Dr. Lisa Wang', '10 weeks', 'INTERMEDIATE', 0, 0);

-- Languages Courses
INSERT INTO course (id, title, description, imageUrl, instructor, duration, level, rating, students) VALUES
(UUID(), 'English for Beginners', 'Learn basic English communication skills.', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d', 'Mary Johnson', '12 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Business Spanish', 'Spanish for professional environments.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', 'Carlos Rodriguez', '10 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'Japanese Language', 'Comprehensive Japanese language course.', 'https://images.unsplash.com/photo-1528164344705-47542687000d', 'Yuki Tanaka', '16 weeks', 'BEGINNER', 0, 0),
(UUID(), 'Mandarin Chinese', 'Learn Mandarin for business and travel.', 'https://images.unsplash.com/photo-1523794728-b31f4796e4f1', 'Li Wei', '20 weeks', 'INTERMEDIATE', 0, 0),
(UUID(), 'French Language', 'Master French language and culture.', 'https://images.unsplash.com/photo-1549877452-9c387954fbc2', 'Sophie Martin', '14 weeks', 'ADVANCED', 0, 0),
(UUID(), 'German for Beginners', 'Learn basic German language skills.', 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b', 'Hans Mueller', '12 weeks', 'BEGINNER', 0, 0);

-- Map each course to exactly one interest
INSERT INTO courses_interests (courseId, interestId)
SELECT c.id, i.id
FROM course c
CROSS JOIN interest i
WHERE 
    (c.title LIKE '%JavaScript%' AND i.name = 'programming') OR
    (c.title LIKE '%Python for Beginners%' AND i.name = 'programming') OR
    (c.title LIKE '%Full Stack%' AND i.name = 'programming') OR
    (c.title LIKE '%Java Programming%' AND i.name = 'programming') OR
    (c.title LIKE '%Mobile App%' AND i.name = 'programming') OR
    (c.title LIKE '%C++ Game%' AND i.name = 'programming') OR
    
    (c.title LIKE '%UI/UX%' AND i.name = 'design') OR
    (c.title LIKE '%Graphic Design%' AND i.name = 'design') OR
    (c.title LIKE '%Web Design%' AND i.name = 'design') OR
    (c.title LIKE '%Motion Graphics%' AND i.name = 'design') OR
    (c.title LIKE '%Brand Identity%' AND i.name = 'design') OR
    (c.title LIKE '%Product Design%' AND i.name = 'design') OR
    
    (c.title LIKE '%Business Strategy%' AND i.name = 'business') OR
    (c.title LIKE '%Entrepreneurship%' AND i.name = 'business') OR
    (c.title LIKE '%Financial Management%' AND i.name = 'business') OR
    (c.title LIKE '%Project Management%' AND i.name = 'business') OR
    (c.title LIKE '%Business Analytics%' AND i.name = 'business') OR
    (c.title LIKE '%Leadership%' AND i.name = 'business') OR
    
    (c.title LIKE '%Digital Marketing%' AND i.name = 'marketing') OR
    (c.title LIKE '%Social Media Marketing%' AND i.name = 'marketing') OR
    (c.title LIKE '%Content Marketing%' AND i.name = 'marketing') OR
    (c.title LIKE '%SEO%' AND i.name = 'marketing') OR
    (c.title LIKE '%Email Marketing%' AND i.name = 'marketing') OR
    (c.title LIKE '%Brand Marketing%' AND i.name = 'marketing') OR
    
    (c.title LIKE '%Data Science%' AND i.name = 'data-science') OR
    (c.title LIKE '%Machine Learning%' AND i.name = 'data-science') OR
    (c.title LIKE '%Big Data%' AND i.name = 'data-science') OR
    (c.title LIKE '%Python for Data%' AND i.name = 'data-science') OR
    (c.title LIKE '%Deep Learning%' AND i.name = 'data-science') OR
    (c.title LIKE '%Statistical%' AND i.name = 'data-science') OR
    
    (c.title LIKE '%English%' AND i.name = 'languages') OR
    (c.title LIKE '%Spanish%' AND i.name = 'languages') OR
    (c.title LIKE '%Japanese%' AND i.name = 'languages') OR
    (c.title LIKE '%Mandarin%' AND i.name = 'languages') OR
    (c.title LIKE '%French%' AND i.name = 'languages') OR
    (c.title LIKE '%German%' AND i.name = 'languages');