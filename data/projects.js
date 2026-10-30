// Edit this list to add / change your projects.
// category must be one of: web, uiux, graphic, data
// image: put a file in /public/images and use e.g. '/images/project1.jpg' (or leave '' for a placeholder)
// tools / challenge / outcome show on the back of the flip card.
// The first 6 projects appear in the home page carousel.
const categories = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web Development' },
  { key: 'uiux', label: 'UI/UX Design' },
  { key: 'graphic', label: 'Graphic Design' },
  { key: 'data', label: 'Data Analytics' }
];

const base = {
  description: 'Short description of the project goes here.',
  image: '',
  link: '#',
  challenge: 'What was difficult about this project?',
  outcome: 'What did you achieve or learn?'
};

const projects = [
  { id: 1, title: 'Project Title', category: 'web',     tools: 'HTML, CSS, Node.js', ...base },
  { id: 2, title: 'Project Title', category: 'uiux',    tools: 'Figma',              ...base },
  { id: 3, title: 'Project Title', category: 'graphic', tools: 'Photoshop, Canva',   ...base },
  { id: 4, title: 'Project Title', category: 'data',    tools: 'Python, SQL',        ...base },
  { id: 5, title: 'Project Title', category: 'web',     tools: 'JavaScript, Express', ...base },
  { id: 6, title: 'Project Title', category: 'uiux',    tools: 'Figma, Adobe Express', ...base }
];

module.exports = { categories, projects };