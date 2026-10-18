import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';

export default function NewsSection({ news }) {
  const [selectedNews, setSelectedNews] = useState(null);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Facility': return 'badge-gold';
      case 'Award': return 'badge-cyan';
      case 'Publication': return 'badge-purple';
      case 'Grant': return 'badge-green';
      default: return 'badge-muted';
    }
  };

  return (
    <section id="news" className="section-padding news-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Announcements</span>
          <h2>Latest News & Lab Events</h2>
          <p>
            Stay updated with our breakthroughs, conference presentations, grants, 
            and graduate student milestones at IISc Bangalore.
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="news-grid">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="news-card glass-card"
              onClick={() => setSelectedNews(item)}
            >
              {item.image && (
                <div className="news-image-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="news-cover-img" 
                    loading="lazy" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className={`badge ${getCategoryBadgeClass(item.category)} news-card-badge`}>
                    {item.category}
                  </span>
                </div>
              )}

              <div className="news-content">
                <div className="news-date">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>

                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>

                <div className="news-read-more">
                  <span>Read Full Story</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Full Story Modal */}
      {selectedNews && (
        <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
          <div className="modal-content glass-card news-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedNews(null)}>
              <X size={20} />
            </button>

            {selectedNews.image && (
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="news-modal-banner" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80';
                }}
              />
            )}

            <div className="news-modal-body">
              <div className="news-modal-meta">
                <span className={`badge ${getCategoryBadgeClass(selectedNews.category)}`}>
                  {selectedNews.category}
                </span>
                <span className="news-modal-date">
                  <Calendar size={14} />
                  {selectedNews.date}
                </span>
              </div>

              <h2>{selectedNews.title}</h2>
              <p className="news-modal-text">{selectedNews.content || selectedNews.excerpt}</p>

              <div className="modal-footer" style={{ marginTop: '2rem' }}>
                <button onClick={() => setSelectedNews(null)} className="btn-secondary">
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
