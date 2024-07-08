import React, { useEffect, useState } from 'react';
import { addVibe, getFriendsVibes, getUserVibes } from '../services/api';
import VibeCheck from '../components/vibecheck';
import '../styles/Socials.css';

const Socials = () => {
  const [showVibeCheck, setShowVibeCheck] = useState(false);
  const [friendsVibes, setFriendsVibes] = useState([]);
  const [userVibes, setUserVibes] = useState([]);
  const userId = 'some-user-id'; // Replace with actual user ID

  useEffect(() => {
    const fetchFriendsVibes = async () => {
      try {
        const response = await getFriendsVibes(userId);
        setFriendsVibes(response.data);
      } catch (err) {
        console.error('Error fetching friends\' vibes:', err.message);
      }
    };

    const fetchUserVibes = async () => {
      try {
        const response = await getUserVibes(userId);
        setUserVibes(response.data);
      } catch (err) {
        console.error('Error fetching user vibes:', err.message);
      }
    };

    fetchFriendsVibes();
    fetchUserVibes();
  }, [userId]);

  const handleVibeCheckSubmit = async (vibeData) => {
    try {
      await addVibe(vibeData);
      setShowVibeCheck(false);
      const response = await getUserVibes(userId);
      setUserVibes(response.data);
      alert('Mood submitted successfully!');
    } catch (err) {
      console.error('Error submitting mood:', err.message);
    }
  };

  return (
    <div className="socials-container">
      <div className="socials-friends">
        <h2>Friends' Vibe Checks</h2>
        {friendsVibes.length > 0 ? (
          friendsVibes.map((vibe, index) => (
            <div className="vibe-entry" key={index}>
              <p>{new Date(vibe.date).toLocaleString()}</p>
              <p>Happiness: {vibe.mood}</p>
              {vibe.additionalVibes.map((additional, i) => (
                <p key={i}>{additional.emotion}: {additional.value}</p>
              ))}
              <p>Note: {vibe.note}</p>
            </div>
          ))
        ) : (
          <p>No shared vibe checks from friends yet.</p>
        )}
      </div>
      <div className="socials-user">
        <h2>Your Shared Vibe Checks</h2>
        <button className="vibecheck-button" onClick={() => setShowVibeCheck(true)}>+ vibecheck</button>
        {userVibes.length > 0 ? (
          userVibes.map((vibe, index) => (
            <div className="vibe-entry" key={index}>
              <p>{new Date(vibe.date).toLocaleString()}</p>
              <p>Happiness: {vibe.mood}</p>
              {vibe.additionalVibes.map((additional, i) => (
                <p key={i}>{additional.emotion}: {additional.value}</p>
              ))}
              <p>Note: {vibe.note}</p>
            </div>
          ))
        ) : (
          <p>You haven't shared any vibe checks yet.</p>
        )}
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

export default Socials;
