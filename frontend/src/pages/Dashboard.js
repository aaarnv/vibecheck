import React, { useEffect, useState } from 'react';
import { addVibe, getVibes, getFriendsVibes } from '../services/api';
import VibeCheck from '../components/vibecheck';
import HappinessChart from '../components/HappinessChart';
import EmotionFrequencyChart from '../components/EmotionFrequencyChart';
import '../styles/Dashboard.css';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation


const Dashboard = () => {
  const [showVibeCheck, setShowVibeCheck] = useState(false);
  const [moods, setMoods] = useState([]);
  const [friendsVibes, setFriendsVibes] = useState([]);
  const userId = 'some-user-id'; // Replace with actual user ID

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await getVibes(userId);
        setMoods(response.data);
      } catch (err) {
        //alert('Error: ' + err.message);
      }
    };

    const fetchFriendsVibes = async () => {
      try {
        const response = await getFriendsVibes(userId);
        setFriendsVibes(response.data);
      } catch (err) {
        //alert('Error: ' + err.message);
      }
    };

    fetchMoods();
    fetchFriendsVibes();
  }, [userId]);

  const handleVibeCheckSubmit = async (vibeData) => {
    try {
      await addVibe(vibeData);
      setShowVibeCheck(false);
      const response = await getVibes(userId);
      setMoods(response.data);
      alert('Vibe submitted successfully!');
    } catch (err) {
      //alert('Error: ' + err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h2>Insights</h2>
        <HappinessChart data={moods} />
        <EmotionFrequencyChart data={moods} />
      </div>
      <div className="dashboard-middle">
        <h2>Journal</h2>
        <button className="vibecheck-button" onClick={() => setShowVibeCheck(true)}>+ vibecheck</button>
        {moods.map((mood, index) => (
          <div className="mood-entry" key={index}>
            <p>{new Date(mood.date).toLocaleString()}</p>
            <p>Happiness: {mood.mood}</p>
            {mood.additionalVibes.map((vibe, i) => (
              <p key={i}>{vibe.emotion}: {vibe.value}</p>
            ))}
            <p>Note: {mood.note}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-right">
        <NavLink to="/socials" className="social-link">
          <h2>Social</h2>
        </NavLink>
        <p>Friends new vibes: {friendsVibes.length}</p>
      </div>
      {showVibeCheck && (
        <VibeCheck
          onSubmit={handleVibeCheckSubmit}
          onClose={() => setShowVibeCheck(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
