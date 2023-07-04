import React, { useState, useEffect } from 'react';
import './timer.css'

const TimerComponent = ({ timer, timestamp }) => {
  const [countdown, setCountdown] = useState(timer);
  useEffect(() => {
    let interval = null;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  useEffect(() => {
    setCountdown(timer);
  }, [timestamp]);

  return (
    <div>
      <div className='timer'><span className='timevalue'>{timestamp}</span></div>
      {countdown > 0 ? (
        <div className='timer'>Refreshing in: {countdown}</div>
      ) : (
        <div className='timer'>Refreshing...</div>
      )}
    </div>
  );
};

export default TimerComponent;