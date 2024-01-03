import React from "react";
import { Button, TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import "./home.css";

const Home = () => {
  return (
    <div className="home-div">
      <div className="box">
        <TextField
          label="Paste URL Instagram"
          color="primary"
          className="input"
          focused
        />
        <Button
          variant="contained"
          color="success"
          className="button"
          endIcon={<DownloadIcon />}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default Home;
