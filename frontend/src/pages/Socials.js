import React, { useEffect, useState } from 'react';
import { getFriendsVibes, getFriendRequests, getFriends, searchUsers, sendFriendRequest, respondFriendRequest } from '../services/api';
import '../styles/Socials.css';
import FriendVibeEntry from '../components/FriendVibeEntry'; // Import the new component

const Socials = () => {
  const [friendsVibes, setFriendsVibes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchFriendsVibes = async () => {
    try {
      const response = await getFriendsVibes();
      setFriendsVibes(response);
    } catch (err) {
      console.error('Error fetching friends\' vibes:', err.message);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await getFriendRequests();
      setFriendRequests(response);
    } catch (err) {
      console.error('Error fetching friend requests:', err.message);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await getFriends();
      console.log(response);
      setFriends(response);
    } catch (err) {
      console.error('Error fetching friends:', err.message);
    }
  };

  useEffect(() => {
    fetchFriendsVibes();
    fetchFriendRequests();
    fetchFriends();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setSearchResults(response);
    } catch (err) {
      console.error('Error searching users:', err.message);
    }
  };

  const handleSendFriendRequest = async (id) => {
    try {
      await sendFriendRequest(id);
      alert('Friend request sent!');
    } catch (err) {
      console.error('Error sending friend request:', err.message);
    }
  };

  const handleRespondFriendRequest = async (id, response) => {
    try {
      await respondFriendRequest(id, response);
      alert(`Friend request ${response}`);
      // Update the friend request list
      const updatedRequests = friendRequests.filter(req => req.from._id !== id);
      setFriendRequests(updatedRequests);
    } catch (err) {
      console.error('Error responding to friend request:', err.message);
    }
    fetchFriendsVibes();
    fetchFriendRequests();
    fetchFriends();
  };

  return (
    <div className="socials-container">
      <div className="socials-main">
        <div className="socials-friends">
          <h2>Friends' Vibes</h2>
          {friendsVibes.length > 0 ? (
            friendsVibes.map((vibe, index) => (
              <FriendVibeEntry key={index} mood={vibe} />
            ))
          ) : (
            <p>No shared vibe checks from friends yet.</p>
          )}
        </div>
      </div>
      <div className="socials-sidebar">
        <div className="socials-search">
          <h2>Add Friend</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username"
          />
          <button onClick={handleSearch}>Search</button>
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((user) => (
                <li key={user._id}>
                  {user.userId} ({user.email})
                  <button onClick={() => handleSendFriendRequest(user._id)}>Add Friend</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="socials-friend-requests">
          <h2>Friend Requests</h2>
          {friendRequests.length > 0 ? (
            friendRequests.map((req, index) => (
              <div className="friend-request" key={index}>
                <p>Request from: {req.from}</p>
                <button onClick={() => handleRespondFriendRequest(req.from, 'accepted')}>Accept</button>
                <button onClick={() => handleRespondFriendRequest(req.from, 'rejected')}>Reject</button>
              </div>
            ))
          ) : (
            <p>No friend requests.</p>
          )}
        </div>
        <div className="socials-friends-list">
          <h2>Friends List</h2>
          {friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li key={friend}>
                  {friend}
                </li>
              ))}
            </ul>
          ) : (
            <p>No friends added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Socials;
