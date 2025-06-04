// Mock API functions and types for the LMS application

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  progress: Record<string, number>;
  joinDate: string;
}

export interface Educator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  coursesCreated: string[];
  totalStudents: number;
  rating: number;
  joinDate: string;
}

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
  order: number;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  order: number;
  watched?: boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin';
}

// Mock data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: ['1', '2'],
    completedCourses: ['3'],
    progress: { '1': 45, '2': 78 },
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    enrolledCourses: ['2', '3'],
    completedCourses: ['1'],
    progress: { '2': 90, '3': 23 },
    joinDate: '2024-02-10'
  }
];

export const mockEducators: Educator[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah@example.com',
    bio: 'Expert in web development with 10+ years experience',
    expertise: ['JavaScript', 'React', 'Node.js'],
    coursesCreated: ['1', '2'],
    totalStudents: 1250,
    rating: 4.8,
    joinDate: '2023-06-01'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch with modern technologies including HTML, CSS, JavaScript, React, Node.js, and databases.',
    instructor: 'Dr. Sarah Wilson',
    instructorId: '1',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    price: 99.99,
    duration: '40 hours',
    level: 'Beginner',
    category: 'Web Development',
    rating: 4.8,
    students: 1250,
    approved: true,
    modules: [
      {
        id: 'm1',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the basics of HTML and CSS to create stunning web pages',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'Introduction to HTML',
            url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
            duration: '15:30',
            order: 1
          },
          {
            id: 'v2',
            title: 'CSS Styling Basics',
            url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
            duration: '20:45',
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'JavaScript Programming',
        description: 'Master JavaScript programming from basics to advanced concepts',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'JavaScript Variables and Functions',
            url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
            duration: '25:15',
            order: 1
          },
          {
            id: 'v4',
            title: 'DOM Manipulation',
            url: 'https://www.youtube.com/watch?v=5fb2aPlgoys',
            duration: '30:20',
            order: 2
          }
        ]
      }
    ],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'React Development Masterclass',
    description: 'Build modern, responsive web applications using React, Redux, and modern JavaScript',
    instructor: 'Dr. Sarah Wilson',
    instructorId: '1',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    price: 149.99,
    duration: '35 hours',
    level: 'Intermediate',
    category: 'Web Development',
    rating: 4.9,
    students: 850,
    approved: true,
    modules: [
      {
        id: 'm3',
        title: 'React Fundamentals',
        description: 'Learn React components, props, and state management',
        order: 1,
        videos: [
          {
            id: 'v5',
            title: 'React Components and JSX',
            url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
            duration: '18:45',
            order: 1
          }
        ]
      }
    ],
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning',
    instructor: 'Prof. John Smith',
    instructorId: '2',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    price: 79.99,
    duration: '28 hours',
    level: 'Beginner',
    category: 'Data Science',
    rating: 4.7,
    students: 920,
    approved: false,
    modules: [],
    createdAt: '2024-03-01'
  }
];

// Mock API functions
export const fetchStudents = async (): Promise<Student[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStudents), 500);
  });
};

export const fetchEducators = async (): Promise<Educator[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEducators), 500);
  });
};

export const fetchCourses = async (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 500);
  });
};

export const fetchCourseById = async (id: string): Promise<Course | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === id) || null;
      resolve(course);
    }, 300);
  });
};
