import React, { useState } from 'react';
import { 
  Building2, 
  BookOpen, 
  Users, 
  Microscope, 
  Newspaper, 
  Images, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentPage = 'home', 
  onNavigate, 
  activeSection, 
  setActiveSection, 
  isAdmin, 
  onOpenAdmin 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active page can be currentPage or fallback to activeSection
  const activePage = currentPage || activeSection || 'home';
  const handleNavigate = onNavigate || setActiveSection;

  const navLinks = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'gallery', label: 'Album', icon: Images },
    { id: 'access', label: 'Access & Contact', icon: MapPin },
  ];

  const handleNavClick = (id) => {
    if (handleNavigate) {
      handleNavigate(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Banner Notice */}
      <div className="top-institution-bar">
        <div className="container top-bar-content">
          <div className="institution-brand">
            <span className="iisc-emblem">IISc</span>
            <span className="inst-text">
              <span className="inst-text-full"><strong>Indian Institute of Science</strong> &bull; Centre for Sustainable Technologies (CST)</span>
              <span className="inst-text-mobile"><strong>IISc Bangalore</strong> &bull; CST</span>
            </span>
          </div>

          <div className="top-bar-right">
            <span className="inst-heritage-badge">ASTRA Heritage &bull; Est. 1974</span>

            <button 
              onClick={onOpenAdmin} 
              className={`admin-portal-pill ${isAdmin ? 'admin-active' : ''}`}
              title="Department Admin Portal (Manage, Add & Delete entries)"
            >
              <ShieldCheck size={14} />
              <span>{isAdmin ? 'Admin Console' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <nav className="main-navbar">
        <div className="container nav-content">
          {/* Lab Logo & Brand */}
          <div className="lab-brand" onClick={() => handleNavClick('home')}>
            <div className="brand-crest">
              <span className="crest-cst">CST</span>
              <span className="crest-lab">IISc</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">Centre for Sustainable Technologies (CST)</span>
              <span className="brand-subtitle">
                <span className="brand-sub-full">Centre for Sustainable Development &bull; IISc Bengaluru</span>
                <span className="brand-sub-mobile">IISc Bengaluru</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="desktop-nav-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                  {isActive && <span className="active-indicator" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <div className="mobile-admin-wrap">
              <button onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }} className="admin-portal-pill full-width">
                <ShieldCheck size={16} />
                <span>{isAdmin ? 'Open Admin Console' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
