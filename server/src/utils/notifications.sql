-- First create the sample user if they don't exist
INSERT INTO user (id, email, firstName, lastName, password, createdAt, updatedAt)
SELECT 'f6ef226d-7f24-439f-8e6f-327da64c8322', 'john.doe@example.com', 'John', 'Doe', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4oL4EcPmOm', NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM user WHERE id = 'f6ef226d-7f24-439f-8e6f-327da64c8322'
);

-- Then create the notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS notification (
  id CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  title VARCHAR(191) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') NOT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Now add the sample notifications
INSERT INTO notification (id, userId, title, message, type, isRead) VALUES
(UUID(), 'f6ef226d-7f24-439f-8e6f-327da64c8322', 'Welcome to CourseKori!', 'Start exploring our courses to begin your learning journey.', 'info', false),
(UUID(), 'f6ef226d-7f24-439f-8e6f-327da64c8322', 'Course Recommendation', 'Based on your interests, check out our new Python course!', 'success', false)
