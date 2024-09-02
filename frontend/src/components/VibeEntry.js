import React from 'react';
import '../styles/VibeEntry.css';

const VibeEntry = ({ mood, onDelete, onShareChange }) => {

  // Convert the createdAt date to a readable format
  const formattedDate = new Date(mood.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mood-entry-container">
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
      <div className="share">
        <label>
          <input
            type="checkbox"
            checked={mood.share}
            onClick={() => onShareChange(mood._id, !mood.share)}
          />
          Share this vibe
        </label>
      </div>
      <div className="date-posted">
        <p>Date Posted: {formattedDate}</p>
      </div>
      <button className="delete-button" onClick={() => onDelete(mood._id)}>Delete</button>
    </div>
  );
};

export default VibeEntry;
