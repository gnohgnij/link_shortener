import { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [url, setUrl] = useState("");
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const [newUrl, setNewUrl] = useState("");
  const [helperText, setHelperText] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoaded(false);
      let res = await fetch("http://localhost:3306/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalURL: url,
          threshold: threshold,
        }),
      });

      let json = await res.json();

      if (json.status) {
        setHelperText(json.reason);
        setNewUrl("");
      } else {
        setNewUrl(json.url.newURL);
        setHelperText("");
      }
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const [threshold, setThreshold] = useState(0);
  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>Link Shortener</h1>
        <form onSubmit={handleFormSubmit}>
          <TextField
            id="outlined-basic"
            label="Enter your URL here"
            variant="outlined"
            fullWidth
            value={url}
            onChange={handleUrlChange}
            helperText={helperText}
            error={helperText !== "" ? true : false}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter your threshold value"
            variant="outlined"
            fullWidth
            value={threshold}
            onChange={handleThresholdChange}
            helperText={helperText}
            error={helperText !== "" ? true : false}
            required
            sx={{ mt: "1rem" }}
          />
          <div className="center mt-1rem">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <h1>Shortened URL:</h1>
        <div className="center">
          {isLoaded && (
            <a href={newUrl} target="_blank">
              {newUrl}
            </a>
          )}
          {!isLoaded && <CircularProgress />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
