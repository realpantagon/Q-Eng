import axios from 'axios';

const AIRTABLE_BASE = 'appQe113GQW5x9SrM'; // Replace with your actual base ID
const TABLE_NAME = 'Queue'; // Replace with your actual table name
const AIRTABLE_API_KEY = 'pat1bPVsh007aPjzm.876b1fda279a67e7f1707606ffe60b0f691249fd10e764fd39b14eb37de2fc81'; // Replace with your actual API token

// Fetch queues
export const fetchQueues = async () => {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_NAME}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });
    return response.data.records;
  } catch (error) {
    console.error('Error fetching queues:', error);
    return [];
  }
};

// Create a new queue
export const createQueue = async (fields) => {
    try {
      const response = await axios.post(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_NAME}`, {
        records: [
          {
            fields: {
              purpose: fields.purpose, // Ensure 'purpose' matches your Airtable column name
              Status: fields.Status || 'Waiting', // Ensure 'Status' matches your Airtable column name
            },
          },
        ],
      }, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.records[0];
    } catch (error) {
      console.error('Error creating queue:', error);
      throw error;
    }
  };
  

// Update queue status
export const updateQueueStatus = async (id, status) => {
  try {
    const response = await axios.patch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_NAME}`, {
      records: [{ id, fields: { Status: status } }],
    }, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.records[0];
  } catch (error) {
    console.error('Error updating queue:', error);
  }
};

// Reset queue by deleting all records
export const resetQueue = async () => {
  try {
    const records = await fetchQueues();
    const deletePromises = records.map(record =>
      axios.delete(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE_NAME}`, {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        params: { 'records[]': record.id },
      })
    );
    await Promise.all(deletePromises);
    console.log('Queue reset successfully!');
  } catch (error) {
    console.error('Error resetting queue:', error);
  }
};
