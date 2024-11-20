import React, { useEffect, useState } from 'react';
import { fetchQueues, updateQueueStatus, resetQueue} from '../Utils/airtableApi';

const ManageQueue = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchQueues();
      setQueues(data);
    }, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const handleCall = async (id) => {
    await updateQueueStatus(id, 'Called');
  };

  const handleSkip = async (id) => {
    await updateQueueStatus(id, 'Skip');
  };

  const handleReset = async () => {
    await resetQueue();
  };

  return (
    <div>
      <h1>Manage Queue</h1>
      <button onClick={handleReset}>Reset Queue</button>
      {queues.map(queue => (
        <div key={queue.id}>
          <h3>{queue.fields.purpose}</h3>
          <p>Status: {queue.fields.Status}</p>
          <button onClick={() => handleCall(queue.id)}>Call</button>
          <button onClick={() => handleSkip(queue.id)}>Skip</button>
        </div>
      ))}
    </div>
  );
};

export default ManageQueue;
