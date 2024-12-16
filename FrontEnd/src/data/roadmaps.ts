import { Code2, Palette, Server, Smartphone, Brain, Database } from 'lucide-react';

export const roadmaps = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'A comprehensive roadmap from beginner to professional full-stack developer',
    icon: Code2,
    color: 'from-blue-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=800',
    nodes: [
      {
        id: '1',
        type: 'custom',
        data: {
          label: 'Full-Stack Development Fundamentals',
          description: 'Core concepts and foundation of full-stack development',
          marketDemand: 'Very High',
          averageSalary: '$90,000 - $150,000',
          requiredSkills: ['Problem Solving', 'Logical Thinking', 'Computer Science Basics']
        }
      },
      // Development Basics - Left Branch
      {
        id: '2',
        type: 'custom',
        data: {
          label: 'Programming Fundamentals',
          description: 'Basic programming concepts and principles',
          marketDemand: 'Essential',
          averageSalary: '$70,000 - $90,000',
          requiredSkills: ['Variables', 'Data Types', 'Control Flow', 'Functions']
        }
      },
      {
        id: '3',
        type: 'custom',
        data: {
          label: 'Version Control',
          description: 'Git and version control systems',
          marketDemand: 'High',
          averageSalary: '$75,000 - $95,000',
          requiredSkills: ['Git', 'GitHub', 'Branching', 'Collaboration']
        }
      },
      // Development Environment - Right Branch
      {
        id: '4',
        type: 'custom',
        data: {
          label: 'Development Tools',
          description: 'Essential development tools and environments',
          marketDemand: 'High',
          averageSalary: '$80,000 - $100,000',
          requiredSkills: ['VS Code', 'Terminal', 'Package Managers', 'DevTools']
        }
      },
      {
        id: '5',
        type: 'custom',
        data: {
          label: 'Web Protocols',
          description: 'Understanding web protocols and standards',
          marketDemand: 'High',
          averageSalary: '$85,000 - $110,000',
          requiredSkills: ['HTTP/HTTPS', 'REST', 'WebSocket', 'APIs']
        }
      },
      // Frontend Path - Left Branch
      {
        id: '6',
        type: 'custom',
        data: {
          label: 'Frontend Fundamentals',
          description: 'Core frontend technologies',
          marketDemand: 'Very High',
          averageSalary: '$80,000 - $120,000',
          requiredSkills: ['HTML5', 'CSS3', 'JavaScript']
        }
      },
      {
        id: '7',
        type: 'custom',
        data: {
          label: 'Modern JavaScript',
          description: 'Advanced JavaScript concepts and ES6+',
          marketDemand: 'Very High',
          averageSalary: '$90,000 - $130,000',
          requiredSkills: ['ES6+', 'Async/Await', 'Modules', 'DOM']
        }
      },
      {
        id: '8',
        type: 'custom',
        data: {
          label: 'Frontend Frameworks',
          description: 'Popular frontend frameworks and libraries',
          marketDemand: 'Very High',
          averageSalary: '$100,000 - $150,000',
          requiredSkills: ['React', 'Vue', 'Angular']
        }
      },
      // Backend Path - Right Branch
      {
        id: '9',
        type: 'custom',
        data: {
          label: 'Backend Fundamentals',
          description: 'Core backend development concepts',
          marketDemand: 'Very High',
          averageSalary: '$90,000 - $140,000',
          requiredSkills: ['Server Architecture', 'APIs', 'Authentication']
        }
      },
      {
        id: '10',
        type: 'custom',
        data: {
          label: 'Backend Languages',
          description: 'Server-side programming languages',
          marketDemand: 'High',
          averageSalary: '$95,000 - $145,000',
          requiredSkills: ['Node.js', 'Python', 'Java']
        }
      },
      {
        id: '11',
        type: 'custom',
        data: {
          label: 'Backend Frameworks',
          description: 'Popular backend frameworks',
          marketDemand: 'Very High',
          averageSalary: '$100,000 - $160,000',
          requiredSkills: ['Express.js', 'Django', 'Spring']
        }
      },
      // Database Path - Center Branch
      {
        id: '12',
        type: 'custom',
        data: {
          label: 'Database Fundamentals',
          description: 'Database concepts and design',
          marketDemand: 'Very High',
          averageSalary: '$95,000 - $150,000',
          requiredSkills: ['SQL', 'Database Design', 'CRUD Operations']
        }
      },
      {
        id: '13',
        type: 'custom',
        data: {
          label: 'SQL Databases',
          description: 'Relational database management systems',
          marketDemand: 'High',
          averageSalary: '$100,000 - $155,000',
          requiredSkills: ['PostgreSQL', 'MySQL', 'SQL Server']
        }
      },
      {
        id: '14',
        type: 'custom',
        data: {
          label: 'NoSQL Databases',
          description: 'Non-relational databases',
          marketDemand: 'High',
          averageSalary: '$105,000 - $160,000',
          requiredSkills: ['MongoDB', 'Redis', 'Firebase']
        }
      },
      // Advanced Topics - Split Branch
      {
        id: '15',
        type: 'custom',
        data: {
          label: 'DevOps & Deployment',
          description: 'Development operations and deployment',
          marketDemand: 'Very High',
          averageSalary: '$110,000 - $170,000',
          requiredSkills: ['CI/CD', 'Docker', 'Cloud Platforms']
        }
      },
      {
        id: '16',
        type: 'custom',
        data: {
          label: 'Security',
          description: 'Web application security',
          marketDemand: 'Very High',
          averageSalary: '$115,000 - $175,000',
          requiredSkills: ['OWASP', 'Authentication', 'Authorization']
        }
      },
      {
        id: '17',
        type: 'custom',
        data: {
          label: 'Performance & Optimization',
          description: 'Application performance and optimization',
          marketDemand: 'High',
          averageSalary: '$120,000 - $180,000',
          requiredSkills: ['Caching', 'Load Balancing', 'Performance Testing']
        }
      }
    ],
    edges: [
      // Main Structure
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-4', source: '1', target: '4' },
      
      // Development Basics
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e4-5', source: '4', target: '5' },
      
      // Frontend Path
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e6-7', source: '6', target: '7' },
      { id: 'e7-8', source: '7', target: '8' },
      
      // Backend Path
      { id: 'e5-9', source: '5', target: '9' },
      { id: 'e9-10', source: '9', target: '10' },
      { id: 'e10-11', source: '10', target: '11' },
      
      // Database Path
      { id: 'e8-12', source: '8', target: '12' },
      { id: 'e11-12', source: '11', target: '12' },
      { id: 'e12-13', source: '12', target: '13' },
      { id: 'e12-14', source: '12', target: '14' },
      
      // Advanced Topics
      { id: 'e13-15', source: '13', target: '15' },
      { id: 'e14-16', source: '14', target: '16' },
      { id: 'e15-17', source: '15', target: '17' },
      { id: 'e16-17', source: '16', target: '17' }
    ]
  }
];