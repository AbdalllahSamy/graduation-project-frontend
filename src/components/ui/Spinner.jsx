import React from 'react';

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-solid rounded-full animate-spin"
        style={{
          borderTopColor: '#daac00',
          borderRightColor: 'transparent',
          borderBottomColor: '#daac00',
          borderLeftColor: 'transparent',
        }}
      />
    </div>
  );
}

export default Spinner;
