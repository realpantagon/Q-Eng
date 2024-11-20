import React from 'react';

const QueueCard = ({ queue }) => (
  <div>
    <h3>{queue.purpose}</h3>
    <p>Status: {queue.Status}</p>
  </div>
);

export default QueueCard;
