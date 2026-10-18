import React, { useState, useMemo } from 'react';
import { 
  Microscope, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpDown, 
  Layers, 
  BookOpen, 
  Sparkles, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Clock, 
  Tag, 
  Building2,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function ResearchSection({ themes = [], projects = [] }) {
  // View toggle: 'projects' (Timeline of 48+ projects) vs 'themes' (4 core thrust pillars)
  const [activeTab, setActiveTab] = useState('projects');
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' (2026 -> 1974) or 'oldest' (1974 -> 2026)
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Available Domains for filtering
  const domains = [
    { id: 'all', label: 'All Domains' },
    { id: 'Hydrogen & Gasification', label: 'Hydrogen & Gasification' },
    { id: 'Catalysis & Bio-Chemicals', label: 'Catalysis & Bio-Chemicals' },
    { id: 'Circular Polymers & Bioplastics', label: 'Bioplastics & Polymers' },
    { id: 'Sustainable Habitat & Geopolymer', label: 'Sustainable Habitat & Cement' },
    { id: 'Solar Thermal & Water Purification', label: 'Solar & Water Purification' },
    { id: 'Rural Energy & Decentralized Bio-systems', label: 'Decentralized Energy & Biogas' },
  ];

  // Available Eras for filtering
  const eras = [
    { id: 'all', label: 'All Eras (1974–2026)' },
    { id: '2026', label: '2026 (Frontier)' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2020-2023', label: '2020–2023' },
    { id: '2010-2019', label: '2010–2019' },
    { id: '2000-2009', label: '2000–2009' },
    { id: 'Historic ASTRA (1974-1999)', label: 'Historic ASTRA (1974–1999)' },
  ];

  // Quick suggestion tags
  const popularKeywords = [
    'Green Hydrogen',
    '5-HMF',
    'Oxy-Steam',
    'Bioplastics',
    'Geopolymer',
    'Solar Desalination',
    'ASTRA Hosahalli',
    'Pura Biogas'
  ];

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter((proj) => {
      // Domain filter
      if (selectedDomain !== 'all' && proj.domain !== selectedDomain) {
        return false;
      }

      // Era filter
      if (selectedEra !== 'all' && proj.era !== selectedEra) {
        return false;
      }

      // Live search query matching across all text fields
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = proj.title?.toLowerCase().includes(q);
        const inSummary = proj.summary?.toLowerCase().includes(q);
        const inDetails = proj.details?.toLowerCase().includes(q);
        const inDomain = proj.domain?.toLowerCase().includes(q);
        const inPi = proj.pi?.toLowerCase().includes(q);
        const inFunding = proj.funding?.toLowerCase().includes(q);
        const inOutcome = proj.outcome?.toLowerCase().includes(q);
        const inYear = proj.year?.toString().includes(q);
        const inTags = proj.tags?.some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inSummary && !inDetails && !inDomain && !inPi && !inFunding && !inOutcome && !inYear && !inTags) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    return result.sort((a, b) => {
      if (sortOrder === 'latest') {
        return b.year - a.year || b.id.localeCompare(a.id);
      } else {
        return a.year - b.year || a.id.localeCompare(b.id);
      }
    });
  }, [projects, selectedDomain, selectedEra, searchQuery, sortOrder]);

  const getStatusBadgeClass = (statusType) => {
    switch (statusType) {
      case 'active': return 'badge-green';
      case 'transferred': return 'badge-cyan';
      case 'commercial': return 'badge-terracotta';
      case 'historic': return 'badge-gold';
      default: return 'badge-muted';
    }
  };

  return (
    <section id="research" className="section-padding research-section">
      <div className="container">
        {/* Institutional Section Header */}
        <div className="section-header">
          <span className="section-tag">Scientific Research Portfolio</span>
          <h2>Innovating for Sustainable Energy, Materials & Habitat</h2>
          <p>
            From pioneering the historic ASTRA community microgrids in 1974 to today's cutting-edge green hydrogen, 
            catalytic biomass valorization, and carbon-negative architecture at IISc Bangalore.
          </p>
        </div>

        {/* Portfolio Stats Highlight Bar */}
        <div className="research-portfolio-stats">
          <div className="r-stat-item">
            <span className="r-stat-num">{projects.length || 48}+</span>
            <span className="r-stat-lbl">Research Projects & Milestones</span>
          </div>
          <div className="r-stat-divider"></div>
          <div className="r-stat-item">
            <span className="r-stat-num">1974 – 2026</span>
            <span className="r-stat-lbl">52 Years of Impact</span>
          </div>
          <div className="r-stat-divider"></div>
          <div className="r-stat-item">
            <span className="r-stat-num">₹45+ Cr</span>
            <span className="r-stat-lbl">Active Sponsored R&D</span>
          </div>
          <div className="r-stat-divider"></div>
          <div className="r-stat-item">
            <span className="r-stat-num">100+</span>
            <span className="r-stat-lbl">Field Pilot Deployments</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="research-view-switcher">
          <button
            onClick={() => setActiveTab('projects')}
            className={`view-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          >
            <Clock size={16} />
            <span>Research Projects & Timeline ({projects.length || 48} Projects)</span>
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`view-tab-btn ${activeTab === 'themes' ? 'active' : ''}`}
          >
            <Layers size={16} />
            <span>Core Thematic Pillars ({themes.length} Thrusts)</span>
          </button>
        </div>

        {/* ================= VIEW 1: PROJECTS & TIMELINE (DEFAULT) ================= */}
        {activeTab === 'projects' && (
          <div className="projects-catalog-wrapper">
            {/* Search Bar & Filter Controls Box */}
            <div className="research-search-panel glass-card">
              {/* Keyword Search Input */}
              <div className="pub-search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search 48+ research projects by any keyword (e.g., hydrogen, 5-HMF, gasification, cement, solar, ASTRA, Dasappa, 2026)..."
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

              {/* Quick Search Tag Suggestions */}
              <div className="research-quick-tags-row">
                <span className="quick-tag-label">
                  <Sparkles size={13} className="text-terracotta" />
                  <span>Popular Search Keywords:</span>
                </span>
                <div className="quick-tags-list">
                  {popularKeywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(searchQuery.toLowerCase() === kw.toLowerCase() ? '' : kw)}
                      className={`quick-tag-pill ${searchQuery.toLowerCase() === kw.toLowerCase() ? 'active' : ''}`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters Row: Era, Domain, and Sort Toggle */}
              <div className="research-filters-row">
                {/* Domain Selector */}
                <div className="filter-group">
                  <label className="filter-label">Domain:</label>
                  <select 
                    value={selectedDomain} 
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="filter-select"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Era / Year Selector */}
                <div className="filter-group">
                  <label className="filter-label">Timeline / Era:</label>
                  <select 
                    value={selectedEra} 
                    onChange={(e) => setSelectedEra(e.target.value)}
                    className="filter-select"
                  >
                    {eras.map((era) => (
                      <option key={era.id} value={era.id}>{era.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Order Button */}
                <div className="filter-group sort-group">
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}
                    className="sort-order-btn"
                    title="Toggle timeline sorting order"
                  >
                    <ArrowUpDown size={14} />
                    <span>{sortOrder === 'latest' ? 'Newest First (2026 → 1974)' : 'Oldest First (1974 → 2026)'}</span>
                  </button>
                </div>

                {/* Live Count Badge */}
                <div className="results-count-badge ml-auto">
                  Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="no-results-card glass-card">
                <h4>No Matching Research Projects</h4>
                <p>
                  No projects matched your search criteria for "<strong>{searchQuery}</strong>" in the selected filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDomain('all');
                    setSelectedEra('all');
                  }}
                  className="btn-secondary"
                  style={{ marginTop: '1rem' }}
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Research Projects Timeline Grid */}
            <div className="research-projects-grid">
              {filteredProjects.map((proj) => {
                const isHistoric = proj.year < 2000;
                const isCuttingEdge = proj.year === 2026;

                return (
                  <div
                    key={proj.id}
                    className={`research-project-card glass-card ${isHistoric ? 'card-historic' : ''} ${isCuttingEdge ? 'card-frontier' : ''}`}
                    onClick={() => setSelectedProject(proj)}
                  >
                    {/* Card Top Meta */}
                    <div className="proj-card-top">
                      <div className="proj-year-badge">
                        <Calendar size={13} />
                        <span>{proj.year}</span>
                        {isCuttingEdge && <span className="frontier-pill">2026 Frontier</span>}
                        {isHistoric && <span className="historic-pill">ASTRA Landmark</span>}
                      </div>

                      <span className={`badge ${getStatusBadgeClass(proj.statusType)} proj-status-badge`}>
                        {proj.status}
                      </span>
                    </div>

                    {/* Domain & Title */}
                    <div className="proj-domain-tag">{proj.domain}</div>
                    <h3 className="proj-card-title">{proj.title}</h3>

                    {/* Summary */}
                    <p className="proj-card-summary">{proj.summary}</p>

                    {/* Outcome Highlight Box */}
                    {proj.outcome && (
                      <div className="proj-outcome-box">
                        <Award size={14} className="text-terracotta" />
                        <span><strong>Milestone:</strong> {proj.outcome}</span>
                      </div>
                    )}

                    {/* PI & Funding */}
                    <div className="proj-card-meta">
                      <div className="meta-pi">
                        <strong>Lead:</strong> {proj.pi}
                      </div>
                      <div className="meta-funding">
                        <strong>Grant:</strong> {proj.funding}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="proj-tags-list">
                      {proj.tags.slice(0, 4).map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                          className="proj-tag-btn"
                          title={`Filter by tag: ${tag}`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {/* Card Footer Button */}
                    <div className="proj-card-footer">
                      <span className="text-terracotta font-semibold text-sm">
                        View Abstract & Testbed Diagram &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: CORE THEMATIC PILLARS ================= */}
        {activeTab === 'themes' && (
          <div className="research-grid">
            {themes.map((theme) => (
              <div 
                key={theme.id} 
                className="theme-card glass-card"
                onClick={() => setSelectedTheme(theme)}
              >
                <div className="theme-card-top">
                  <div className="theme-number-badge">
                    <span>{theme.number}</span>
                  </div>
                  <div className="theme-icon-box">
                    <Microscope size={24} />
                  </div>
                </div>

                <div className="theme-card-body">
                  <span className="theme-subtitle">{theme.subtitle}</span>
                  <h3 className="theme-title">{theme.title}</h3>
                  <p className="theme-summary">{theme.summary}</p>
                </div>

                <div className="theme-tags-wrap">
                  {theme.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="theme-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="theme-card-footer">
                  <span className="theme-paper-count">
                    <BookOpen size={14} />
                    <span>{theme.paperCount} Associated Papers</span>
                  </span>
                  <button className="theme-explore-btn">
                    <span>Deep Dive</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-card research-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span className="badge badge-terracotta">Year: {selectedProject.year}</span>
                <span className={`badge ${getStatusBadgeClass(selectedProject.statusType)}`}>
                  {selectedProject.status}
                </span>
                <span className="badge badge-muted">{selectedProject.domain}</span>
              </div>
              <h2>{selectedProject.title}</h2>
              <p className="modal-subtitle">{selectedProject.summary}</p>
            </div>

            <div className="modal-body">
              {selectedProject.diagram && (
                <div className="modal-diagram-box">
                  <img 
                    src={selectedProject.diagram} 
                    alt={selectedProject.title} 
                    className="theme-modal-img" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="diagram-caption">
                    <Layers size={14} />
                    <span>Pilot Plant / Experimental Testbed Facility &bull; IISc CST Bengaluru</span>
                  </div>
                </div>
              )}

              <div className="modal-text-section">
                <h4>Detailed Research Methodology & Technical Implementation</h4>
                <p>{selectedProject.details}</p>

                {selectedProject.outcome && (
                  <div className="modal-awards-box" style={{ marginTop: '1.25rem' }}>
                    <Award size={18} />
                    <div>
                      <strong>Key Research Breakthrough / Milestone:</strong>
                      <div>{selectedProject.outcome}</div>
                    </div>
                  </div>
                )}

                <div className="modal-meta-box" style={{ marginTop: '1.25rem' }}>
                  <div>
                    <strong>Principal Investigators / Lead Faculty:</strong> {selectedProject.pi}
                  </div>
                  <div>
                    <strong>Funding Agency & Grant:</strong> {selectedProject.funding}
                  </div>
                  <div>
                    <strong>Timeline & Era:</strong> {selectedProject.year} ({selectedProject.era})
                  </div>
                </div>

                <h4 style={{ marginTop: '1.25rem' }}>Research Keywords</h4>
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-purple">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: '2rem' }}>
              <button onClick={() => setSelectedProject(null)} className="btn-secondary">
                Close Abstract
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thematic Pillar Modal */}
      {selectedTheme && (
        <div className="modal-overlay" onClick={() => setSelectedTheme(null)}>
          <div className="modal-content glass-card research-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedTheme(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <span className="badge badge-terracotta">Thrust Area {selectedTheme.number}</span>
              <h2>{selectedTheme.title}</h2>
              <p className="modal-subtitle">{selectedTheme.subtitle}</p>
            </div>

            <div className="modal-body">
              <div className="modal-diagram-box">
                <img 
                  src={selectedTheme.diagram} 
                  alt={selectedTheme.title} 
                  className="theme-modal-img" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="diagram-caption">
                  <Layers size={14} />
                  <span>Architecture & Experimental Pipeline Testbed &bull; IISc CST Lab</span>
                </div>
              </div>

              <div className="modal-text-section">
                <h4>Research Methodology & Objectives</h4>
                <p>{selectedTheme.details}</p>

                <h4 style={{ marginTop: '1.25rem' }}>Active Focus Keywords</h4>
                <div className="modal-tags">
                  {selectedTheme.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-purple">{tag}</span>
                  ))}
                </div>

                <div className="modal-meta-box">
                  <div>
                    <strong>Lead Investigators:</strong> {selectedTheme.leadMember}
                  </div>
                  <div>
                    <strong>Total Archival Publications:</strong> {selectedTheme.paperCount} peer-reviewed works
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedTheme(null)} className="btn-secondary">
                Close Pillar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
