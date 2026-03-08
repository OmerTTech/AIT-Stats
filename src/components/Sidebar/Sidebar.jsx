import React, { useContext } from "react";
import "./Sidebar.css";
import {
  IoHomeOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { PiBookOpenText } from "react-icons/pi";
import { LiaUserCogSolid } from "react-icons/lia";
import { MdOutlineLibraryBooks, MdOutlineAssignment } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import {
  LuLogOut,
  LuClipboardList,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { NavContext } from "../../contexts/NavContext";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { isNavOpen, isSmallScreen } = useContext(NavContext);
  const { logoutHandler, teacher, admin } = useContext(AuthContext);

  return (
    <div
      className={`navcontainer ${isNavOpen && "navclose"}`}
      style={{ zIndex: "1000" }}
    >
      <nav className="sidebar">
        <div className="nav-upper-options">
          <NavLink to="/" className="nav-option">
            <IoHomeOutline className="icon" />
            <h4 className="h4-nav">Home</h4>
          </NavLink>
          {/* ONLY STUDENTS: */}
          {!teacher && (
            <NavLink
              end 
              to="/courses/register"
              className={
                window.location.pathname.match(/^\/courses\/(register\/\d+)$/)
                  ? "nav-option active"
                  : "nav-option"
              }
            >
              <MdOutlineLibraryBooks className="icon" />
              <h4 className="h4-nav">All Courses </h4>
            </NavLink>
          )}
          {admin && (
            <NavLink to="/manage/users" className="nav-option">
              <LiaUserCogSolid className="icon" />
              <h4 className="h4-nav">Manage Users</h4>
            </NavLink>
          )}
          {/* ONLY STUDENTS AND TEACHERS. */}
          {!admin && (
          <NavLink
            end
            to="/courses"
            className={
              window.location.pathname.match(/^\/courses\/\d+$/)
                ? "nav-option active"
                : "nav-option"
            }
          >
            <PiBookOpenText className="icon" />
            <h4 className="h4-nav">My Courses</h4>
          </NavLink>)}
          {admin && (
            <NavLink end to="/courses/manage" className="nav-option">
              <BiBookAdd className="icon" />
              <h4 className="h4-nav">Manage Courses</h4>
            </NavLink>
          )}
          {/* ONLY Students and Admin: */}
          {/* {!teacher && (
            <NavLink end to="/exams/register" className="nav-option">
              <BsClipboard2Plus className="icon" />
              <h4 className="h4-nav">Register Exams </h4>
            </NavLink>
          )} */}
          {/* ONLY Students and Admin. */}
          <NavLink end to="/exams" className="nav-option">
            <LuClipboardList className="icon" />
            <h4 className="h4-nav">Exams Results</h4>
          </NavLink>
          {/* {admin && (
            <NavLink end to="/exams/manage" className="nav-option">
              <TbClipboardData className="icon" />
              <h4 className="h4-nav">Manage Exams</h4>
            </NavLink>
          )} */}
          {/* ONLY STUDENTS: */}
          {(!admin || !teacher) && (
            <NavLink
              end
              to="/assignments"
              className={
                window.location.pathname.match(/^\/assignments\/\d+$/)
                  ? "nav-option active"
                  : "nav-option"
              }
            >
              <MdOutlineAssignment className="icon" />
              <h4 className="h4-nav">Assignments</h4>
            </NavLink>
          )}
          {/* ONLY STUDENTS. */}

          <NavLink to="/class/schedule" className="nav-option">
            <IoCalendarOutline className="icon" />
            <h4 className="h4-nav">class Schedules</h4>
          </NavLink>
          {(admin || teacher) && (
            <NavLink to="/announcement" className="nav-option">
              <TfiAnnouncement className="icon" />
              <h4 className="h4-nav">Announcement</h4>
            </NavLink>
          )}
          <NavLink to="/notifications" className="nav-option">
            <IoNotificationsOutline className="icon" />
            <h4 className="h4-nav">Notifications</h4>
          </NavLink>

          {isSmallScreen && (
            <>
              <NavLink to="profile" className="nav-option">
                <FaRegUser className="icon" />
                <h4 className="h4-nav">Profile</h4>
              </NavLink>
              <NavLink to="settings" className="nav-option">
                <IoSettingsOutline className="icon" />
                <h4 className="h4-nav">Settings</h4>
              </NavLink>

              <span onClick={logoutHandler} className="nav-option logout">
                <LuLogOut className="icon" />
                <h4 className="h4-nav">Logout</h4>
              </span>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
