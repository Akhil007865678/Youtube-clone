import React, { createContext, useContext, useEffect, useState } from "react";

const VoiceRecognitionContext = createContext();

export const useVoiceRecognition = () => useContext(VoiceRecognitionContext);

const VoiceRecognitionProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState("");

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    const startListening = () => {
      setIsListening(true);
      recognition.start();
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);
      handleVoiceCommand(spokenText); // Process the command
    };

    recognition.onerror = () => {
      setIsListening(false);
      console.error("Voice recognition error");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    const handleVoiceCommand = (spokenText) => {
      if (spokenText.startsWith("hey youtube")) {
        const query = spokenText.slice(11).trim();
        setCommand(query);
        performAction(query); // Perform the action based on the query
      } else {
        console.warn("Unrecognized command:", spokenText);
      }
    };

    const performAction = (query) => {
      // Example action: navigating or fetching data
      if (query.startsWith("search")) {
        const searchTerm = query.replace("search", "").trim();
        window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
      } else if (query.startsWith("go to")) {
        const page = query.replace("go to", "").trim();
        const routes = { home: "/", profile: "/profile", videos: "/videos" };
        window.location.href = routes[page] || "/";
      } else {
        console.log("No action defined for:", query);
      }
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "v" && e.ctrlKey) {
        startListening();
      }
    });

    return () => {
      recognition.stop();
      window.removeEventListener("keydown", startListening);
    };
  }, []);

  return (
    <VoiceRecognitionContext.Provider value={{ isListening, command }}>
      {children}
    </VoiceRecognitionContext.Provider>
  );
};

export default VoiceRecognitionProvider;

