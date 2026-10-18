import React from 'react';
import { 
  FileText, 
  Award, 
  TrendingUp, 
  Coins, 
  ArrowRight, 
  Building, 
  ShieldCheck,
  Leaf
} from 'lucide-react';

export default function Hero({ labInfo, onExploreResearch, onExplorePubs, onContact }) {
  const stats = [
    { label: "Refereed Publications", value: labInfo.stats.papers, sub: "ChemSusChem, Applied Energy, RSC", icon: FileText, color: "#e05328", bg: "#ffedd5" },
    { label: "Patents (Granted & Filed)", value: labInfo.stats.patents, sub: "Green Energy & Gasification", icon: Award, color: "#b45309", bg: "#fef3c7" },
    { label: "Citations Worldwide", value: labInfo.stats.citations, sub: "Google Scholar Profile", icon: TrendingUp, color: "#166534", bg: "#dcfce7" },
    { label: "Sponsored R&D Grants", value: labInfo.stats.grants, sub: "DST, MNRE, Tata Trust, MoEFCC", icon: Coins, color: "#0284c7", bg: "#e0f2fe" },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container">
        {/* Main 2-Column Banner (Inspired by User's Reference Layout) */}
        <div className="hero-editorial-banner">
          {/* Left Column: Typographic Content */}
          <div className="hero-editorial-left">
            <div className="hero-eyebrow-wrap">
              <span className="badge badge-terracotta">
                <Leaf size={13} />
                Centre for Sustainable Technologies (CST)
              </span>
              <span className="badge badge-muted">Centre for Sustainable Development &bull; IISc Bangalore</span>
            </div>

            {/* Editorial Title Styled Exactly Like the Reference Banner with guaranteed line breaks */}
            <div className="hero-title-group">
              <span className="hero-title-prefix">Innovating for a</span>
              <h1 className="hero-title-main">
                <span className="title-word-terracotta">Sustainable</span>
                <span className="title-word-forest">Future</span>
              </h1>
            </div>

            {/* Subtitle with Stylized Highlights */}
            <p className="hero-editorial-subtitle">
              Pioneering <span className="highlight-terracotta">Catalytic Biomass Conversion</span>, Green Hydrogen, and <span className="highlight-forest">Circular Bio-Based Materials</span> at the Centre for Sustainable Technologies, Indian Institute of Science.
            </p>

            {/* Action Buttons (Styled like the reference 'Shop Now' button with reliable spacing) */}
            <div className="hero-editorial-actions">
              <button onClick={onExploreResearch} className="btn-hero-terracotta">
                <span>Explore Research</span>
                <ArrowRight size={17} />
              </button>

              <button onClick={onExplorePubs} className="btn-hero-outline">
                <FileText size={17} />
                <span>View Publications</span>
              </button>

              <button onClick={onContact} className="btn-hero-forest">
                <Building size={17} />
                <span>Contact Department</span>
              </button>
            </div>

            {/* Small Trust Micro-strip */}
            <div className="hero-trust-strip">
              <span>Chair of Department: <strong>{labInfo.leadName}</strong> ({labInfo.leadDesignation})</span>
            </div>
          </div>

          {/* Right Column: IISc Clock Tower Building Cutout */}
          <div className="hero-editorial-right">
            <div className="iisc-building-stage">
              {/* Soft warm aura backdrop behind the building */}
              <div className="building-warm-aura"></div>

              {/* High-res IISc Clock Tower Cutout */}
              <img 
                src="/iisc-tower.png" 
                alt="IISc Bangalore Historic Stone Clock Tower Building" 
                className="iisc-building-cutout"
              />

              {/* Floating Decorative Badge Chips */}
              <div className="floating-chip chip-top-left">
                <Building size={14} className="text-terracotta" />
                <span>NIRF #1 University in India</span>
              </div>

              <div className="floating-chip chip-bottom-right">
                <ShieldCheck size={14} className="text-forest" />
                <span>CST Dept &bull; Est. 1974</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid (Clean White Cards in Light Theme) */}
        <div className="hero-stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card glass-card">
                <div className="stat-icon-wrap" style={{ color: stat.color, background: stat.bg }}>
                  <Icon size={24} />
                </div>
                <div className="stat-data">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-sub">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
