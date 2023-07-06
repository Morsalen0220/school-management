const productionURL = '';
const devURL = `http://localhost:${import.meta.env.VITE_PORT}`;
const url = import.meta.env.PROD ? productionURL : devURL;

const data = {
	image: `${url}/public/uploads/image`,
};

export default data;
