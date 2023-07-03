import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.css';

const SplashScreen = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const videoElement = document.getElementById('video');

    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };

    videoElement.addEventListener('canplaythrough', handleVideoLoaded);
    const handleVideoEnd = () => {
      navigate('/options');
    };
    videoElement.addEventListener('ended', handleVideoEnd);
    return () => {
      videoElement.removeEventListener('canplaythrough', handleVideoLoaded);
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [navigate]);

  return (
    <div id="splash-container">
      <video id="video" autoPlay muted onEnded={() => navigate('/options')}>
        <source src="/splash.mp4" type="video/mp4" />
        {/* Include additional source tags for other video formats if needed */}
      </video>
    </div>
  );
};

export default SplashScreen;
