import React from 'react';
import '../styles/VibeEntry.css';

const FriendVibeEntry = ({ mood }) => {

  // Convert the createdAt date to a readable format
  const formattedDate = new Date(mood.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mood-entry-container">
      <div className="vibe-user-id">
        <h3>{mood.userId.userId}</h3> {/* Displaying the userId */}
      </div>
      <div className="mood-scale">
        <img src="sadness.png" alt="Sad Face" />
        <input
          name="mood"
          type="range"
          min="0"
          max="10"
          value={mood.mood}
          readOnly
          className="read-only-scale"
        />
        <img src="happiness.png" alt="Happy Face" />
      </div>
      <div className="additional-vibes">
        {mood.additionalVibes.map((vibe, index) => (
          <div className="additional-vibe" key={index}>
            <img src={`${vibe.emotion}.png`} alt={vibe.emotion} />
            <input
              name={vibe.emotion}
              type="range"
              min="0"
              max="10"
              value={vibe.value}
              readOnly
              className="read-only-scale"
            />
          </div>
        ))}
      </div>
      {mood.note && (
        <div className="note">
          <p>{mood.note}</p>
        </div>
      )}
      <div className="date-posted">
        <p>Date Posted: {formattedDate}</p>
      </div>
    </div>
  );
};

export default FriendVibeEntry;
