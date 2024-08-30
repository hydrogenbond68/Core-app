// src/components/BoardsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { boards } from '../data/boards';
import "./hashtags.css"

function CreateHashtags() {
  return (
    <div className="boards-list">
      {boards.map(board => (
        <div key={board.id} className="board-item">
          <Link to={`/board/${board.id}`}>
            <h2>{board.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CreateHashtags;