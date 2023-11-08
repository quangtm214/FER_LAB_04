import axiosClient from "./axiousClient";

const filmApi = {
    getAll: (params) => {
        const url = '/Films';
        return axiosClient.get(url, { params });

    },

    get: (id) => {
        const url = `/Films/${id}`;
        return axiosClient.get(url);
    },

    delete: (id) => {
        const url = `/Films/${id}`;
        return axiosClient.delete(url);
    },
    addNewFilm: (data) => {
        const url = '/Films';
        return axiosClient.post(url, data);
    }
}

export default filmApi;