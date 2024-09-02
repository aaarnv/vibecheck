import React, { useState } from 'react';
import '../styles/vibecheck.css'; // Import the CSS for styling

const emotions = ['anger', 'disgust', 'fear', 'envy', 'anxiety', 'ennui', 'embarrassment'];

const VibeCheck = ({ onSubmit, onClose }) => {
  const [mood, setMood] = useState(5);
  const [additionalVibes, setAdditionalVibes] = useState([]);
  const [note, setNote] = useState('');
  const [share, setShare] = useState(true);
  const [showVibeDropdown, setShowVibeDropdown] = useState(false);
  const [showNotePrompt, setShowNotePrompt] = useState(false);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleAddVibe = (e) => {
    const emotion = e.target.value;
    if (emotion && !additionalVibes.find(vibe => vibe.emotion === emotion)) {
      setAdditionalVibes([...additionalVibes, { emotion, value: 5 }]); // Default value set to 5
    }
    e.target.value = ''; // Reset the dropdown value
    setShowVibeDropdown(false); // Hide dropdown after selection
  };

  const handleVibeValueChange = (index, value) => {
    const updatedVibes = additionalVibes.map((vibe, i) =>
      i === index ? { ...vibe, value: value } : vibe
    );
    setAdditionalVibes(updatedVibes);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleShareChange = (e) => {
    setShare(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Debug: Log the vibe data before submitting
    console.log('Submitting vibe:', {
      mood,
      additionalVibes,
      note,
      share,
    });

    onSubmit({
      mood: parseInt(mood, 10), // Ensure mood is an integer
      additionalVibes,
      note,
      share,
    });

    // Reset form after submission
    setMood(5);
    setAdditionalVibes([]);
    setNote('');
    setShare(true);
    onClose();
  };

  const availableEmotions = emotions.filter(emotion => !additionalVibes.find(vibe => vibe.emotion === emotion));

  return (
    <div className="vibecheck-overlay">
      <div className="vibecheck-container">
        <span className="close-text" onClick={onClose}>×</span>
        <form onSubmit={handleSubmit}>
          <h2>vibecheck!</h2>
          <div className="mood-scale">
            <img src="sadness.png" alt="Sad Face" />
            <input
              name="mood"
              type="range"
              min="0"
              max="10"
              value={mood}
              onChange={handleMoodChange}
            />
            <img src="happiness.png" alt="Happy Face" />
          </div>
          <div className="additional-vibes">
            <button type="button" onClick={() => setShowVibeDropdown(!showVibeDropdown)}>+ vibe</button>
            {showVibeDropdown && (
              <select onChange={handleAddVibe}>
                <option value="">Select an emotion</option>
                {availableEmotions.map((emotion) => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
            )}
            {additionalVibes.map((vibe, index) => (
              <div className="additional-vibe" key={index}>
                <img src={`${vibe.emotion}.png`} alt={vibe.emotion} />
                <input
                  name={vibe.emotion}
                  type="range"
                  min="0"
                  max="10"
                  value={vibe.value}
                  onChange={(e) => handleVibeValueChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="note">
            <button type="button" onClick={() => setShowNotePrompt(!showNotePrompt)}>+ note</button>
            {showNotePrompt && (
              <textarea
                value={note}
                onChange={handleNoteChange}
                placeholder="Add a note..."
              />
            )}
          </div>
          <div className="share">
            <label>
              <input
                type="checkbox"
                checked={share}
                onChange={handleShareChange}
              />
              share?
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VibeCheck;
