import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";

import "./stories.css";

const Stories = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stories, setStories] = useState([]);

  const apiKey = process.env.REACT_APP_X_RAPIDAPI_KEY;

  const hideAlerts = () => {
    setTimeout(() => {
      setIsDownloaded(false);
      setIsError(false);
    }, 3000);
  };

  const handleClick = async () => {
    setLoading(true);

    const options = {
      method: "GET",
      url: `https://instagram-bulk-scraper-latest.p.rapidapi.com/download_story/${url}`,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "instagram-bulk-scraper-latest.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data);

      const storiesData = response.data.data.stories;
      const storyImages = storiesData.map(
        (story) => story.image_versions2.candidates[3].url
      );
      console.log(storyImages);

      if (storiesData.length > 0) {
        // const downloadLink = stories[0].video_versions[0].url;

        setStories(storiesData);

        // window.location.href = downloadLink;
      } else {
        throw new Error("No stories found");
      }
    } catch (error) {
      console.error("API Error:", error);

      setIsError(true);
      hideAlerts();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (videoUrl) => {
    window.location.href = videoUrl;
  };

  return (
    <div
      className="stories-div"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
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
      <div className="intro">
        <h1>Instagram Stories Downloader</h1>
        <p>
          Download Instagram Stories videos in High quality. Paste the username
          of the user whose stories you want to download, and click on the send
          button.
        </p>
      </div>
      <div className="box">
        <TextField
          label="Paste Username"
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
      {stories.length > 0 && (
        <div className="response">
          {stories.map((story, index) => (
            <div key={index} className="story-item">
              <img src={story.image_url} alt="Story" />
              <Button
                variant="contained"
                color="success"
                className="button"
                onClick={() => handleDownload(story.video_versions[0].url)}
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

export default Stories;
