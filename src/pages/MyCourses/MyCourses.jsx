import React, { useContext, useEffect, useState } from "react";
import Coursesboxs from "../../components/Infoboxs/Coursesboxs";
import Semestr from "../../components/Semestr/Semestr";
import Table from "../../components/Tables/Table";
import { CourseContext } from "../../contexts/CoursesContexs";
import { AuthContext } from "../../contexts/AuthContext";

const MyCourses = () => {
  const headers = [
    "Course Name",
    "Semester",
    "instructor Name",
    "instructor Email",
  ];
  const { allCourses } = useContext(CourseContext);
  const { userData } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        if (userData && allCourses.length > 0) {
          const enrolls = (userData.enrollments || userData.enrolls || []).slice(0, 4);

          const filteredCourses = allCourses.filter((course) => {
            const courseId = String(course._id || course.id);
            return enrolls.map(String).includes(courseId);
          });

          setMyCourses(filteredCourses);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };
    fetchEnrollments();
  }, [allCourses, userData]);

  return (
    <div>
      <Coursesboxs Courses={myCourses} />

      <Semestr />

      <Table Headers={headers} Datas={myCourses} />
    </div>
  );
};

export default MyCourses;
