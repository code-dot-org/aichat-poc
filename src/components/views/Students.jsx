import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/Warning";
import MessageIcon from "@mui/icons-material/Message";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

import { useSelector, useDispatch } from "react-redux";

import {
  useGetRestrictionsQuery,
  useUpdateRestrictionsMutation,
  useGetChatsQuery,
  useGetClassroomsQuery,
} from "@/store/services";

import { selectStudent } from "@/store/slices/selectedStudent";

const Students = ({ selectStudentCallback = () => {} }) => {
  const dispatch = useDispatch();
  const [updateRestrictions] = useUpdateRestrictionsMutation();
  const { data: classrooms = [] } = useGetClassroomsQuery();

  const selectedClassroom = useSelector(
    ({ selectedClassroom }) => selectedClassroom
  );

  const { data: restrictions = [] } = useGetRestrictionsQuery(
    selectedClassroom,
    { pollingInterval: 3000 }
  );

  const { data: chats = [] } = useGetChatsQuery(selectedClassroom, {
    pollingInterval: 3000,
  });

  const chatsByStudent = chats.reduce((bucket, chat) => {
    bucket[chat.metadata.username] = chat;
    return bucket;
  }, {});

  const restrictionsByStudent = restrictions.reduce((bucket, entry) => {
    if (entry.restrictions.prompt || entry.restrictions.response) {
      bucket[entry.username] = true;
    }
    return bucket;
  }, {});

  const selectedStudent = useSelector(({ selectedStudent }) => selectedStudent);

  const students =
    classrooms.find((c) => c.name === selectedClassroom)?.students || [];

  if (!selectedStudent && students?.length) {
    dispatch(selectStudent(students[0].name));
  }

  const handleChange = (studentname) => {
    dispatch(selectStudent(studentname));
    selectStudentCallback(studentname, chatsByStudent[studentname]);
  };

  const unlock = (student) => {
    updateRestrictions({
      username: student,
      classroom: selectedClassroom,
      restrictions: { prompt: false, response: false },
    });
  };

  return (
    <List>
      <ListSubheader>Students</ListSubheader>
      {students.map((s) => (
        <ListItem
          key={s.name}
          onClick={() => handleChange(s.name)}
          sx={{
            cursor: "pointer",
            backgroundColor: selectedStudent === s.name ? "#BBBBBB" : undefined,
          }}
        >
          {chatsByStudent[s.name] && <MessageIcon />}
          {restrictionsByStudent[s.name] && <WarningIcon />}
          {s.name}
          {restrictionsByStudent[s.name] && (
            <LockOpenIcon onClick={() => unlock(s.name)} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default Students;
