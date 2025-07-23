import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://nuke-brand-d2ea8b9b3c96.herokuapp.com/api'
});

export default api; 

// import axios from 'axios';

// // Create axios instance with base URL
// const api = axios.create({
//   baseURL: process.env.NODE_ENV === 'production' 
//     ? '/api' 
//     : 'https://nuke-brand-d2ea8b9b3c96.herokuapp.com/api',
//   timeout: 10000,
// });

// export default api; 

