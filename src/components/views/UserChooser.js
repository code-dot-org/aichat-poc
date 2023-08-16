"use client";

import React from "react";
import { useSelector } from "react-redux";

import AdminView from "./AdminView";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";

const UserChooser = () => {
  const usertype = useSelector((state) => state.session.usertype);

  if (usertype === "admin") {
    return <AdminView />;
  } else if (usertype === "teacher") {
    return <TeacherView />;
  } else if (usertype === "student") {
    return <StudentView />;
  } else {
    return <div>please log in</div>;
  }
};

export default UserChooser;
