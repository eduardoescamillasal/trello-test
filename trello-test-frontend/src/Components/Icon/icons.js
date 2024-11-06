import React from "react";
import RemoveIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const renderIcons = (type) => {
  switch (type) {
    case "remove":
      return <RemoveIcon fontSize='small' />;

    case "add":
      return <AddIcon fontSize='small' />;

    case "info":
      return <InfoIcon fontSize='small' />;

    case "dot":
      return <MoreHorizIcon fontSize='small' />; // Three-dot icon (horizontal dots)

    default:
      return null;
  }
};

export default renderIcons;
