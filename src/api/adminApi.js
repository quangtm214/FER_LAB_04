import axiosClient from "./axiousClient";

const adminApi = {
    getAll: (params) => {
        const url = '/admins';
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `/admins/${id}`;
        return axiosClient.get(url);
    },
    login: (username, pass) => {
        const url = '/admins';
        const params = {
            name: username,
            pass: pass,
        };

        return axiosClient.get(url, { params });
    },
}

export default adminApi;