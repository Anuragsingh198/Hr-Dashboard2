
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Product',
  'Design',
  'HR',
  'Finance',
  'Operations',
];

export function generateDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

export function generatePerformanceRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export function getPerformanceColor(rating) {
  switch (rating) {
    case 1:
      return 'bg-red-500';
    case 2:
      return 'bg-orange-500';
    case 3:
      return 'bg-yellow-500';
    case 4:
      return 'bg-blue-500';
    case 5:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getPerformanceLabel(rating) {
  switch (rating) {
    case 1:
      return 'Poor';
    case 2:
      return 'Below Average';
    case 3:
      return 'Average';
    case 4:
      return 'Good';
    case 5:
      return 'Excellent';
    default:
      return 'Unknown';
  }
}

export function generateRandomProjects() {
  const projectNames = [
    'Mobile App Redesign',
    'Marketing Campaign Q1',
    'Database Migration',
    'Website Optimization',
    'Customer Onboarding',
    'Product Launch',
    'Cloud Migration',
    'Security Audit',
    'Brand Refresh',
    'Automation Implementation'
  ];

  const statuses = ['Active', 'Completed', 'On Hold'];
  const roles = ['Lead', 'Contributor', 'Reviewer', 'Manager', 'Coordinator'];

  const numProjects = Math.floor(Math.random() * 4) + 1;
  const projects = [];

  for (let i = 0; i < numProjects; i++) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12));

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 6) + 1);

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      status,
      startDate: startDate.toISOString().split('T')[0],
      endDate: status === 'Completed' ? endDate.toISOString().split('T')[0] : undefined,
      role: roles[Math.floor(Math.random() * roles.length)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    });
  }

  return projects;
}

export function generateRandomFeedback() {
  const feedbacks = [];
  const feedbackCount = Math.floor(Math.random() * 5) + 2;

  const authors = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Jessica Lee',
    'David Wilson',
    'Jennifer Martinez',
    'Robert Taylor',
    'Emily Anderson'
  ];

  const feedbackContent = [
    'Has shown great improvement in communication skills.',
    'Consistently meets deadlines and produces high-quality work.',
    'Needs to improve time management skills.',
    'Excellent team player who supports colleagues effectively.',
    'Demonstrates strong problem-solving abilities.',
    'Could benefit from more detailed documentation.',
    'Proactive in identifying and resolving issues.',
    'Requires more attention to detail in deliverables.'
  ];

  const now = new Date();

  for (let i = 0; i < feedbackCount; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));

    feedbacks.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      author: authors[Math.floor(Math.random() * authors.length)],
      content: feedbackContent[Math.floor(Math.random() * feedbackContent.length)],
      rating: Math.floor(Math.random() * 5) + 1
    });
  }

  return feedbacks.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function generateDepartmentStats() {
  return departments.map(dept => ({
    department: dept,
    avgRating: (Math.random() * 3 + 2).toFixed(1),
    employeeCount: Math.floor(Math.random() * 50) + 10,
    bookmarkCount: Math.floor(Math.random() * 10) + 1,
  }));
}

export function generateMonthlyStats() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return months.map(month => ({
    month,
    bookmarks: Math.floor(Math.random() * 15) + 5,
    promotions: Math.floor(Math.random() * 10),
    avgRating: (Math.random() * 2 + 3).toFixed(1),
  }));
}
