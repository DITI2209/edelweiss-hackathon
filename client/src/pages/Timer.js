import React, { useState, useEffect } from 'react';

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
      <div>Timestamp: {timestamp}</div>
      {countdown > 0 ? (
        <div>Refreshing in: {countdown}</div>
      ) : (
        <div>Refreshing...</div>
      )}
    </div>
  );
};

export default TimerComponent;