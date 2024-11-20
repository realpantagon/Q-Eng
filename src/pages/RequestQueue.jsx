import React, { useState } from 'react';
import { createQueue } from '../Utils/airtableApi';

const RequestQueue = () => {
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!purpose.trim()) {
      setError('Purpose is required');
      return;
    }

    try {
      await createQueue({ purpose, Status: 'Waiting' });
      setPurpose(''); // Clear input on success
      alert('Queue request submitted successfully!');
    } catch (err) {
      setError('Failed to create queue. Please try again.');
    }
  };

  return (
    <div>
      <h1>Request Queue</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RequestQueue;
