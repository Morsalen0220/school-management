import axios from 'axios';

const productionURL = '/api';
const devURL = `http://localhost:${[import.meta.env.VITE_PORT]}/api`;

export default axios.create({
	baseURL: import.meta.env.PROD ? productionURL : devURL,
	withCredentials: true,
});
