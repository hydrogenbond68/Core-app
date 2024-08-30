import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisV, faPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Messages = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showNewMessageInput, setShowNewMessageInput] = useState(false);  // State to handle new message input display
  const chatMessagesRef = useRef(null);

  const wsUrl = 'ws://127.0.0.1:8000/ws'; // Adjust the URL if using SSL
  const token = localStorage.getItem('authToken'); // Fetch the token from local storage

  useEffect(() => {
    if (!token) {
      console.error('No token found, WebSocket connection cannot be established.');
      return;
    }

    // Create WebSocket client
    const client = new W3CWebSocket(${wsUrl}?token=${token});

    client.onopen = () => {
      console.log('WebSocket connection opened');
    };

    client.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    client.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      client.close();
    };
  }, [token, wsUrl]);

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users', {
        headers: {
          'Authorization': Bearer ${token}
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(http://127.0.0.1:8000/messages?with=${selectedUser.id}, {
        headers: {
          'Authorization': Bearer ${token}
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      try {
        const response = await fetch('http://127.0.0.1:8000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer ${token}
          },
          body: JSON.stringify({
            recipient_id: selectedUser.id,
            content: newMessage
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Response error:', errorData);
          throw new Error(errorData.msg || 'Error sending message');
        }

        setNewMessage(''); // Clear input field after successful submission
        fetchMessages(); // Refresh messages
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="text-lg text-gray-800" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Inbox</h2>
          <button>
            <FontAwesomeIcon icon={faEllipsisV} className="text-lg text-gray-800" />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">

          {showNewMessageInput ? (
            <div className="flex items-start mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowNewMessageInput(false)}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center mb-4">
              <div className="bg-red-500 p-3 rounded-full" onClick={() => setShowNewMessageInput(true)}>
                <FontAwesomeIcon icon={faPen} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">New message</h3>
              </div>
            </div>
          )}

          <div className="flex items-center mb-4">
            <div className="bg-gray-300 p-3 rounded-full">
              <FontAwesomeIcon icon={faUserPlus} className="text-gray-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Invite your friends</h3>
              <p className="text-sm text-gray-500">Connect to start chatting</p>
            </div>
          </div>

          {selectedUser ? (
            <>
              <div className="chat-header">
                Chat with {selectedUser.username}
              </div>
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={message ${msg.sender?.id === token ? 'sent' : 'received'}}
                    >
                      <span className="text">{msg.content}</span>
                      <p className="message-time">{msg.time}</p>
                    </div>
                  ))
                ) : (
                  <p>No messages yet</p>
                )}
              </div>
              <form className="chat-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-colors duration-300">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="chat-header">Select a user to start chatting</div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;