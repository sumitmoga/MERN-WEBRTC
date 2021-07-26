import React from 'react';

const StepName = ({ onNext }) => {
 return (
  <>
   <div>StepName component</div>
   <button onClick={onNext}>Next</button>
  </>
 );
};

export default StepName;