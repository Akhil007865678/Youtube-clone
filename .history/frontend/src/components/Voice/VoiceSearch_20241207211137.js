import React, { useState } from 'react';

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState("");

  const handleVoiceCommand = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setIsListening(false);
      if (spokenText.toLowerCase().startsWith("hey youtube")) {
        const searchQuery = spokenText.slice(11).trim();
        setQuery(searchQuery);
        searchVideos(searchQuery); // Call the function to fetch search results
      } else {
        alert("Please start your command with 'Hey YouTube'.");
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Error recognizing speech. Please try again.");
    };

    recognition.start();
  };

  const searchVideos = (searchQuery) => {
    fetch(`/api/videos/search?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data);
        // Display the search results on the page
      })
      .catch((err) => console.error("Error fetching search results:", err));
  };

  return (
    <div>
      <button onClick={handleVoiceCommand}>
        {isListening ? "Listening..." : "Start Voice Command"}
      </button>
      {query && <p>Searching for: {query}</p>}
    </div>
  );
};

export default VoiceSearch;
