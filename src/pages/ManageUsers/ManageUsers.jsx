import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Tables/Table";
import { API } from "../../services/Api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData, getLoginUser, setAdmin, setTeacher } =
    useContext(AuthContext);
  const navigator = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await API.auth.allUsers();
      const users = response.data.map((user) => ({
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        semester: user.semester,
        enrollments: user.enrollments
      }));
      setAllUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateSave = async (updatedUserData) => {
    try {
      const isCurrentUserUpdated = updatedUserData.id === userData.id;

      await API.auth.updateUser(updatedUserData.id, {
        name: updatedUserData.name,
        surname: updatedUserData.surname,
        email: updatedUserData.email,
        role: updatedUserData.role,
        semester: updatedUserData.semester,
        enrollments: updatedUserData.enrollments
      });

      if (isCurrentUserUpdated) {
        getLoginUser();
        if (updatedUserData.role === "admin") {
          setAdmin(true);
          setTeacher(true);
        } else if (updatedUserData.role === "teacher") {
          setTeacher(true);
          setAdmin(false);
        } else {
          setAdmin(false);
          setTeacher(false);
          navigator("/");
        }
      }

      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // USER DELETE Function
  const handleDeleteUser = async (userId) => {
    if (userId === userData.id) {
      alert("You can't delete your own account! \nYou need to find another admin first.");
      return;
    }

    if (window.confirm("Are you sure? You cannot change this later!!")) {
      try {
        await API.auth.deleteUser(userId); 
        
        alert("User deleted!");
        fetchUsers(); 
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed.");
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(allUsers)
    } else {
      const filteredUsers = allUsers.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers)
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  
  const headers = ["ID", "Name", "Surname", "Email", "Semester", "Role", "Actions"];

  return (
    <>
      <div className="table-container mx-auto">
        <div className="SearchTitle d-flex">
          <input
            type="text"
            className="form-control p-1 m-1"
            placeholder="Search User email.."
            value={searchTerm}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <div className="buttons d-flex">
            <button
              type="button"
              className="btn btn-secondary p-2 me-1 my-1"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>
        </div>
        <Table
          Headers={headers}
          Datas={filteredUsers}
          handleUpdateSave={handleUpdateSave}
          handleDeleteUser={handleDeleteUser}
          Container={false}
          Actionbtn={"ManageUsers"}
        />
      </div>
    </>
  );
};

export default ManageUsers;
