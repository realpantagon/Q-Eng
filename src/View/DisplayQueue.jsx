import React, { useEffect, useState } from 'react';
import { fetchQueues } from '../Utils/airtableApi';
import QueueCard from '../Components/QueueCard';

const DisplayQueue = () => {
  const [latestQueue, setLatestQueue] = useState(null);
  const [lastAnnouncedQueueId, setLastAnnouncedQueueId] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchQueues();

        if (data.length > 0) {
          // Sort queues by createdTime (descending) and take the latest one
          const sortedQueues = data.sort((a, b) =>
            new Date(b.fields.Created) - new Date(a.fields.Created)
          );
          const newLatestQueue = sortedQueues[0]; // Latest queue being called

          // Update the latest queue state
          setLatestQueue(newLatestQueue);

          // If this is a new queue that hasn't been announced yet, speak it
          if (newLatestQueue.id !== lastAnnouncedQueueId) {
            speakQueue(newLatestQueue.fields); // Trigger text-to-speech
            setLastAnnouncedQueueId(newLatestQueue.id); // Track last announced queue
          }
        }
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    }, 10000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [lastAnnouncedQueueId]); // Dependency ensures it re-checks for updates

  // Function to perform text-to-speech
  const speakQueue = (queue) => {
    if (!queue || !queue.purpose) return;

    const message = `Now calling: ${queue.purpose}`;
    console.log(message); // Log the spoken message for debugging
    const speech = new SpeechSynthesisUtterance(message);

    // Set voice and speech parameters (optional)
    speech.lang = 'en-US'; // Language
    speech.pitch = 1; // Pitch (default is 1)
    speech.rate = 1; // Speed (default is 1)
    speech.volume = 1; // Volume (range is 0 to 1)

    window.speechSynthesis.cancel(); // Stop any ongoing speech before speaking
    window.speechSynthesis.speak(speech); // Start speaking
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
