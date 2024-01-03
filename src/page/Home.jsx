import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import "./home.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;

  const handleClick = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index",
      params: {
        url: url,
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host":
          "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // get the download link from the response data
      const downloadLink = response.data.media;
      // Redirect user to the download link
      window.location.href = downloadLink;

      // Process the response data or update UI based on success
      // Example: Update UI with success message
      // (you can use state to display a message)
      // setMessage('Download successful');
    } catch (error) {
      console.error(error);

      // Handle error - you can display an error message to users
      // setMessage('Error downloading. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="home-div">
      <div className="box">
        <TextField
          label="Paste URL Instagram"
          color="primary"
          className="input"
          focused
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          className="button"
          onClick={handleClick}
          endIcon={<DownloadIcon />}
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download"}{" "}
        </Button>
      </div>
    </div>
  );
};

export default Home;
