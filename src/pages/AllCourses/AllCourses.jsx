import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Semestr from "../../components/Semestr/Semestr";
import { CourseContext } from "../../contexts/CoursesContexs";
import { AuthContext } from "../../contexts/AuthContext";

const Courses = () => {
  const { userData } = useContext(AuthContext);
  const { allCourses } = useContext(CourseContext);
  const [coursesBySemester, setCoursesBySemester] = useState([]);

  useEffect(() => {
    const filterCoursesBySemester = () => {
      let filteredCourses = [];
      if (userData.semester === "FIRST_SEMESTER") {
        filteredCourses = allCourses.filter(
          (course) => course.semester === "First"
        );
      } else if (userData.semester === "SECOND_SEMESTER") {
        filteredCourses = allCourses.filter(
          (course) => course.semester === "Second"
        );
      } else {
        filteredCourses = allCourses
      }
      setCoursesBySemester(filteredCourses);
    };

    filterCoursesBySemester();
  }, [allCourses, userData.semester]);
  

  return (
    <div>
      <Semestr />
      <div className="d-flex justify-content-center align-items-center row gy-4">
        {coursesBySemester?.map((course) => (
          <div key={course._id || course.id} className="col-xl-3 col-md-4 col-sm-12">
            <Card Course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
