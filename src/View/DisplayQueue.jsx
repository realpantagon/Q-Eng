import React, { useEffect, useState } from 'react';
import { fetchQueues } from '../Utils/airtableApi';
import QueueCard from '../Components/QueueCard';

const DisplayQueue = () => {
  const [latestQueue, setLatestQueue] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchQueues();
      if (data.length > 0) {
        // Sort queues by createdTime (descending) and take the latest one
        const sortedQueues = data.sort((a, b) =>
          new Date(b.fields.Created) - new Date(a.fields.Created)
        );
        const newLatestQueue = sortedQueues[0];

        // If the latest queue changes, trigger text-to-speech
        if (!latestQueue || newLatestQueue.id !== latestQueue.id) {
          setLatestQueue(newLatestQueue);
          speakQueue(newLatestQueue.fields); // Call the TTS function
        }
      }
    }, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [latestQueue]);

  // Function to perform text-to-speech
  const speakQueue = (queue) => {
    if (!queue || !queue.purpose) return;

    const message = `Now calling: ${queue.purpose}`;
    const speech = new SpeechSynthesisUtterance(message);

    // Set voice and speech parameters (optional)
    speech.lang = 'en-US'; // Language
    speech.pitch = 1; // Pitch (default is 1)
    speech.rate = 1; // Speed (default is 1)
    speech.volume = 1; // Volume (range is 0 to 1)

    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h1>Display Queue</h1>
      {latestQueue ? (
        <QueueCard queue={latestQueue.fields} />
      ) : (
        <p>No queues available</p>
      )}
    </div>
  );
};

export default DisplayQueue;
