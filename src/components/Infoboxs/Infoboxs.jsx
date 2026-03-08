import React, { useContext, useEffect, useState } from "react";
import "./Infoboxs.css";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { CourseContext } from "../../contexts/CoursesContexs";
import { API } from "../../services/Api";

const Infoboxs = () => {
  const { allCourses } = useContext(CourseContext);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await API.auth.allUsers();
      setAllUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const studentCount =
    allUsers.filter((user) => user.role === "student").length || 0;
  const teacherCount =
    allUsers.filter((user) => user.role === "teacher").length || 0;

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="card-counter primary">
            <MdOutlineLibraryBooks className="icon" />
            <span className="count-numbers">{allCourses.length}</span>
            <span className="count-name">Courses</span>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="card-counter primary">
            <HiOutlineClipboardDocumentList className="icon" />
            <span className="count-numbers">0</span>
            <span className="count-name">Exams</span>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="card-counter primary">
            <PiChalkboardTeacher className="icon" />
            <span className="count-numbers">{teacherCount}</span>
            <span className="count-name">Teachers</span>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="card-counter primary">
            <PiStudent className="icon" />
            <span className="count-numbers">{studentCount}</span>
            <span className="count-name">Students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infoboxs;
