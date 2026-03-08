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
    login: (credentials) => api.post("/auth/login", credentials),
    register: (user) => api.post("/auth/register", user),
    allUsers: () => api.get("/auth/users"),
    createUser: (user) => api.post("/auth/users", user),
    updateUser: (id, user) => api.patch(`/auth/users/${id}`, user),
    deleteUser: (id) => api.delete(`/auth/users/${id}`),
  },
  course: {
    courses: () => api.get("/courses/courses"),
    createCourse: (course) => api.post("/courses/courses", course),
    updateCourse: (course) => api.put(`/courses/courses/${course.id}`, course),
    deleteCourse: (courseId) => api.delete(`/courses/courses/${courseId}`),
    enrollCourse: (course) => api.post("/courses/enrollments", course),
    unenrollCourse: (course) => api.delete("/courses/enrollments", { data: course }),
    courseEnrollments: () => api.get("/courses/enrollments"),
  },
  notification: {
    allNotifications: () => api.get("/notifications/notifications"),
    createNotification: (notification) => api.post("/notifications/notifications", notification),
    updateNotification: (id, notification) => api.patch(`/notifications/notifications/${id}`, notification),
    deleteNotification: (id) => api.delete(`/notifications/notifications/${id}`),
  },
};
