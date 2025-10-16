import { prisma } from './client';

const testUsers = [
  // Students
  {
    id: "user_nazmul_001",
    name: "Nazmul Hossain",
    email: "nazmul@udel.edu",
    role: "USER" as const,
    emailVerified: new Date("2024-08-20"),
  },
  {
    id: "user_jane_002",
    name: "Jane Doe",
    email: "jane@udel.edu",
    role: "USER" as const,
    emailVerified: new Date("2024-08-21"),
  },
  {
    id: "user_bob_003",
    name: "Bob Wilson",
    email: "bob@udel.edu",
    role: "USER" as const,
    emailVerified: new Date("2024-08-22"),
  },
  // Instructors
  {
    id: "instructor_smith_001",
    name: "Dr. Smith",
    email: "smith@udel.edu",
    role: "INSTRUCTOR" as const,
    emailVerified: new Date("2024-08-15"),
  },
  {
    id: "instructor_johnson_002",
    name: "Prof. Johnson",
    email: "johnson@udel.edu",
    role: "INSTRUCTOR" as const,
    emailVerified: new Date("2024-08-16"),
  },
  {
    id: "instructor_bart_003",
    name: "Dr. Bart",
    email: "bart@udel.edu",
    role: "INSTRUCTOR" as const,
    emailVerified: new Date("2024-08-16"),
  },
  // Admin
  {
    id: "admin_001",
    name: "System Admin",
    email: "admin@udel.edu",
    role: "ADMIN" as const,
    emailVerified: new Date("2024-08-10"),
  }
];

const testProfiles = [
  {
    id: "profile_nazmul_001",
    userId: "user_nazmul_001",
    bio: "Computer Science student passionate about web development and databases.",
    profilePic: "https://example.com/avatar1.jpg",
  },
  {
    id: "profile_jane_002",
    userId: "user_jane_002",
    bio: "Software Engineering student interested in mobile development.",
    profilePic: "https://example.com/avatar2.jpg",
  },
  {
    id: "profile_bob_003",
    userId: "user_bob_003",
    bio: null,
    profilePic: null,
  },
  {
    id: "profile_smith_001",
    userId: "instructor_smith_001",
    bio: "Associate Professor of Computer Science specializing in programming fundamentals.",
    profilePic: "https://example.com/avatar3.jpg",
  },
  {
    id: "profile_johnson_002",
    userId: "instructor_johnson_002",
    bio: "Professor of Computer Science, expert in data structures and algorithms.",
    profilePic: "https://example.com/avatar4.jpg",
  },
  {
    id: "profile_admin_001",
    userId: "admin_001",
    bio: "System administrator for the LMS platform.",
    profilePic: "https://example.com/avatar5.jpg",
  },
  {
    id: "profile_bart_003",
    userId: "instructor_bart_003",
    bio: "Associate Professor of Computer Science specializing in introductory programming and web technologies.",
    profilePic: "https://example.com/avatar6.jpg",
  }
];

const testCourses = [
  // Course with multiple assignments and students
  {
    id: "course_cisc108_001",
    title: "Introduction to Programming",
    courseCode: "CISC 108",
    description: "Fundamental concepts of programming using Python.",
    instructorID: "instructor_smith_001",
    dayOfWeek: "MONDAY,WEDNESDAY,FRIDAY",
    startTime: "09:00",
    endTime: "09:50",
    location: "Room 101",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Course with NO assignments (new course)
  {
    id: "course_cisc220_002",
    title: "Data Structures",
    courseCode: "CISC 220",
    description: "Advanced data structures and algorithms.",
    instructorID: "instructor_johnson_002",
    dayOfWeek: "TUESDAY,THURSDAY",
    startTime: "11:00",
    endTime: "12:15",
    location: "Room 205",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Course with only one student enrolled
  {
    id: "course_cisc474_003",
    title: "Web Technologies",
    courseCode: "CISC 474",
    description: "Modern web development frameworks and technologies.",
    instructorID: "instructor_smith_001",
    dayOfWeek: "FRIDAY",
    startTime: "14:00",
    endTime: "16:45",
    location: "Lab 301",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "course_cisc108_004",
    title: "Introduction to Programming",
    courseCode: "CISC 108",
    description: "Fundamental concepts of programming using Python.",
    instructorID: "instructor_bart_003",
    dayOfWeek: "MONDAY,WEDNESDAY",
    startTime: "10:00",
    endTime: "11:15",
    location: "Room 102",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Dr. Bart's CISC 108 - Section 2
  {
    id: "course_cisc108_005",
    title: "Introduction to Programming",
    courseCode: "CISC 108",
    description: "Fundamental concepts of programming using Python.",
    instructorID: "instructor_bart_003",
    dayOfWeek: "TUESDAY,THURSDAY",
    startTime: "13:00",
    endTime: "14:15",
    location: "Room 103",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Dr. Bart's CISC 474 - Section 1
  {
    id: "course_cisc474_006",
    title: "Web Technologies",
    courseCode: "CISC 474",
    description: "Modern web development frameworks and technologies.",
    instructorID: "instructor_bart_003",
    dayOfWeek: "MONDAY,WEDNESDAY,FRIDAY",
    startTime: "15:00",
    endTime: "15:50",
    location: "Lab 302",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Dr. Bart's CISC 474 - Section 2
  {
    id: "course_cisc474_007",
    title: "Web Technologies",
    courseCode: "CISC 474",
    description: "Modern web development frameworks and technologies.",
    instructorID: "instructor_bart_003",
    dayOfWeek: "TUESDAY,THURSDAY",
    startTime: "16:00",
    endTime: "17:15",
    location: "Lab 303",
    startDate: new Date("2024-08-26"),
    endDate: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const testEnrollments = [
  // Multiple students in CISC108
  {
    id: "enrollment_001",
    userId: "user_nazmul_001",
    courseId: "course_cisc108_001",
    status: "ACTIVE" as const,
    enrolledAt: new Date("2024-08-25"),
  },
  {
    id: "enrollment_002",
    userId: "user_jane_002",
    courseId: "course_cisc108_001",
    status: "ACTIVE" as const,
    enrolledAt: new Date("2024-08-25"),
  },
  {
    id: "enrollment_003",
    userId: "user_bob_003",
    courseId: "course_cisc108_001",
    status: "DROPPED" as const,
    enrolledAt: new Date("2024-08-25"),
  },
  // Students in CISC220 (course with no assignments)
  {
    id: "enrollment_004",
    userId: "user_nazmul_001",
    courseId: "course_cisc220_002",
    status: "ACTIVE" as const,
    enrolledAt: new Date("2024-08-26"),
  },
  {
    id: "enrollment_005",
    userId: "user_jane_002",
    courseId: "course_cisc220_002",
    status: "ACTIVE" as const,
    enrolledAt: new Date("2024-08-26"),
  },
  // Only one student in CISC474
  {
    id: "enrollment_006",
    userId: "user_nazmul_001",
    courseId: "course_cisc474_003",
    status: "ACTIVE" as const,
    enrolledAt: new Date("2024-08-27"),
  }
];

const testAssignments = [
  // Multiple assignments for CISC108
  {
    id: "assignment_hello_001",
    title: "Hello World Program",
    description: "Write your first Python program that prints 'Hello, World!'",
    dueDate: new Date("2024-09-15"),
    maxPoints: 50,
    courseId: "course_cisc108_001",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "assignment_variables_002",
    title: "Variables and Data Types",
    description: "Practice with Python variables, strings, and numbers.",
    dueDate: new Date("2024-09-30"),
    maxPoints: 75,
    courseId: "course_cisc108_001",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "assignment_loops_003",
    title: "Loops and Control Flow",
    description: "Implement various loop structures and conditional statements.",
    dueDate: new Date("2024-10-15"),
    maxPoints: 100,
    courseId: "course_cisc108_001",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // One assignment for CISC474
  {
    id: "assignment_react_004",
    title: "React Component Development",
    description: "Build a complete React application with multiple components.",
    dueDate: new Date("2024-11-30"),
    maxPoints: 200,
    courseId: "course_cisc474_003",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  // Note: CISC220 has NO assignments (testing course with no assignments)
];

const testSubmissions = [
  // Multiple submissions for Hello World assignment
  {
    id: "submission_001",
    assignmentId: "assignment_hello_001",
    studentId: "user_nazmul_001",
    content: `def hello_world():
    print("Hello, World!")
    return True

if __name__ == "__main__":
    hello_world()`,
    late: false,
    submittedAt: new Date("2024-09-10"),
    grade: 95.5,
    feedback: "Excellent work! Clean code and meets all requirements.",
  },
  {
    id: "submission_002",
    assignmentId: "assignment_hello_001",
    studentId: "user_jane_002",
    content: `print("Hello, World!")
print("This is my first program")`,
    late: true,
    submittedAt: new Date("2024-09-16"),
    grade: 85.0,
    feedback: "Good work but submitted late. Code is functional but could be more structured.",
  },
  // Submission with no grade yet
  {
    id: "submission_003",
    assignmentId: "assignment_variables_002",
    studentId: "user_nazmul_001",
    content: `name = "Nazmul"
age = 20
print(f"My name is {name} and I am {age} years old")`,
    late: false,
    submittedAt: new Date("2024-09-28"),
    grade: null,
    feedback: null,
  },
  // Late submission with penalty
  {
    id: "submission_004",
    assignmentId: "assignment_variables_002",
    studentId: "user_jane_002",
    content: `student_name = input("Enter your name: ")
student_age = int(input("Enter your age: "))
print("Name:", student_name, "Age:", student_age)`,
    late: true,
    submittedAt: new Date("2024-10-02"),
    grade: 65.0,
    feedback: "Good logic but late submission. Points deducted for tardiness.",
  },
  // Assignment with no submissions yet (assignment_loops_003)
  // React assignment submission
  {
    id: "submission_005",
    assignmentId: "assignment_react_004",
    studentId: "user_nazmul_001",
    content: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`,
    late: false,
    submittedAt: new Date("2024-11-25"),
    grade: null,
    feedback: null,
  }
];

const testAnnouncements = [
  // Multiple announcements for CISC108
  {
    id: "announcement_001",
    title: "Welcome to Introduction to Programming!",
    content: "Welcome everyone! Please review the syllabus and complete the first assignment.",
    courseId: "course_cisc108_001",
    instructorId: "instructor_smith_001",
    createdAt: new Date("2024-08-26"),
  },
  {
    id: "announcement_002",
    title: "Assignment 1 Deadline Reminder",
    content: "Just a reminder that Assignment 1 is due this Sunday. Please submit early to avoid any technical issues.",
    courseId: "course_cisc108_001",
    instructorId: "instructor_smith_001",
    createdAt: new Date("2024-09-12"),
  },
  // Announcement for CISC220 (course with no assignments)
  {
    id: "announcement_003",
    title: "Data Structures Course Introduction",
    content: "Welcome to Data Structures! We'll start with course overview next week. No assignments yet - just come prepared to learn!",
    courseId: "course_cisc220_002",
    instructorId: "instructor_johnson_002",
    createdAt: new Date("2024-08-26"),
  },
  // No announcements for CISC474 (testing course with no announcements)
];

(async () => {
  await prisma.announcement.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.createMany({ data: testUsers, skipDuplicates: true });
  await prisma.profile.createMany({ data: testProfiles, skipDuplicates: true });
  await prisma.course.createMany({ data: testCourses, skipDuplicates: true });
  await prisma.enrollment.createMany({ data: testEnrollments, skipDuplicates: true });
  await prisma.assignment.createMany({ data: testAssignments, skipDuplicates: true });
  await prisma.submission.createMany({ data: testSubmissions, skipDuplicates: true });
  await prisma.announcement.createMany({ data: testAnnouncements, skipDuplicates: true });

  await prisma.$disconnect();
})();