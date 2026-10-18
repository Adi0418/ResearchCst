import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Mail, 
  MapPin, 
  GraduationCap, 
  ExternalLink, 
  Award, 
  Copy, 
  Check, 
  X,
  BookOpen,
  Briefcase,
  Code,
  Search,
  Sparkles
} from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function MembersSection({ members, onNotify }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [copiedEmailId, setCopiedEmailId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Team Members' },
    { id: 'faculty', label: 'Faculty & PI' },
    { id: 'postdoc', label: 'Postdoctoral Fellows' },
    { id: 'phd', label: 'Ph.D. Scholars' },
    { id: 'masters', label: 'M.Tech & Associates' },
    { id: 'alumni', label: 'Distinguished Alumni' },
  ];

  const quickSearchTags = [
    'Green Hydrogen', 
    'Biomass Gasification', 
    'Catalysis', 
    'Bioplastics', 
    'Geopolymer', 
    'PMRF Fellow'
  ];

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      // Category filter
      if (activeCategory !== 'all' && m.category !== activeCategory) {
        return false;
      }
      // Search query filter (search by ANY word)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = m.name?.toLowerCase().includes(q);
        const matchNative = m.nativeName?.toLowerCase().includes(q);
        const matchTitle = m.title?.toLowerCase().includes(q);
        const matchRole = m.role?.toLowerCase().includes(q);
        const matchTopic = (m.topic || m.researchTopic || '')?.toLowerCase().includes(q);
        const matchDegrees = m.degrees?.toLowerCase().includes(q);
        const matchRoom = m.room?.toLowerCase().includes(q);
        const matchEmail = m.email?.toLowerCase().includes(q);
        const matchAwards = m.awards?.toLowerCase().includes(q);
        const matchBio = m.bio?.toLowerCase().includes(q);

        if (!matchName && !matchNative && !matchTitle && !matchRole && !matchTopic && 
            !matchDegrees && !matchRoom && !matchEmail && !matchAwards && !matchBio) {
          return false;
        }
      }
      return true;
    });
  }, [members, activeCategory, searchQuery]);

  const handleCopyEmail = (e, member) => {
    e.stopPropagation();
    navigator.clipboard.writeText(member.email);
    setCopiedEmailId(member.id);
    if (onNotify) onNotify(`Copied ${member.name}'s email!`);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  return (
    <section id="members" className="section-padding members-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Laboratory Directory</span>
          <h2>Faculty, Researchers & Scholars</h2>
          <p>
            Meet our multidisciplinary team of chemical engineers, material scientists, 
            doctoral scholars, and alumni advancing renewable energy and circular bio-economy in India and worldwide.
          </p>
        </div>

        {/* Live Search Bar for Faculty & Scholars */}
        <div className="members-search-container glass-card">
          <div className="pub-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search faculty & scholars by any keyword (name, topic, hydrogen, catalysis, degree, room)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pub-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                title="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="members-search-meta">
            <div className="search-quick-tags">
              <span className="quick-tag-label">
                <Sparkles size={13} className="text-terracotta" />
                <span>Search by Topic:</span>
              </span>
              {quickSearchTags.map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(searchQuery.toLowerCase() === tag.toLowerCase() ? '' : tag)}
                  className={`quick-tag-pill ${searchQuery.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="results-count-badge">
              Showing <strong>{filteredMembers.length}</strong> of {members.length} faculty & scholars
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="member-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`member-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty Search Results Notice */}
        {filteredMembers.length === 0 && (
          <div className="no-results-card glass-card">
            <h4>No Faculty or Scholars Found</h4>
            <p>
              No members matched your search for "<strong>{searchQuery}</strong>" in the selected category.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
              className="btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Reset Search & Show All Members
            </button>
          </div>
        )}

        {/* Member Cards Grid */}
        <div className="members-grid">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="member-card glass-card"
              onClick={() => setSelectedMember(member)}
            >
              <div className="member-avatar-wrapper">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="member-avatar-img"
                  loading="lazy"
                />
                <span className="member-role-badge">
                  {member.role}
                </span>
              </div>

              <div className="member-info">
                <div className="member-name-row">
                  <h3 className="member-name">{member.name}</h3>
                  {member.nativeName && (
                    <span className="member-native-name">{member.nativeName}</span>
                  )}
                </div>

                <div className="member-title">{member.title}</div>

                <div className="member-degrees">
                  <GraduationCap size={14} />
                  <span>{member.degrees}</span>
                </div>

                <div className="member-topic-box">
                  <span className="topic-label">Focus:</span>
                  <span className="topic-text">{member.topic}</span>
                </div>

                <div className="member-room">
                  <MapPin size={14} />
                  <span>{member.room}</span>
                </div>

                {/* Card Actions */}
                <div className="member-actions-row">
                  <button 
                    onClick={(e) => handleCopyEmail(e, member)}
                    className="member-email-btn"
                    title={`Click to copy email: ${member.email}`}
                  >
                    {copiedEmailId === member.id ? <Check size={14} className="text-green" /> : <Mail size={14} />}
                    <span>{copiedEmailId === member.id ? 'Copied Email!' : 'Copy Email'}</span>
                  </button>

                  <div className="member-social-links" onClick={(e) => e.stopPropagation()}>
                    {member.scholarUrl && (
                      <a 
                        href={member.scholarUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Google Scholar Profile"
                        className="social-icon-btn"
                      >
                        <BookOpen size={14} />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="GitHub Profile"
                        className="social-icon-btn"
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="view-profile-btn"
                      title="View Full Profile"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-content glass-card member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMember(null)}>
              <X size={20} />
            </button>

            <div className="member-modal-grid">
              <div className="modal-avatar-col">
                <img src={selectedMember.avatar} alt={selectedMember.name} className="modal-avatar-lg" />
                <span className="badge badge-cyan modal-role-pill">{selectedMember.role}</span>
                <div className="modal-contact-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{selectedMember.room}</span>
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{selectedMember.email}</span>
                  </div>
                  {selectedMember.orcid && (
                    <div className="detail-item">
                      <span className="orcid-badge">ORCID</span>
                      <span>{selectedMember.orcid}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-bio-col">
                <div className="modal-name-header">
                  <h2>{selectedMember.name}</h2>
                  {selectedMember.nativeName && (
                    <span className="native-title">{selectedMember.nativeName}</span>
                  )}
                  <p className="modal-lead-title">{selectedMember.title} &bull; {selectedMember.degrees}</p>
                </div>

                <div className="modal-section-block">
                  <h4>Research Focus</h4>
                  <p className="topic-highlight">{selectedMember.topic}</p>
                </div>

                <div className="modal-section-block">
                  <h4>Academic Biography</h4>
                  <p>{selectedMember.bio}</p>
                </div>

                {selectedMember.awards && (
                  <div className="modal-section-block">
                    <h4>Honors & Awards</h4>
                    <div className="modal-awards-box">
                      <Award size={18} className="award-icon" />
                      <span>{selectedMember.awards}</span>
                    </div>
                  </div>
                )}

                <div className="modal-footer-btns">
                  <button 
                    onClick={(e) => handleCopyEmail(e, selectedMember)} 
                    className="btn-primary"
                  >
                    <Mail size={16} />
                    <span>Send Inquiry / Copy Email</span>
                  </button>
                  {selectedMember.scholarUrl && (
                    <a 
                      href={selectedMember.scholarUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary"
                    >
                      <BookOpen size={16} />
                      <span>Google Scholar</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
