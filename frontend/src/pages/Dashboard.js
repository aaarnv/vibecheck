import React, { useEffect, useState } from 'react';
import { addMood, getMoods } from '../services/api';

const Dashboard = () => {
  const [mood, setMood] = useState('');
  const [moods, setMoods] = useState([]);
  const userId = 'some-user-id'; // Replace with actual user ID

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await getMoods(userId);
        setMoods(response.data);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    };
    fetchMoods();
  }, [userId]);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMood({ userId, mood });
      setMood('');
      const response = await getMoods(userId);
      setMoods(response.data);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleMoodSubmit}>
        <input name="mood" type="text" onChange={handleMoodChange} placeholder="Your mood" value={mood} />
        <button type="submit">Add Mood</button>
      </form>
      <ul>
        {moods.map((mood, index) => (
          <li key={index}>{mood.mood} on {new Date(mood.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
