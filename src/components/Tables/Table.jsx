import React, { useState } from "react";
import "./Tables.css";
import { Modal, Button } from "react-bootstrap";
import { SpinnerCircular } from "spinners-react";

const Table = ({
  Headers,
  Datas,
  handleUpdateSave,
  handleDeleteUser,
  handleDelete,
  Container = true,
  Actionbtn = false,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("First");

  const handleUpdateShow = (course) => {
    setSelectedCourse(course);
    setCourseName(course.courseName);
    setSemester(course.semester);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => setShowUpdateModal(false);

  const handleUpdateSaveClick = async () => {
    const courseId = selectedCourse._id || selectedCourse.id;
    const updatedCourseData = {
      id: courseId,
      _id: courseId,
      courseName,
      semester,
      instructorName: selectedCourse.instructorName,
      instructorEmail: selectedCourse.instructorEmail,
    };

    try {
      await handleUpdateSave(updatedCourseData);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const tableContent = (
    <>
      {Datas.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Headers?.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Actionbtn !== "ManageUsers" &&
              Datas?.map((item, index) => {
                const excludedKeys = ['_id', '__v', 'students'];
                const visibleKeys = Object.keys(item).filter(key => !excludedKeys.includes(key));
                return (
                <tr key={index}>
                  {visibleKeys.map((key, i) => (
                    <td key={i}>
                      {key === 'semester' ? (item[key] === 'First' ? '1st Semester' : item[key] === 'Second' ? '2nd Semester' : item[key]) : 
                       Array.isArray(item[key]) ? item[key].length : item[key]}
                    </td>
                  ))}
                  {Actionbtn === "myCourses" && (
                    <td>
                      <button
                        className="bg-success rounded text-white p-1 mx-1 border-2 border-second"
                        onClick={() => handleUpdateShow(item)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-danger rounded text-white p-1 mx-1 border-2 border-second"
                        onClick={() => handleDelete(item._id || item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
              })}
            {Actionbtn === "ManageUsers" &&
              Datas?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id || item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname !== "null" ? item.surname : ""}</td>
                  <td>{item.email}</td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={item.semester}
                      onChange={(e) => {
                        const updatedUser = {
                          ...item,
                          semester: e.target.value,
                        };
                        handleUpdateSave(updatedUser);
                      }}
                    >
                      <option value="">Empty</option>
                      <option value="FIRST_SEMESTER">FIRST_SEMESTER</option>
                      <option value="SECOND_SEMESTER">SECOND_SEMESTER</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={item.role}
                      onChange={(e) => {
                        const updatedUser = {
                          ...item,
                          role: e.target.value,
                        };
                        handleUpdateSave(updatedUser);
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </td>
                  <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteUser(item._id || item.id)}
        >
          Delete
        </button>
      </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger m-0 text-center w-100">
          <SpinnerCircular size={30} speed={50} className="mx-2" />
          No Course Found..
        </p>
      )}
    </>
  );

  return (
    <>
      {Container ? (
        <div className="table-container mx-auto">{tableContent}</div>
      ) : (
        tableContent
      )}

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control p-1 m-1 border-3 border-second"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <select
            className="form-control p-1 m-1 border-3 border-second"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="First">First Semester</option>
            <option value="Second">Second Semester</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2 ">
            <Button
              className="px-3"
              variant="secondary"
              onClick={handleUpdateClose}
            >
              Close
            </Button>
            <Button
              className="px-3 text-nowrap"
              variant="success"
              onClick={handleUpdateSaveClick}
            >
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;
