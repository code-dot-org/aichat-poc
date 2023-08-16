import React from "react";

import Bots from "./Bots";
import Classrooms from "./Classrooms";
import Chat from "./Chat";

const StudentView = () => {
  return (
    <div>
      <Bots />
      <Classrooms />
      <Chat />
    </div>
  );
};

export default StudentView;
