import axios from 'axios';


export function apiCall(method, path, data) {
    const BASE_URL='https://2efgdb6me4.execute-api.us-east-1.amazonaws.com';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS,PATCH';
	axios.defaults.headers.common['Content-Type'] = 'application/json';
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	return new Promise((resolve, reject) => {
		return axios
			[method](BASE_URL+path, data)
			.then((res) => {
				return resolve(res.data);
			})
			.catch((err) => {
				return reject(err);
			});
	});
}


