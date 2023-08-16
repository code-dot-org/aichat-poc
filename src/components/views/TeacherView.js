import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import Bots from "./Bots";
import Classrooms from "./Classrooms";
import Chat from "./Chat";
import Students from "./Students";
import Restrictions from "./Restrictions";
import ChatTranscript from "./ChatTranscript";

import { useGetChatsQuery } from "@/store/services";

const TeacherView = () => {
  const selectedClassroom = useSelector(
    ({ selectedClassroom }) => selectedClassroom
  );

  const { data: chats = [] } = useGetChatsQuery(selectedClassroom, {
    pollingInterval: 3000,
  });

  const chatsByStudent = chats.reduce((bucket, chat) => {
    bucket[chat.metadata.username] = chat;
    return bucket;
  }, {});

  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const selectStudent = (student, chat) => {
    setSelectedStudent(student);
    setSelectedChat(chat);
  };

  return (
    <div>
      <Classrooms />
      <Grid container>
        <Grid item>
          <Students selectStudentCallback={selectStudent} />
        </Grid>
        <Grid item>
          <ChatTranscript chat={chatsByStudent?.[selectedStudent]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherView;
