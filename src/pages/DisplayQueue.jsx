import React, { useEffect, useState } from 'react';
import { fetchQueues } from '../Utils/airtableApi';
import QueueCard from '../Components/QueueCard'; // Correct import path for QueueCard

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
        setLatestQueue(sortedQueues[0]); // Take the latest queue
      }
    }, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

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
