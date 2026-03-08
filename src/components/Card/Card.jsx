import React, { useState, useEffect, useContext } from "react";
import "./Card.css";
import { API } from "../../services/Api";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Card = ({ Course }) => {
  const [addBtn, setBtn] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { userData, setAccessToken, setUserData } = useContext(AuthContext);

  const courseId = Course._id || Course.id;

  useEffect(() => {
    if (userData && courseId) {
      const getEnrolls = userData.enrollments || userData.enrolls || [];
      setEnrolledCourses(getEnrolls.map(String));

      if (getEnrolls.map(String).includes(String(courseId))) {
        setBtn(true);
      }
    }
  }, [userData, courseId]);

  const btnHandler = async () => {
    const currentEnrolls = enrolledCourses.map(String);
    const courseIdStr = String(courseId);

    if (addBtn) {
      try {
        const response = await API.course.unenrollCourse({
          courseId: courseId,
          studentId: userData.id,
          studentName: `${userData.name || ''} ${userData.surname || ''}`.trim()
        });
        
        // Update token and userData with new enrollments
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAccessToken(response.data.accessToken);
          const newUserData = jwtDecode(response.data.accessToken);
          setUserData(newUserData);
        }
        
        const updatedEnrolls = currentEnrolls.filter(id => id !== courseIdStr);
        setEnrolledCourses(updatedEnrolls);
        setBtn(false);
        toast.success(`Successfully canceled the \n${Course.courseName} course`);
      } catch (error) {
        console.error("Failed to unenroll:", error);
        toast.error("Failed to cancel enrollment.");
      }
    } else {
      if (currentEnrolls.length >= 4) {
        toast.error("You can only choose 4 courses");
        return;
      }

      try {
        const response = await API.course.enrollCourse({
          courseId: courseId,
          studentId: userData.id,
          studentName: `${userData.name || ''} ${userData.surname || ''}`.trim()
        });
        
        // Update token and userData with new enrollments
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAccessToken(response.data.accessToken);
          const newUserData = jwtDecode(response.data.accessToken);
          setUserData(newUserData);
        }
        
        const updatedEnrolls = [...currentEnrolls, courseIdStr];
        setEnrolledCourses(updatedEnrolls);
        setBtn(true);
        toast.success(`Successfully registered for the \n${Course.courseName} course`);
      } catch (error) {
        console.error("Failed to enroll:", error);
        toast.error("Failed to register for course.");
      }
    }
  };

  return (
    <div>
      <div className="courseCard">
        <p
          className="courseHeading"
          style={{
            fontSize:
              Course.courseName.length > 16
                ? Course.courseName.length > 21
                  ? "1.10rem"
                  : "1.35rem"
                : "1.5rem",
          }}
        >
          {Course.courseName || "Empty.."}
        </p>
        <p className="courseOwner">{Course.instructorName || "Empty.."}</p>
        <button
          onClick={btnHandler}
          className={`${
            addBtn ? "cancelButton bg-danger btn-danger" : "btn-success"
          } w-50 btn text-white`}
        >
          {addBtn ? "Cancel" : "Enroll"}
        </button>
      </div>
    </div>
  );
};

export default Card;
