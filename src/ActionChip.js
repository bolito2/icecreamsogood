import React from 'react';
import './ActionChip.css'; // Importing the CSS file for styling

const ActionChip = ({ text }) => {
  return (
    <div className="action-chip">
      {text}
    </div>
  );
};

export default ActionChip;