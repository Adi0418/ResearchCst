import React, { useState } from 'react';
import { Images, Calendar, MapPin, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GallerySection({ albums }) {
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]?.id || null);
  const [lightboxData, setLightboxData] = useState(null); // { photos: [], currentIndex: 0, title: '' }

  const currentAlbum = albums.find(a => a.id === selectedAlbum) || albums[0];

  const openLightbox = (index) => {
    if (currentAlbum && currentAlbum.photos) {
      setLightboxData({
        photos: currentAlbum.photos,
        currentIndex: index,
        title: currentAlbum.title
      });
    }
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (!lightboxData) return;
    setLightboxData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.photos.length
    }));
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (!lightboxData) return;
    setLightboxData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  };

  return (
    <section id="gallery" className="section-padding gallery-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Laboratory Album</span>
          <h2>Moments & Milestones</h2>
          <p>
            Glimpses of our doctoral celebrations, overseas conference trips, 
            campus science open-days, and annual retreats.
          </p>
        </div>

        {/* Album Selector Tabs */}
        <div className="album-selector-tabs">
          {albums.map((alb) => (
            <button
              key={alb.id}
              onClick={() => setSelectedAlbum(alb.id)}
              className={`album-tab-btn ${selectedAlbum === alb.id ? 'active' : ''}`}
            >
              <Images size={15} />
              <span>{alb.title}</span>
            </button>
          ))}
        </div>

        {/* Current Active Album Details */}
        {currentAlbum && (
          <div className="active-album-box">
            <div className="album-meta-header">
              <div>
                <h3 className="album-title">{currentAlbum.title}</h3>
                <p className="album-desc">{currentAlbum.description}</p>
              </div>
              <div className="album-meta-tags">
                <span className="album-meta-item">
                  <Calendar size={14} />
                  {currentAlbum.date}
                </span>
                <span className="album-meta-item">
                  <MapPin size={14} />
                  {currentAlbum.location}
                </span>
              </div>
            </div>

            {/* Photos Masonry/Grid */}
            <div className="photos-grid">
              {currentAlbum.photos.map((photo, pIdx) => (
                <div 
                  key={pIdx} 
                  className="photo-card glass-card"
                  onClick={() => openLightbox(pIdx)}
                >
                  <div className="photo-img-wrap">
                    <img src={photo.url} alt={photo.caption} className="album-photo-img" loading="lazy" />
                    <div className="photo-hover-overlay">
                      <Maximize2 size={24} className="zoom-icon" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>
                  <div className="photo-caption">
                    <p>{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxData && (
        <div className="lightbox-overlay" onClick={() => setLightboxData(null)}>
          <button className="lightbox-close-btn" onClick={() => setLightboxData(null)}>
            <X size={26} />
          </button>

          <button className="lightbox-nav-btn prev" onClick={prevPhoto}>
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxData.photos[lightboxData.currentIndex].url} 
              alt={lightboxData.photos[lightboxData.currentIndex].caption} 
              className="lightbox-img" 
            />
            <div className="lightbox-caption-bar">
              <span className="lightbox-counter">
                {lightboxData.currentIndex + 1} / {lightboxData.photos.length}
              </span>
              <p className="lightbox-caption-text">
                {lightboxData.photos[lightboxData.currentIndex].caption}
              </p>
              <span className="lightbox-album-name">{lightboxData.title}</span>
            </div>
          </div>

          <button className="lightbox-nav-btn next" onClick={nextPhoto}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
