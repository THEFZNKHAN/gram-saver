import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import DownloadIcon from "@mui/icons-material/Download";

import "./spotify.css";

const Spotify = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getShortURL = (fullURL) => {
    const urlParts = fullURL.split("/");
    const shortURL = urlParts[urlParts.length - 1];
    return shortURL;
  };

  const hideAlerts = () => {
    setTimeout(() => {
      setIsDownloading(false);
      setIsError(false);
    }, 3000);
  };

  const handleClick = async () => {
    setLoading(true);
    const shortURL = getShortURL(url);
    try {
      const response = await axios.get(
        `https://lemonic.viperadnan.com/api/track/${shortURL}`
      );
      const { url: redirectUrl } = response.data;
      window.location.href = redirectUrl;
      setIsDownloading(true);
      hideAlerts();
    } catch (error) {
      setIsError(true);
      hideAlerts();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spotify-div">
      {loading && (
        <Alert variant="filled" severity="info" className="alert">
          Download will be start soon...
        </Alert>
      )}
      {isDownloading && (
        <Alert variant="filled" severity="success" className="alert">
          Downloading...
        </Alert>
      )}
      {isError && (
        <Alert variant="filled" severity="error" className="alert">
          Error occurred. Please try again later.
        </Alert>
      )}
      <div className="intro">
        <h1>Spotify Track Downloader</h1>
        <p>
          Download Spotify Tracks/Songs. Paste the URL of the Track and click on the
          download button.
        </p>
      </div>
      <div className="box">
        <TextField
          label="Paste URL"
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
          {loading ? "Response..." : "Download"}{" "}
        </Button>
      </div>
    </div>
  );
};

export default Spotify;
