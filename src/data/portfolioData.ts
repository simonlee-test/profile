import { TimelineItem } from '@/components/Timeline';
import { Skill } from '@/components/Skills';
import { Project } from '@/components/Projects';

/**
 * Sample portfolio data
 * Replace with your actual data
 */

export const timelineData: TimelineItem[] = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    description: 'Leading development of scalable web applications using Next.js, React, and Node.js. Mentoring junior developers and implementing best practices.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    year: '2023',
    title: 'Full Stack Developer',
    description: 'Developed and maintained multiple client projects. Implemented CI/CD pipelines and improved application performance by 40%.',
    technologies: ['React', 'Vue.js', 'Python', 'Django', 'AWS'],
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    description: 'Created responsive and accessible user interfaces. Collaborated with design team to implement pixel-perfect designs.',
    technologies: ['JavaScript', 'CSS', 'HTML', 'React', 'Tailwind CSS'],
  },
  {
    year: '2021',
    title: 'Junior Developer',
    description: 'Started professional career building web applications. Learned modern development practices and agile methodologies.',
    technologies: ['JavaScript', 'React', 'Git', 'REST APIs'],
  },
  {
    year: '2020',
    title: 'Computer Science Graduate',
    description: 'Graduated with honors. Specialized in software engineering and web development. Completed capstone project on AI-powered applications.',
    technologies: ['Python', 'Java', 'Data Structures', 'Algorithms'],
  },
];

export const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 88, category: 'Frontend' },
  { name: 'Vue.js', level: 82, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
  { name: 'Three.js', level: 75, category: 'Frontend' },

  // Backend
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'Django', level: 80, category: 'Backend' },
  { name: 'PostgreSQL', level: 82, category: 'Backend' },
  { name: 'MongoDB', level: 78, category: 'Backend' },
  { name: 'GraphQL', level: 75, category: 'Backend' },

  // DevOps & Tools
  { name: 'Git', level: 92, category: 'DevOps & Tools' },
  { name: 'Docker', level: 80, category: 'DevOps & Tools' },
  { name: 'AWS', level: 78, category: 'DevOps & Tools' },
  { name: 'CI/CD', level: 85, category: 'DevOps & Tools' },
  { name: 'Linux', level: 75, category: 'DevOps & Tools' },

  // Design & Other
  { name: 'Figma', level: 70, category: 'Design' },
  { name: 'UI/UX', level: 72, category: 'Design' },
  { name: 'Agile', level: 85, category: 'Methodology' },
  { name: 'Problem Solving', level: 90, category: 'Soft Skills' },
  { name: 'Communication', level: 88, category: 'Soft Skills' },
];

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Neural Digital Garden',
    description: 'An immersive 3D portfolio website featuring interactive neural tree visualization, scroll-based animations, and glassmorphism design.',
    longDescription: 'A cutting-edge portfolio website built with Next.js 15, React Three Fiber, and Framer Motion. Features include a procedurally generated neural tree that grows as you scroll, interactive 3D scenes, and a fully responsive design with dark/light theme support.',
    tags: ['Next.js', 'React Three Fiber', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    category: 'Web Development',
    featured: true,
    github: 'https://github.com/yourusername/neural-digital-garden',
    live: 'https://yourportfolio.com',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    longDescription: 'A comprehensive e-commerce platform built with Next.js, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, payment integration with Stripe, order tracking, and an admin panel for inventory management.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    category: 'Full Stack',
    featured: true,
    github: 'https://github.com/yourusername/ecommerce-platform',
    live: 'https://demo.ecommerce.com',
  },
  {
    id: '3',
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered responses, sentiment analysis, and multi-language support.',
    longDescription: 'An intelligent chat application that integrates with OpenAI API to provide contextual responses. Features include real-time messaging, sentiment analysis, language detection, translation, and conversation history with search functionality.',
    tags: ['React', 'Node.js', 'OpenAI', 'WebSocket', 'MongoDB'],
    category: 'AI/ML',
    github: 'https://github.com/yourusername/ai-chat',
  },
  {
    id: '4',
    title: 'Task Management System',
    description: 'Collaborative task management tool with Kanban boards, team collaboration, and progress tracking.',
    longDescription: 'A project management application inspired by Trello and Asana. Features include drag-and-drop Kanban boards, team workspaces, real-time collaboration, task assignments, due dates, file attachments, and comprehensive reporting.',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io', 'Docker'],
    category: 'Productivity',
    github: 'https://github.com/yourusername/task-manager',
    live: 'https://tasks.app.com',
  },
  {
    id: '5',
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with 7-day forecasts, interactive maps, and location-based alerts.',
    longDescription: 'A weather dashboard that aggregates data from multiple weather APIs. Features include current conditions, hourly and 7-day forecasts, interactive weather maps, severe weather alerts, location-based services, and beautiful data visualizations.',
    tags: ['React', 'TypeScript', 'Weather API', 'Chart.js', 'Leaflet'],
    category: 'Web Development',
    github: 'https://github.com/yourusername/weather-dashboard',
    live: 'https://weather.app.com',
  },
  {
    id: '6',
    title: 'Blog CMS',
    description: 'Headless CMS for blog management with Markdown support, SEO optimization, and analytics integration.',
    longDescription: 'A content management system built with Django REST Framework and Next.js. Features include Markdown editor, image optimization, SEO meta tags, social sharing, comment system, and Google Analytics integration.',
    tags: ['Django', 'Next.js', 'PostgreSQL', 'Markdown', 'SEO'],
    category: 'Full Stack',
    github: 'https://github.com/yourusername/blog-cms',
  },
];
