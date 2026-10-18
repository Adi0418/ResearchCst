import React, { useState } from 'react';
import { Megaphone, ArrowRight, Calendar, Pause, Play, Sparkles, ChevronRight, Bell } from 'lucide-react';

export default function MovingAnnouncements({ news, onSelectNews, onNavigateNews }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless continuous looping marquee
  const tickerItems = [...news, ...news];

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Facility': return 'badge-gold';
      case 'Award': return 'badge-cyan';
      case 'Publication': return 'badge-purple';
      case 'Grant': return 'badge-green';
      case 'Symposium': return 'badge-terracotta';
      case 'Farewell': return 'badge-purple';
      default: return 'badge-muted';
    }
  };

  return (
    <div className="announcements-ticker-wrapper">
      <div className="container">
        <div 
          className={`ticker-bar glass-card ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Notice Badge */}
          <div 
            className="ticker-label-box" 
            onClick={onNavigateNews} 
            role="button" 
            tabIndex={0}
            title="Click to view all department announcements"
          >
            <span className="live-pulse-dot"></span>
            <Megaphone size={15} className="ticker-label-icon" />
            <span className="ticker-label-text">Announcements</span>
          </div>

          {/* Scrolling Ticker Track */}
          <div className="ticker-track-viewport">
            <div className={`ticker-track ${isPaused ? 'is-paused' : ''}`}>
              {tickerItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`} 
                  className="ticker-item"
                  onClick={() => onSelectNews ? onSelectNews(item) : onNavigateNews()}
                  title="Click to read announcement details"
                >
                  <span className={`badge ${getCategoryBadgeClass(item.category)} ticker-badge`}>
                    {item.category}
                  </span>
                  <span className="ticker-date">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                  <span className="ticker-title">{item.title}</span>
                  <span className="ticker-separator">&bull;</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="ticker-actions">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }} 
              className="ticker-control-btn"
              title={isPaused ? "Resume ticker movement" : "Pause ticker movement"}
              aria-label={isPaused ? "Play ticker" : "Pause ticker"}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>

            <button 
              onClick={onNavigateNews} 
              className="ticker-view-all-btn"
              title="Browse all department announcements & events"
            >
              <span>All News ({news.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
