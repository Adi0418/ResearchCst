import React from 'react';
import { ArrowUp, Building2, Mail, Phone, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ labInfo, onOpenAdmin, onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId === 'home' ? '' : pageId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Affiliation */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-crest">IISc</span>
              <div>
                <h4>{labInfo.name}</h4>
                <p className="footer-sub">{labInfo.department} &bull; {labInfo.institute}</p>
              </div>
            </div>
            <p className="footer-mission-text">
              Pioneering catalytic biomass conversion, renewable hydrogen systems,
              and circular bio-based materials for sustainable development and climate resilience.
            </p>
            <div className="footer-admin-link">
              <button onClick={onOpenAdmin} className="footer-admin-btn">
                <ShieldCheck size={14} />
                <span>Authorized Admin Console</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h5>Sections & Pages</h5>
            <ul className="footer-links-list">
              <li><a href="#/" onClick={(e) => handleLinkClick(e, 'home')}>Home & Overview</a></li>
              <li><a href="#/research" onClick={(e) => handleLinkClick(e, 'research')}>Research Thrust Areas</a></li>
              <li><a href="#/publications" onClick={(e) => handleLinkClick(e, 'publications')}>Publications & Patents</a></li>
              <li><a href="#/members" onClick={(e) => handleLinkClick(e, 'members')}>Faculty & Scholars</a></li>
              <li><a href="#/news" onClick={(e) => handleLinkClick(e, 'news')}>Latest News & Events</a></li>
              <li><a href="#/gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Laboratory Album</a></li>
              <li><a href="#/access" onClick={(e) => handleLinkClick(e, 'access')}>Campus Access & Maps</a></li>
            </ul>
          </div>

          {/* Col 3: Academic Affiliations */}
          <div className="footer-col">
            <h5>Affiliations & Portals</h5>
            <ul className="footer-links-list">
              <li>
                <a href="https://iisc.ac.in/" target="_blank" rel="noopener noreferrer">
                  <span>IISc Bangalore Main Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://cst.iisc.ac.in/" target="_blank" rel="noopener noreferrer">
                  <span>Centre for Sustainable Technologies</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iisc.ac.in/research/" target="_blank" rel="noopener noreferrer">
                  <span>IISc Research & Innovation Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">
                  <span>Google Scholar Profile</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://iisc.ac.in/academics/" target="_blank" rel="noopener noreferrer">
                  <span>IISc Academic Programs</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Office */}
          <div className="footer-col contact-col">
            <h5>Laboratory Address</h5>
            <p className="footer-address">
              {labInfo.address}
            </p>
            <div className="footer-contact-items">
              <div className="f-item">
                <Phone size={14} />
                <span>{labInfo.phone}</span>
              </div>
              <div className="f-item">
                <Mail size={14} />
                <span>{labInfo.officeEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Centre for Sustainable Technologies (CST) &bull; Indian Institute of Science, Bangalore.
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
