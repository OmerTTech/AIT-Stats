import { createContext, useEffect, useState, useContext, useCallback } from "react";
import { API } from "../services/Api";
import { AuthContext } from "./AuthContext";

const CourseContext = createContext();

const CoursesProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const { accessToken } = useContext(AuthContext);
  
  const getAllCourses = useCallback(async () => {
    if (!accessToken) return;
    try {
      const { data } = await API.course.courses();
      setAllCourses(data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken]);
  
  useEffect(() => {
    if (accessToken) {
      getAllCourses();
    }
  }, [accessToken]);

  return (
    <CourseContext.Provider value={{ allCourses, setAllCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
export { CourseContext, CoursesProvider };
