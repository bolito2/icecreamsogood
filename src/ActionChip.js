import React from 'react';
import './ActionChip.css'; // Importing the CSS file for styling

const ActionChip = ({ icon, text }) => {
  return (
    <div className="action-chip">
      <img src={icon}/>
      {text}
    </div>
  );
};

export default ActionChip;