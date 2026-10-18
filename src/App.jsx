import React, { useState, useEffect } from 'react';
import { initialLabData } from './data/initialData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovingAnnouncements from './components/MovingAnnouncements';
import ResearchSection from './components/ResearchSection';
import PublicationsSection from './components/PublicationsSection';
import MembersSection from './components/MembersSection';
import NewsSection from './components/NewsSection';
import GallerySection from './components/GallerySection';
import AccessSection from './components/AccessSection';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import ChairMessage from './components/ChairMessage';
import FacilitiesShowcase from './components/FacilitiesShowcase';
import AcademicPrograms from './components/AcademicPrograms';
import PartnersSection from './components/PartnersSection';
import { 
  CheckCircle2, 
  Home as HomeIcon, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Microscope, 
  Newspaper, 
  Images, 
  MapPin, 
  Calendar, 
  X, 
  ExternalLink,
  FileText,
  Building2,
  Sparkles,
  Award,
  Mail,
  Phone
} from 'lucide-react';
import './App.css';

const STORAGE_KEY = 'iisc_cst_sustainable_lab_data_v9';

export default function App() {
  // Load data from localStorage or fallback to rich initial IISc CST dummy data
  const [labData, setLabData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialLabData,
          ...parsed,
          access: {
            ...initialLabData.access,
            ...(parsed.access || {}),
            email: 'navyabhat111@gmail.com'
          },
          researchProjects: (parsed.researchProjects && parsed.researchProjects.length > 20)
            ? parsed.researchProjects
            : initialLabData.researchProjects
        };
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
    return {
      ...initialLabData,
      access: {
        ...initialLabData.access,
        email: 'navyabhat111@gmail.com'
      }
    };
  });

  // Page-based routing state synced with hash
  const getPageFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    const validPages = ['home', 'research', 'publications', 'members', 'news', 'gallery', 'access'];
    if (hash === 'album') return 'gallery';
    if (validPages.includes(hash)) return hash;
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Sync state to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(labData));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }, [labData]);

  // Sync hash changes (browser back/forward button, external links)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Programmatic Page Navigation Helper
  const navigateTo = (pageId) => {
    const target = pageId === 'album' ? 'gallery' : pageId;
    setCurrentPage(target);
    window.location.hash = target === 'home' ? '' : `/${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Admin Data Modification Handlers
  const handleAddPublication = (newPub) => {
    setLabData((prev) => ({
      ...prev,
      publications: [newPub, ...prev.publications],
      labInfo: {
        ...prev.labInfo,
        stats: {
          ...prev.labInfo.stats,
          papers: `${prev.publications.length + 1}+`
        }
      }
    }));
  };

  const handleDeletePublication = (pubId) => {
    setLabData((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== pubId)
    }));
  };

  const handleAddMember = (newMember) => {
    setLabData((prev) => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };

  const handleDeleteMember = (memberId) => {
    setLabData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId)
    }));
  };

  const handleAddNews = (newNewsItem) => {
    setLabData((prev) => ({
      ...prev,
      news: [newNewsItem, ...prev.news]
    }));
  };

  const handleDeleteNews = (newsId) => {
    setLabData((prev) => ({
      ...prev,
      news: prev.news.filter((n) => n.id !== newsId)
    }));
  };

  const handleResetData = () => {
    setLabData(initialLabData);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Render Page Header Banner for Dedicated Pages
  const renderPageHeader = (title, subtitle, pageName, icon) => {
    const PageIcon = icon;
    return (
      <div className="page-header-banner">
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <button onClick={() => navigateTo('home')} className="breadcrumb-home">
              <HomeIcon size={14} />
              <span>Home</span>
            </button>
            <ChevronRight size={13} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{pageName}</span>
          </nav>
          <div className="page-header-content">
            <h1 className="page-main-title">{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lab-app-wrapper">
      {/* Institutional Top Bar & Navbar with multi-page navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        activeSection={currentPage}
        setActiveSection={navigateTo}
        isAdmin={isAdmin}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main>
        {/* ================= PAGE 1: HOME (LENGTHY & COMPREHENSIVE) ================= */}
        {currentPage === 'home' && (
          <div className="page-view-home">
            {/* 1. Hero Section */}
            <Hero 
              labInfo={labData.labInfo}
              onExploreResearch={() => navigateTo('research')}
              onExplorePubs={() => navigateTo('publications')}
              onContact={() => navigateTo('access')}
            />

            {/* 2. Fresh Horizontal Moving Announcements Ticker */}
            <MovingAnnouncements 
              news={labData.news}
              onSelectNews={(item) => setSelectedAnnouncement(item)}
              onNavigateNews={() => navigateTo('news')}
            />

            {/* 3. Message from the Department Chair & 4 Strategic Pillars */}
            <ChairMessage 
              onNavigateMembers={() => navigateTo('members')}
              onNavigateHistory={() => navigateTo('gallery')}
            />

            {/* 4. Core Research Thrust Areas Preview */}
            <section className="home-preview-section">
              <div className="container">
                <div className="home-section-header-row">
                  <div className="home-section-title-wrap">
                    <span className="section-tag">Key Research Frontiers & Timeline</span>
                    <h2>Flagship CST Research Projects (1974–2026)</h2>
                    <p>
                      Addressing climate vulnerability, green hydrogen, and low-carbon materials across 48+ flagship research projects and field demonstrations.
                    </p>
                  </div>
                  <button onClick={() => navigateTo('research')} className="btn-secondary">
                    <span>Search All 48+ Projects & Timeline</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="home-preview-grid-3">
                  {labData.researchThemes.map((theme, idx) => (
                    <div 
                      key={theme.id} 
                      className="home-thrust-card"
                      onClick={() => navigateTo('research')}
                    >
                      <img 
                        src={theme.image} 
                        alt={theme.title} 
                        className="home-thrust-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="home-thrust-body">
                        <span className="home-thrust-num">Thrust Area 0{idx + 1}</span>
                        <h3>{theme.title}</h3>
                        <p>{theme.description || theme.summary}</p>
                        <div className="home-thrust-footer">
                          <span>Focus: {theme.focus || theme.subtitle}</span>
                          <span className="text-terracotta">Learn More &rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. World-Class Experimental Infrastructure & Laboratories */}
            <FacilitiesShowcase 
              onNavigateAlbum={() => navigateTo('gallery')}
              onNavigateAccess={() => navigateTo('access')}
            />

            {/* 6. Recent High-Impact Publications Snapshot */}
            <section className="home-preview-section">
              <div className="container">
                <div className="home-section-header-row">
                  <div className="home-section-title-wrap">
                    <span className="section-tag">Scholarly Impact</span>
                    <h2>Recent High-Impact Publications</h2>
                    <p>
                      Peer-reviewed research published in leading international energy, catalysis, and sustainability journals.
                    </p>
                  </div>
                  <button onClick={() => navigateTo('publications')} className="btn-secondary">
                    <span>Browse All 210+ Publications</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="home-preview-grid-3">
                  {labData.publications.slice(0, 3).map((pub) => (
                    <div 
                      key={pub.id} 
                      className="pub-card glass-card"
                      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <div className="pub-card-header">
                        <span className="badge badge-terracotta">{pub.type}</span>
                        <span className="pub-year">{pub.year}</span>
                      </div>
                      <h4 className="pub-title" style={{ fontSize: '1.05rem', margin: '0.6rem 0' }}>
                        {pub.title}
                      </h4>
                      <div className="pub-authors" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {pub.authors}
                      </div>
                      <div className="pub-journal" style={{ fontStyle: 'italic', fontSize: '0.88rem', color: '#166534', marginTop: 'auto', paddingTop: '0.75rem' }}>
                        <strong>{pub.journal}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Academic Programs & Graduate Research Opportunities */}
            <AcademicPrograms 
              onNavigateMembers={() => navigateTo('members')}
              onNavigateAccess={() => navigateTo('access')}
            />

            {/* 8. Department Faculty Leadership Highlight */}
            <section className="home-preview-section" style={{ background: '#faf8f5' }}>
              <div className="container">
                <div className="home-section-header-row">
                  <div className="home-section-title-wrap">
                    <span className="section-tag">Faculty & Scholars</span>
                    <h2>Department Faculty Leadership</h2>
                    <p>
                      Distinguished investigators leading translational sustainability projects across India.
                    </p>
                  </div>
                  <button onClick={() => navigateTo('members')} className="btn-secondary">
                    <span>Meet All Members & Scholars</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="home-preview-grid-3">
                  {labData.members.slice(0, 3).map((member) => (
                    <div 
                      key={member.id} 
                      className="member-card glass-card"
                      onClick={() => navigateTo('members')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="member-avatar-wrap">
                        <img 
                          src={member.photo || member.avatar} 
                          alt={member.name} 
                          className="member-avatar"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <span className="badge badge-forest member-badge-float">{member.role}</span>
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-title">{member.title}</p>
                        <p className="member-topic">{member.researchTopic || member.topic}</p>
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#e05328', fontWeight: '700' }}>
                          View Profile &rarr;
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. Latest News & Announcements Highlights */}
            <section className="home-preview-section">
              <div className="container">
                <div className="home-section-header-row">
                  <div className="home-section-title-wrap">
                    <span className="section-tag">Department News & Events</span>
                    <h2>Latest Stories & Public Symposia</h2>
                    <p>
                      Stay updated with our breakthroughs, awards, international symposia, and graduate student defenses.
                    </p>
                  </div>
                  <button onClick={() => navigateTo('news')} className="btn-secondary">
                    <span>Browse All Department News</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="news-grid">
                  {labData.news.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      className="news-card glass-card"
                      onClick={() => setSelectedAnnouncement(item)}
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
                          <span className="badge badge-terracotta news-card-badge">
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
                          <span>Read Story</span>
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. Department Heritage & 50-Year Milestones Box */}
            <div className="container">
              <div className="home-heritage-box">
                <div className="heritage-left">
                  <span className="badge badge-gold" style={{ background: '#f59e0b', color: '#0f172a' }}>
                    Department Heritage
                  </span>
                  <h3>Pioneering Sustainable Technology Since 1974</h3>
                  <p>
                    Established under the visionary leadership of Prof. Amulya K. N. Reddy as ASTRA, the Centre for Sustainable Technologies has led India in biomass gasification, rural energy grids, decentralized sanitation, and carbon-negative masonry for over five decades.
                  </p>
                  <div className="heritage-actions">
                    <button onClick={() => navigateTo('gallery')} className="btn-hero-terracotta">
                      <Images size={16} />
                      <span>View Photo Album</span>
                    </button>
                    <button onClick={() => navigateTo('access')} className="btn-hero-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}>
                      <MapPin size={16} />
                      <span>Directions & Maps</span>
                    </button>
                  </div>
                </div>

                <div className="heritage-right-stats">
                  <div className="heritage-stat-card">
                    <div className="heritage-stat-val">50+</div>
                    <div className="heritage-stat-lbl">Years of Academic Impact</div>
                  </div>
                  <div className="heritage-stat-card">
                    <div className="heritage-stat-val">100+</div>
                    <div className="heritage-stat-lbl">Pilot Field Deployments</div>
                  </div>
                  <div className="heritage-stat-card">
                    <div className="heritage-stat-val">25+</div>
                    <div className="heritage-stat-lbl">Patents & Technologies</div>
                  </div>
                  <div className="heritage-stat-card">
                    <div className="heritage-stat-val">₹45 Cr</div>
                    <div className="heritage-stat-lbl">Active R&D Funding</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 11. Sponsors, Industrial Collaborators & Policy Bodies */}
            <PartnersSection />

            {/* 12. Quick Direct Inquiry & Campus Visiting Banner */}
            <div className="container">
              <div className="home-contact-cta-wrapper">
                <div className="home-contact-cta-card">
                  <div className="home-cta-left">
                    <span className="badge badge-terracotta" style={{ background: 'rgba(224, 83, 40, 0.25)', color: '#fed7aa', border: '1px solid rgba(224,83,40,0.5)' }}>
                      Inquiries & Campus Access
                    </span>
                    <h3>Planning a Visit or Collaboration?</h3>
                    <p>
                      Whether you are a prospective graduate researcher, visiting scientist, or industrial technology partner, our faculty and laboratories are eager to connect.
                    </p>

                    <div className="cta-dest-pill">
                      <Mail size={16} className="text-terracotta" />
                      <span>Direct Department Inbox: <strong>navyabhat111@gmail.com</strong></span>
                    </div>

                    <div className="home-cta-actions">
                      <button onClick={() => navigateTo('access')} className="btn-hero-terracotta">
                        <Mail size={16} />
                        <span>Send Message via Inquiry Form</span>
                      </button>
                      <a 
                        href="mailto:navyabhat111@gmail.com?subject=IISc%20CST%20Collaboration%20Inquiry" 
                        className="btn-hero-outline" 
                        style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
                      >
                        <ExternalLink size={16} />
                        <span>Open Direct Mail</span>
                      </a>
                    </div>
                  </div>

                  <div className="home-cta-right-box">
                    <div className="cta-info-item">
                      <MapPin size={18} className="text-terracotta flex-shrink-0" />
                      <div>
                        <strong>Department Location:</strong>
                        <div>Centre for Sustainable Technologies (CST), Indian Institute of Science, CV Raman Road, Bengaluru 560012</div>
                      </div>
                    </div>

                    <div className="cta-info-item">
                      <Phone size={18} className="text-forest flex-shrink-0" />
                      <div>
                        <strong>Department Telephone:</strong>
                        <div>+91-80-2293-2447 (Office Hours: 09:00–17:30 IST)</div>
                      </div>
                    </div>

                    <div className="cta-info-item">
                      <Mail size={18} className="text-cyan flex-shrink-0" />
                      <div>
                        <strong>Contact Email:</strong>
                        <div>navyabhat111@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: RESEARCH ================= */}
        {currentPage === 'research' && (
          <div className="page-view-research">
            {renderPageHeader(
              "Research Projects & Thematic Pillars",
              "Search 48+ flagship projects and milestones spanning green hydrogen, heterogeneous catalysis, low-carbon habitat, and rural energy systems (1974–2026).",
              "Research",
              Microscope
            )}
            <ResearchSection 
              themes={labData.researchThemes} 
              projects={labData.researchProjects || []} 
            />
          </div>
        )}

        {/* ================= PAGE 3: PUBLICATIONS ================= */}
        {currentPage === 'publications' && (
          <div className="page-view-publications">
            {renderPageHeader(
              "Publications & Patents Catalog",
              "Comprehensive repository of peer-reviewed journal articles, patents, book chapters, and technical monographs.",
              "Publications",
              BookOpen
            )}
            <PublicationsSection 
              publications={labData.publications} 
              onNotify={showToast}
            />
          </div>
        )}

        {/* ================= PAGE 4: MEMBERS ================= */}
        {currentPage === 'members' && (
          <div className="page-view-members">
            {renderPageHeader(
              "Faculty & Scholars Directory",
              "Meet the researchers, graduate students, and technical staff driving innovation at the Centre for Sustainable Technologies.",
              "Members",
              Users
            )}
            <MembersSection 
              members={labData.members} 
              onNotify={showToast}
            />
          </div>
        )}

        {/* ================= PAGE 5: NEWS ================= */}
        {currentPage === 'news' && (
          <div className="page-view-news">
            {renderPageHeader(
              "Department News & Announcements",
              "Recent awards, research grant announcements, symposia, and graduate student defense milestones at IISc Bengaluru.",
              "News & Events",
              Newspaper
            )}
            <NewsSection news={labData.news} />
          </div>
        )}

        {/* ================= PAGE 6: ALBUM / GALLERY ================= */}
        {currentPage === 'gallery' && (
          <div className="page-view-gallery">
            {renderPageHeader(
              "Department Photo Album",
              "Photographic archive of our pilot research facilities, experimental reactor setups, symposiums, and field expeditions.",
              "Album",
              Images
            )}
            <GallerySection albums={labData.albums} />
          </div>
        )}

        {/* ================= PAGE 7: ACCESS & CONTACT ================= */}
        {currentPage === 'access' && (
          <div className="page-view-access">
            {renderPageHeader(
              "Campus Access & Inquiries",
              "Visiting guides, campus bus connectivity, laboratory coordinates, and direct contact inquiry form.",
              "Access & Contact",
              MapPin
            )}
            <AccessSection 
              accessInfo={labData.access}
              labInfo={labData.labInfo}
              onNotify={showToast}
            />
          </div>
        )}
      </main>

      {/* Institutional Footer with multi-page navigation */}
      <Footer 
        labInfo={labData.labInfo} 
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigate={navigateTo}
      />

      {/* Admin Portal Modal & CMS Console with Add & Delete Support */}
      <AdminPortal 
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        data={labData}
        onAddPublication={handleAddPublication}
        onDeletePublication={handleDeletePublication}
        onAddMember={handleAddMember}
        onDeleteMember={handleDeleteMember}
        onAddNews={handleAddNews}
        onDeleteNews={handleDeleteNews}
        onResetData={handleResetData}
        onNotify={showToast}
      />

      {/* Announcement Detail Modal (triggered from Moving Announcements Ticker) */}
      {selectedAnnouncement && (
        <div className="modal-overlay" onClick={() => setSelectedAnnouncement(null)}>
          <div className="modal-content glass-card news-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedAnnouncement(null)}
              aria-label="Close Announcement"
            >
              <X size={20} />
            </button>

            {selectedAnnouncement.image && (
              <img 
                src={selectedAnnouncement.image} 
                alt={selectedAnnouncement.title} 
                className="news-modal-banner" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80';
                }}
              />
            )}

            <div className="news-modal-body">
              <div className="news-modal-meta">
                <span className="badge badge-terracotta">
                  {selectedAnnouncement.category}
                </span>
                <span className="news-modal-date">
                  <Calendar size={14} />
                  {selectedAnnouncement.date}
                </span>
              </div>

              <h2>{selectedAnnouncement.title}</h2>
              <p className="news-modal-text">
                {selectedAnnouncement.content || selectedAnnouncement.excerpt}
              </p>

              <div className="modal-footer-btns" style={{ marginTop: '2rem' }}>
                <button 
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    navigateTo('news');
                  }} 
                  className="btn-primary"
                >
                  <Newspaper size={16} />
                  <span>View All News & Announcements</span>
                </button>
                <button 
                  onClick={() => setSelectedAnnouncement(null)} 
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} className="text-green" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
