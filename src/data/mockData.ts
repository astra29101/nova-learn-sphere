

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students: number;
  approved: boolean;
  modules: Module[];
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  courseId: string;
  order: number;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  moduleId: string;
  order: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completed: boolean;
  watchedVideos: string[];
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development',
    description: 'Master React from basics to advanced concepts with hands-on projects',
    instructor: 'Sarah Johnson',
    instructorId: 'edu1',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    rating: 4.8,
    students: 1247,
    duration: '12 hours',
    level: 'Intermediate',
    category: 'Web Development',
    approved: true,
    createdAt: '2024-01-01',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to React',
        description: 'Getting started with React fundamentals',
        courseId: '1',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'What is React?',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '10:30',
            moduleId: 'm1',
            order: 1
          },
          {
            id: 'v2',
            title: 'Setting up Development Environment',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '15:20',
            moduleId: 'm1',
            order: 2
          },
          {
            id: 'v3',
            title: 'Creating Your First Component',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '12:45',
            moduleId: 'm1',
            order: 3
          }
        ]
      },
      {
        id: 'm2',
        title: 'Advanced React Concepts',
        description: 'Learn hooks, context, and advanced patterns',
        courseId: '1',
        order: 2,
        videos: [
          {
            id: 'v4',
            title: 'Understanding React Hooks',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '18:30',
            moduleId: 'm2',
            order: 1
          },
          {
            id: 'v5',
            title: 'Context API Deep Dive',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '22:15',
            moduleId: 'm2',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Masterclass',
    description: 'Deep dive into modern JavaScript features and best practices',
    instructor: 'Mike Chen',
    instructorId: 'edu2',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
    rating: 4.9,
    students: 856,
    duration: '8 hours',
    level: 'Beginner',
    category: 'Programming',
    approved: true,
    createdAt: '2024-02-01',
    modules: [
      {
        id: 'm3',
        title: 'ES6 Fundamentals',
        description: 'Learn the core ES6 features',
        courseId: '2',
        order: 1,
        videos: [
          {
            id: 'v6',
            title: 'Arrow Functions and Template Literals',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '14:20',
            moduleId: 'm3',
            order: 1
          },
          {
            id: 'v7',
            title: 'Destructuring and Spread Operator',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '16:45',
            moduleId: 'm3',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles and create stunning user interfaces',
    instructor: 'Emily Davis',
    instructorId: 'edu3',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
    rating: 4.7,
    students: 643,
    duration: '15 hours',
    level: 'Beginner',
    category: 'Design',
    approved: false,
    createdAt: '2024-03-01',
    modules: [
      {
        id: 'm4',
        title: 'Design Principles',
        description: 'Understanding fundamental design concepts',
        courseId: '3',
        order: 1,
        videos: [
          {
            id: 'v8',
            title: 'Color Theory Basics',
            url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '20:30',
            moduleId: 'm4',
            order: 1
          }
        ]
      }
    ]
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'e1',
    studentId: 'student1',
    courseId: '1',
    enrolledAt: new Date('2024-01-15'),
    progress: 65,
    completed: false,
    watchedVideos: ['v1', 'v2']
  },
  {
    id: 'e2',
    studentId: 'student1',
    courseId: '2',
    enrolledAt: new Date('2024-02-01'),
    progress: 100,
    completed: true,
    watchedVideos: ['v6', 'v7']
  }
];

export const mockStudents = [
  {
    id: 'student1',
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: 2,
    completedCourses: 1,
    joinedAt: '2024-01-01'
  },
  {
    id: 'student2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    enrolledCourses: 3,
    completedCourses: 2,
    joinedAt: '2024-01-15'
  }
];
