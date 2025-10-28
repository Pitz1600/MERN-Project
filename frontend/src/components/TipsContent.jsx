import React from 'react'
import { useState } from 'react';
import tips from '../context/tips';
import '../styles/components/TipsContent.css';

const TipsContent = () => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
      const autoAdvanceRef = React.useRef(null);
    
      const startAutoAdvance = React.useCallback(() => {
        if (!tips || tips.length === 0) return;
        // clear any existing interval
        if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = setInterval(() => {
          setCurrentTipIndex((idx) => (idx + 1) % tips.length);
        }, 30000);
      }, []);
    
      const resetAutoAdvance = React.useCallback(() => {
        // restart the timer so user gets full interval after manual interaction
        if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
        startAutoAdvance();
      }, [startAutoAdvance]);
    
      // Start auto-advance on mount and when tips length changes
      React.useEffect(() => {
        startAutoAdvance();
        return () => {
          if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
        };
      }, [startAutoAdvance, tips.length]);
  return (
    <div>
        <h3>Additional Tips</h3>
        <div className="tip-content">
            <p>{tips && tips.length ? tips[currentTipIndex] : 'No tips available.'}</p>
        </div>

        <div className="tips-pagination">
        <button
            className="tip-nav left"
            onClick={() => {
            setCurrentTipIndex((idx) => {
                const next = (idx - 1 + tips.length) % tips.length;
                return next;
            });
            resetAutoAdvance();
            }}
            aria-label="Previous tip"
        >
            ‹
        </button>

        <div className="tip-dots">
            {tips.map((_, idx) => (
            <button
                key={idx}
                className={`tip-dot ${currentTipIndex === idx ? 'active' : ''}`}
                onClick={() => { setCurrentTipIndex(idx); resetAutoAdvance(); }}
                aria-label={`Go to tip ${idx + 1}`}
            />
            ))}
        </div>

        <button
            className="tip-nav right"
            onClick={() => {
            setCurrentTipIndex((idx) => {
                const next = (idx + 1) % tips.length;
                return next;
            });
            resetAutoAdvance();
            }}
            aria-label="Next tip"
        >
            ›
        </button>
        </div>
    </div>
  )
}

export default TipsContent
