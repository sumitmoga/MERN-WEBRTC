import React from 'react';

const StepAvatar = ({ onNext }) => {
 return (
  <>
   <div>StepAvatar component</div>
   <button onClick={onNext}>Next</button>
  </>
 );
};

export default StepAvatar;