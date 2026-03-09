import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const API = {
  auth: {
    login: (credentials) => api.post("/api/auth/login", credentials),
    register: (user) => api.post("/api/auth/register", user),
    allUsers: () => api.get("/api/auth/users"),
    createUser: (user) => api.post("/api/auth/users", user),
    updateUser: (id, user) => api.patch(`/api/auth/users/${id}`, user),
    deleteUser: (id) => api.delete(`/api/auth/users/${id}`),
  },
  course: {
    courses: () => api.get("/api/courses/courses"),
    createCourse: (course) => api.post("/api/courses/courses", course),
    updateCourse: (course) => api.put(`/api/courses/courses/${course.id}`, course),
    deleteCourse: (courseId) => api.delete(`/api/courses/courses/${courseId}`),
    enrollCourse: (course) => api.post("/api/courses/enrollments", course),
    unenrollCourse: (course) => api.delete("/api/courses/enrollments", { data: course }),
    courseEnrollments: () => api.get("/api/courses/enrollments"),
  },
  notification: {
    allNotifications: () => api.get("/api/notifications/notifications"),
    createNotification: (notification) => api.post("/api/notifications/notifications", notification),
    updateNotification: (id, notification) => api.patch(`/api/notifications/notifications/${id}`, notification),
    deleteNotification: (id) => api.delete(`/api/notifications/notifications/${id}`),
  },
};
