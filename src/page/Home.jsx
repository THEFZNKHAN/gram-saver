import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import DownloadIcon from "@mui/icons-material/Download";

import "./home.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const apiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;

  const getShortURL = (fullURL) => {
    const urlParts = fullURL.split("/");
    const shortURL = urlParts[urlParts.length - 2];
    return shortURL;
  };

  const hideAlerts = () => {
    setTimeout(() => {
      setIsDownloaded(false);
      setIsError(false);
    }, 3000);
  };

  const handleClick = async () => {
    setLoading(true);
    const shortURL = getShortURL(url);
    const options = {
      method: "GET",
      url: `https://instagram-bulk-scraper-latest.p.rapidapi.com/webmedia_info_from_shortcode/${shortURL}`,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "instagram-bulk-scraper-latest.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // get the download link from the response data
      const downloadLink = response.data.data.video_url;
      // Redirect user to the download link
      window.location.href = downloadLink;
      setIsDownloaded(true);
      hideAlerts();
    } catch (error) {
      setIsError(true);
      hideAlerts();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-div">
      {loading && (
        <Alert variant="filled" severity="info" className="alert">
          Downloading will start in a few seconds...
        </Alert>
      )}
      {isDownloaded && (
        <Alert variant="filled" severity="success" className="alert">
          Download complete!
        </Alert>
      )}
      {isError && (
        <Alert variant="filled" severity="error" className="alert">
          Error occurred. Please try again later.
        </Alert>
      )}
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
          disabled={loading || !url.trim()}
        >
          {loading ? "Downloading..." : "Download"}{" "}
        </Button>
      </div>
    </div>
  );
};

export default Home;
