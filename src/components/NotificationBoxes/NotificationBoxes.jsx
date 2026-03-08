import React, { useContext, useEffect, useState } from "react";
import "./NotificationBoxes.css";
import BoxOfNotification from "./BoxOfNotification";
import { API } from "../../services/Api";
import { AuthContext } from "../../contexts/AuthContext";
import { SpinnerInfinity } from "spinners-react";

const NotificationBoxes = ({ isPageDashboard, onNotificationCount }) => {
  const [screenSize, setScreenSize] = useState("large");
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const { userData, teacher } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1500) {
        setScreenSize("large");
      } else if (window.innerWidth > 1400) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await API.notification.allNotifications();
        const notificationDatas = response.data;
        const sortedNotifications = notificationDatas.sort(
          (a, b) => new Date(b.date.split(' ')[0].split('-').reverse().join('-') + ' ' + b.date.split(' ')[1]) - new Date(a.date.split(' ')[0].split('-').reverse().join('-') + ' ' + a.date.split(' ')[1])
        );
        const filteredNotifications = sortedNotifications.filter(
          (notification) => {
            if (notification.type === "newCourse" && teacher) {
              return false;
            }
            return (
              notification.type !== "enrollment" ||
              notification.recipient === userData.email
            );
          }
        );

        const notificationsSlicer = isPageDashboard
          ? screenSize === "large"
            ? filteredNotifications.slice(0, 5)
            : screenSize === "medium"
            ? filteredNotifications.slice(0, 4)
            : filteredNotifications.slice(0, 3)
          : filteredNotifications;

          setDisplayedNotifications(notificationsSlicer);
        onNotificationCount(filteredNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    getNotifications();
  }, [isPageDashboard, onNotificationCount, screenSize, teacher, userData?.email]);

  return (
    <div className="notifications-container d-flex flex-column gap-2">
      {displayedNotifications.length > 0 ? (
        displayedNotifications.map((notification, index) => (
          <BoxOfNotification
            key={index}
            type={notification.type}
            student={notification.student}
            from={notification.from}
            time={notification.date}
          />
        ))
      ) : (
        <p className="alert alert-danger m-0 text-center w-100">
          <SpinnerInfinity
            size={50}
            thickness={64}
            speed={55}
            // color="rgba(57, 152, 172, 1)"
            color="rgba(157, 202, 282, 1)"
            secondaryColor="rgba(0, 0, 0, 0.44)"
            className="mx-3"
          />
          No Notification Found..
        </p>
      )}
    </div>
  );
};

export default NotificationBoxes;
