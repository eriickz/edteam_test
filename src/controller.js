import axios from 'axios';

export const getCoursesList = async () => {
    try {
        const response = await axios.get("/courses").then(res => res);
        
        if ( response.status === 200 ) {
            return response;
        }
    } catch (e) {
        const message = `Error ${e.response.status}: ${e.response.data.message}`;
        return message;
    }
}

export const getCourseById = async (courseId) => {
    try {
        const response = await axios.get(`/courses/${courseId}`).then(res => res);
        
        return response;
    } catch (e) {
        const message = `Error ${e.response.status}: ${e.response.data.message}`;
        return message;
    }
}

export const createCourse = async (data) => {
    try {
        const response = await axios.post("/courses", { ...data }).then(res => res);
        
        return response;
    } catch (e) {
        const message = `Error ${e.response.status}: ${e.response.data.message}`;
        return message;
    }
}

export const updateCourse = async (courseId, data) => {
    try {
        const response = await axios.put(`/courses/${courseId}`, { ...data }).then(res => res);
        
        return response;
    } catch (e) {
        const message = `Error ${e.response.status}: ${e.response.data.message}`;
        return message;
    }
}

export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`/courses/${courseId}`).then(res => res);
        
        return response;
    } catch (e) {
        const message = `Error ${e.response.status}: ${e.response.data.message}`;
        return message;
    }
}