import axios from 'axios';

const testloApi = axios.create({
    baseURL: import.meta.env.VITE_TESTLO_API_URL,
});


// Interceptors

export { testloApi };
