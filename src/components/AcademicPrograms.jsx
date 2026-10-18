import React from 'react';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, CheckCircle2, Coins, Calendar, FileText } from 'lucide-react';

export default function AcademicPrograms({ onNavigateMembers, onNavigateAccess }) {
  const programs = [
    {
      id: "prog-phd",
      title: "Doctoral Research (Ph.D.) in Sustainable Technologies",
      badge: "Flagship Doctoral Degree",
      badgeClass: "badge-terracotta",
      duration: "4 – 5 Years Full-Time",
      stipend: "₹37,000 – ₹42,000 / month + HRA (Institute / PMRF / CSIR-JRF)",
      summary: "Rigorous doctoral research in clean hydrogen catalysts, high-temperature gasification, bio-based PEF plastics, green habitat architecture, and ecological water purification.",
      features: [
        "Direct access to IISc Central Facilities and CST Pilot Plants",
        "Opportunities for Prime Minister's Research Fellowship (PMRF)",
        "Fully funded international conference travel grants",
        "Interdisciplinary dual-advisory with Chemical, Mechanical, or Civil Engineering"
      ],
      eligibility: "M.E. / M.Tech or 4-year B.E. / B.Tech / M.Sc. with valid GATE or CSIR-UGC NET JRF."
    },
    {
      id: "prog-mtech",
      title: "Master of Technology (M.Tech) in Energy & Sustainability",
      badge: "Postgraduate Degree",
      badgeClass: "badge-forest",
      duration: "2 Years Full-Time",
      stipend: "₹12,400 / month (MoE GATE Fellowship)",
      summary: "Interdisciplinary coursework bridging advanced thermodynamics, heterogeneous catalysis, green building simulation, and a full 1-year master's dissertation project.",
      features: [
        "Hands-on lab rotations in pilot gasifier operations and analytical chemistry",
        "Direct campus placements with top clean-tech, automotive, and energy conglomerates",
        "Sponsored industrial master's projects with GAIL, IOCL, and Tata Motors",
        "Pathway to direct Ph.D. upgrade for exceptional candidates"
      ],
      eligibility: "B.E. / B.Tech in Chemical, Mechanical, Civil, Environmental, or Biotechnology with valid GATE."
    },
    {
      id: "prog-postdoc",
      title: "Postdoctoral Research Fellowships & Visiting Scholars",
      badge: "Advanced Research",
      badgeClass: "badge-cyan",
      duration: "1 – 3 Years",
      stipend: "₹58,000 – ₹70,000 / month + HRA (SERB N-PDF / IISc IoE)",
      summary: "Independent research appointments for doctoral graduates aiming to lead frontier sustainability breakthroughs, patent novel technologies, and mentor graduate scholars.",
      features: [
        "Substantial annual contingency research grant (₹2.0 – ₹5.0 Lakhs)",
        "Full institutional access to high-performance computing clusters and analytical labs",
        "Mentorship with CST senior faculty and National Academy Fellows",
        "Dedicated office space and subsidized on-campus housing"
      ],
      eligibility: "Ph.D. degree in engineering or relevant physical/chemical sciences."
    }
  ];

  return (
    <section className="home-preview-section home-academics-section">
      <div className="container">
        <div className="home-section-header-row">
          <div className="home-section-title-wrap">
            <span className="section-tag">Academic Excellence</span>
            <h2>Graduate Studies & Research Fellowships</h2>
            <p>
              Train at India's #1 research university. CST offers interdisciplinary graduate degrees and research fellowships preparing the next generation of global clean-tech leaders.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={onNavigateMembers} className="btn-secondary">
              <Users size={16} />
              <span>Meet Faculty Advisors</span>
            </button>
            <button onClick={onNavigateAccess} className="btn-hero-terracotta">
              <span>Admissions & Visiting Inquiries</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 3 Academic Cards */}
        <div className="academic-programs-grid">
          {programs.map((prog) => (
            <div key={prog.id} className="academic-program-card glass-card">
              <div className="acad-card-header">
                <span className={`badge ${prog.badgeClass}`}>{prog.badge}</span>
                <span className="acad-duration">
                  <Calendar size={13} />
                  <span>{prog.duration}</span>
                </span>
              </div>

              <h3 className="acad-title">{prog.title}</h3>
              <p className="acad-summary">{prog.summary}</p>

              <div className="acad-stipend-box">
                <Coins size={15} className="text-forest flex-shrink-0" />
                <div>
                  <strong>Fellowship / Financial Support:</strong>
                  <div>{prog.stipend}</div>
                </div>
              </div>

              <div className="acad-features-block">
                <h4 className="acad-feat-heading">Key Program Highlights:</h4>
                <ul className="acad-feat-list">
                  {prog.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="text-forest flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="acad-eligibility">
                <strong>Eligibility:</strong> {prog.eligibility}
              </div>

              <div className="acad-footer">
                <button onClick={onNavigateAccess} className="acad-inquire-link">
                  <span>Inquire for Upcoming Admissions Cycle &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
