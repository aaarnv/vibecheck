import React, { useEffect, useState } from 'react';
import { addVibe, getVibes, getFriendsVibes, deleteVibe, updateVibeShareStatus } from '../services/api';
import VibeCheck from '../components/vibecheck';
import VibeEntry from '../components/VibeEntry';
import HappinessChart from '../components/HappinessChart';
import EmotionFrequencyChart from '../components/EmotionFrequencyChart';
import '../styles/Dashboard.css';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [showVibeCheck, setShowVibeCheck] = useState(false);
  const [moods, setMoods] = useState([]);
  const [friendsVibes, setFriendsVibes] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await getVibes();
        setMoods(response);
      } catch (err) {
        console.error('Error fetching moods:', err.message);
      }
    };

    const fetchFriendsVibes = async () => {
      try {
        const response = await getFriendsVibes();
        setFriendsVibes(response);
      } catch (err) {
        console.error('Error fetching friends\' vibes:', err.message);
      }
    };

    fetchMoods();
    fetchFriendsVibes();
  }, []);

  const handleVibeCheckSubmit = async (vibeData) => {
    try {
      await addVibe(vibeData);
      setShowVibeCheck(false);
      const response = await getVibes();
      setMoods(response);
    } catch (err) {
      console.error('Error submitting vibe:', err.message);
    }
  };

  const handleDeleteVibe = async (id) => {
    try {
      await deleteVibe(id);
      // Automatically remove the deleted vibe from the state
      setMoods(moods.filter(mood => mood._id !== id));
    } catch (err) {
      console.error('Error deleting vibe:', err.message);
    }
  };

  const handleShareChange = async (id, share) => {
    try {
      const updatedVibe = await updateVibeShareStatus(id, !share);
      setMoods(moods.map(mood => mood._id === updatedVibe._id ? updatedVibe : mood));
      alert("share status updated!");
    } catch (err) {
      console.error('Error updating share status:', err.message);
    }
  }

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
        {moods.length > 0 ? moods.map((mood, index) => (
          <VibeEntry key={index} mood={mood} onDelete={handleDeleteVibe} onShareChange={handleShareChange}/>
        )) : <p>No moods recorded yet.</p>}
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
