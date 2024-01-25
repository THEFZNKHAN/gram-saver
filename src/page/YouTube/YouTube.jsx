import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";

import "./youTube.css";

const YouTube = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [quality, setQuality] = useState([]);

  const apiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;

  const hideAlerts = () => {
    setTimeout(() => {
      setIsDownloading(false);
      setIsError(false);
    }, 3000);
  };

  const handleClick = async () => {
    setLoading(true);

    const options = {
      method: "POST",
      url: "https://youtube86.p.rapidapi.com/api/youtube/links",
      headers: {
        "content-type": "application/json",
        "X-Forwarded-For": "70.41.3.18",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "youtube86.p.rapidapi.com",
      },
      data: {
        url: url,
      },
    };

    try {
      const response = await axios.request(options);
      const qualityData = response.data[0]?.urls;

      if (qualityData && Array.isArray(qualityData)) {
        const urlsData = qualityData.map((urlData) => ({
          url: urlData.url,
          extension: urlData.extension,
          quality: urlData.quality,
        }));

        setQuality(urlsData);
      } else {
        throw new Error("Quality data is missing or not an array.");
      }
    } catch (error) {
      setIsError(true);
      hideAlerts();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (videoUrl) => {
    setIsDownloading(true);
    hideAlerts();
    window.location.href = videoUrl;
  };

  return (
    <div
      className="youtube-div"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
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
        <h1>YouTube Downloader</h1>
        <p>
          Download YouTube videos in any quality. Paste the URL of the video and
          click on the SEND Button, then select the quality and click the
          DOWNLOAD Button.
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
          endIcon={<SendIcon />}
          disabled={loading || !url.trim()}
        >
          {loading ? "Wait..." : "Send"}{" "}
        </Button>
      </div>
      {quality.length > 0 && (
        <div className="response">
          {quality.map((quality, index) => (
            <div key={index} className="quality">
              <div className="info">
                <p>
                  <b>Quality</b>: {quality.quality}
                </p>
                <p>
                  <b>Extension</b>: {quality.extension}
                </p>
              </div>
              <Button
                variant="contained"
                color="success"
                className="button"
                onClick={() => handleDownload(quality.url)}
                endIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTube;
