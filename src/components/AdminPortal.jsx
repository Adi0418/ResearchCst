import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  X, 
  Plus, 
  Trash2, 
  BookOpen, 
  Users, 
  Newspaper, 
  RotateCcw, 
  Check, 
  Download, 
  AlertCircle,
  Sparkles,
  LogOut,
  Layers,
  Settings,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function AdminPortal({ 
  isOpen, 
  onClose, 
  isAdmin, 
  setIsAdmin, 
  data, 
  onAddPublication, 
  onDeletePublication, 
  onAddMember, 
  onDeleteMember, 
  onAddNews, 
  onDeleteNews,
  onResetData, 
  onNotify 
}) {
  // Main admin tabs: 'publications' | 'members' | 'news' | 'deleteHub' | 'settings'
  const [activeTab, setActiveTab] = useState('publications');

  // Sub-view mode per category: 'split' | 'add' | 'delete'
  const [pubMode, setPubMode] = useState('split');
  const [memberMode, setMemberMode] = useState('split');
  const [newsMode, setNewsMode] = useState('split');

  // Search queries for deletion lists
  const [pubSearch, setPubSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [newsSearch, setNewsSearch] = useState('');

  // Delete Hub filter
  const [hubCategory, setHubCategory] = useState('all'); // 'all' | 'publications' | 'members' | 'news'
  const [hubSearch, setHubSearch] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Publication Form state
  const [newPub, setNewPub] = useState({
    title: '',
    authors: '',
    journal: '',
    year: 2026,
    category: 'conference',
    volume: '',
    doi: '',
    pdfUrl: 'https://arxiv.org/',
    award: '',
    bibtex: ''
  });

  // Member Form state
  const [newMember, setNewMember] = useState({
    name: '',
    nativeName: '',
    role: 'Ph.D. Scholar',
    category: 'phd',
    title: 'Research Scholar (D1)',
    degrees: 'B.Tech / M.Tech',
    room: 'CST Room 104',
    email: '',
    topic: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    scholarUrl: 'https://scholar.google.com/',
    bio: 'Conducting research at the Centre for Sustainable Technologies (CST), IISc Bangalore.'
  });

  // News Form state
  const [newNews, setNewNews] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Publication',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80'
  });

  if (!isOpen) return null;

  // Confirm delete publication
  const confirmDeletePub = (pub) => {
    if (window.confirm(`Are you sure you want to permanently delete this publication?\n\n"${pub.title}"\n(${pub.year} - ${pub.journal})`)) {
      onDeletePublication(pub.id);
      onNotify(`Publication deleted: "${pub.title.substring(0, 30)}..."`);
    }
  };

  // Confirm delete member
  const confirmDeleteMember = (member) => {
    if (window.confirm(`Are you sure you want to permanently remove "${member.name}" (${member.role}) from the department directory?`)) {
      onDeleteMember(member.id);
      onNotify(`Member removed: ${member.name}`);
    }
  };

  // Confirm delete news
  const confirmDeleteNews = (item) => {
    if (window.confirm(`Are you sure you want to permanently delete this announcement?\n\n"${item.title}"`)) {
      onDeleteNews(item.id);
      onNotify(`Announcement deleted: "${item.title.substring(0, 30)}..."`);
    }
  };

  // Filtered publications
  const filteredPubs = data.publications.filter(p => {
    const q = pubSearch.toLowerCase();
    return p.title.toLowerCase().includes(q) || 
      p.journal.toLowerCase().includes(q) || 
      (Array.isArray(p.authors) ? p.authors.join(' ') : String(p.authors)).toLowerCase().includes(q) ||
      String(p.year).includes(q);
  });

  // Filtered members
  const filteredMembers = data.members.filter(m => {
    const q = memberSearch.toLowerCase();
    return m.name.toLowerCase().includes(q) || 
      m.role.toLowerCase().includes(q) || 
      m.email.toLowerCase().includes(q) ||
      (m.topic && m.topic.toLowerCase().includes(q));
  });

  // Filtered news
  const filteredNews = data.news.filter(n => {
    const q = newsSearch.toLowerCase();
    return n.title.toLowerCase().includes(q) || 
      n.category.toLowerCase().includes(q) || 
      (n.excerpt && n.excerpt.toLowerCase().includes(q));
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'admin@iisc.ac.in' && loginPassword === 'cst2026') {
      setIsAdmin(true);
      setLoginError('');
      onNotify('Logged in as IISc CST Administrator!');
    } else {
      setLoginError('Invalid credentials. Use demo: admin@iisc.ac.in / cst2026 or click Demo Login.');
    }
  };

  const handleDemoLogin = () => {
    setLoginEmail('admin@iisc.ac.in');
    setLoginPassword('cst2026');
    setIsAdmin(true);
    setLoginError('');
    onNotify('Logged in as IISc CST Administrator!');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    onNotify('Logged out from admin console.');
  };

  // Submit New Publication
  const handleCreatePublication = (e) => {
    e.preventDefault();
    if (!newPub.title || !newPub.authors || !newPub.journal) {
      onNotify('Please fill in title, authors, and venue.');
      return;
    }

    const authorsArr = newPub.authors.split(',').map(s => s.trim()).filter(Boolean);
    const pubObj = {
      id: `pub-custom-${Date.now()}`,
      year: parseInt(newPub.year),
      category: newPub.category,
      title: newPub.title,
      authors: authorsArr,
      journal: newPub.journal,
      volume: newPub.volume,
      doi: newPub.doi,
      pdfUrl: newPub.pdfUrl,
      award: newPub.award,
      bibtex: newPub.bibtex || `@inproceedings{cst${newPub.year},\n  title={${newPub.title}},\n  author={${authorsArr.join(' and ')}},\n  booktitle={${newPub.journal}},\n  year={${newPub.year}}\n}`
    };

    onAddPublication(pubObj);
    onNotify('New publication added successfully!');
    setNewPub({
      title: '',
      authors: '',
      journal: '',
      year: 2026,
      category: 'conference',
      volume: '',
      doi: '',
      pdfUrl: 'https://arxiv.org/',
      award: '',
      bibtex: ''
    });
  };

  // Submit New Member
  const handleCreateMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.topic) {
      onNotify('Please fill in name, email, and research topic.');
      return;
    }

    const memberObj = {
      id: `member-${Date.now()}`,
      ...newMember
    };

    onAddMember(memberObj);
    onNotify(`${newMember.name} added to CST Directory!`);
    setNewMember({
      name: '',
      nativeName: '',
      role: 'Ph.D. Scholar',
      category: 'phd',
      title: 'Research Scholar (D1)',
      degrees: 'B.Tech / M.Tech',
      room: 'CST Room 104',
      email: '',
      topic: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      scholarUrl: 'https://scholar.google.com/',
      bio: 'Conducting research at the Centre for Sustainable Technologies (CST), IISc Bangalore.'
    });
  };

  // Submit New News
  const handleCreateNews = (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.excerpt) {
      onNotify('Please fill in announcement title and excerpt.');
      return;
    }

    const newsObj = {
      id: `news-${Date.now()}`,
      ...newNews
    };

    onAddNews(newsObj);
    onNotify('Announcement posted live on site!');
    setNewNews({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Publication',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80'
    });
  };

  // Export JSON
  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iisc-cst-lab-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Exported lab-data.json!');
  };

  // Calculate total entries
  const totalEntries = data.publications.length + data.members.length + data.news.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card admin-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-wrap">
            <div className="admin-crest">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3>IISc CST &bull; Department Administration Console</h3>
              <p>Add new entries or delete existing publications, scholars, and announcements</p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Admin Portal">
            <X size={20} />
          </button>
        </div>

        {/* If NOT logged in: Show Login Screen */}
        {!isAdmin ? (
          <div className="admin-login-screen">
            <div className="login-box glass-card">
              <div className="login-icon-circle">
                <Lock size={32} />
              </div>
              <h3>Administrator Sign In</h3>
              <p>Enter institutional credentials or click 1-Click Demo login below.</p>

              {loginError && (
                <div className="admin-error-box">
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="form-group">
                  <label>Institutional Email</label>
                  <div className="input-with-icon">
                    <Mail size={16} />
                    <input 
                      type="email" 
                      placeholder="admin@iisc.ac.in" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-with-icon">
                    <Key size={16} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary full-width">
                  <ShieldCheck size={16} />
                  <span>Sign In as Admin</span>
                </button>
              </form>

              <div className="demo-login-divider">
                <span>OR</span>
              </div>

              <button onClick={handleDemoLogin} className="btn-gold full-width">
                <Sparkles size={16} />
                <span>⚡ 1-Click Demo Login as Lab Admin</span>
              </button>

              <div className="demo-credentials-hint">
                <span>Default Demo Credentials: <code>admin@iisc.ac.in</code> / <code>cst2026</code></span>
              </div>
            </div>
          </div>
        ) : (
          /* If LOGGED IN: Show Live CMS Dashboard */
          <div className="admin-dashboard-screen">
            {/* Top Status Bar */}
            <div className="admin-status-bar">
              <div className="status-badge-wrap">
                <span className="live-indicator-dot"></span>
                <span className="status-admin-email">Connected as: <strong>admin@iisc.ac.in</strong> (CST Department Admin)</span>
              </div>

              <div className="admin-top-actions">
                <button onClick={handleExportData} className="admin-action-btn">
                  <Download size={14} />
                  <span>Export JSON</span>
                </button>
                <button onClick={handleLogout} className="admin-action-btn logout-btn">
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Admin Main Tabs Nav */}
            <div className="admin-tabs-nav">
              <button 
                onClick={() => setActiveTab('publications')}
                className={`admin-tab-btn ${activeTab === 'publications' ? 'active' : ''}`}
              >
                <BookOpen size={16} />
                <span>Publications ({data.publications.length})</span>
              </button>

              <button 
                onClick={() => setActiveTab('members')}
                className={`admin-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
              >
                <Users size={16} />
                <span>Members ({data.members.length})</span>
              </button>

              <button 
                onClick={() => setActiveTab('news')}
                className={`admin-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
              >
                <Newspaper size={16} />
                <span>News & Events ({data.news.length})</span>
              </button>

              <button 
                onClick={() => setActiveTab('deleteHub')}
                className={`admin-tab-btn admin-tab-delete-btn ${activeTab === 'deleteHub' ? 'active' : ''}`}
                title="Universal Delete Portal: Review and delete any entry"
              >
                <Trash2 size={16} />
                <span>🗑️ Delete Entries Hub ({totalEntries})</span>
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              >
                <Settings size={16} />
                <span>Settings & Reset</span>
              </button>
            </div>

            {/* TAB 1: PUBLICATIONS MANAGEMENT */}
            {activeTab === 'publications' && (
              <div className="admin-tab-content">
                {/* Subnav to toggle Add vs Delete vs Split */}
                <div className="admin-section-subnav">
                  <div className="admin-section-info">
                    <h4>Publications Directory</h4>
                    <p>Add new research papers or permanently remove existing entries</p>
                  </div>
                  <div className="subnav-pill-group">
                    <button 
                      onClick={() => setPubMode('split')}
                      className={`subnav-pill ${pubMode === 'split' ? 'active' : ''}`}
                    >
                      <Layers size={14} />
                      <span>Side-by-Side</span>
                    </button>
                    <button 
                      onClick={() => setPubMode('add')}
                      className={`subnav-pill ${pubMode === 'add' ? 'active' : ''}`}
                    >
                      <Plus size={14} />
                      <span>Add Paper</span>
                    </button>
                    <button 
                      onClick={() => setPubMode('delete')}
                      className={`subnav-pill danger-pill ${pubMode === 'delete' ? 'active' : ''}`}
                    >
                      <Trash2 size={14} />
                      <span>Delete Papers ({data.publications.length})</span>
                    </button>
                  </div>
                </div>

                <div className={`admin-view-container ${pubMode === 'split' ? 'admin-grid-layout' : 'admin-single-layout'}`}>
                  {/* Left / Add Form */}
                  {(pubMode === 'split' || pubMode === 'add') && (
                    <div className="admin-form-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Add New Publication</h4>
                        <span className="badge badge-terracotta">Entry Form</span>
                      </div>
                      <p className="form-subtext">Add refereed journal, conference proceeding, or patent</p>

                      <form onSubmit={handleCreatePublication} className="admin-form">
                        <div className="form-group">
                          <label>Paper Title *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Heterogeneous Catalytic Conversion of Biomass to Furandicarboxylic Acid"
                            value={newPub.title}
                            onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Authors * (comma separated)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Dev Ahirwar, Arundhati Sundaram, S. Dasappa*"
                            value={newPub.authors}
                            onChange={(e) => setNewPub({ ...newPub, authors: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Venue / Journal / Conf *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. ChemSusChem / Applied Energy / ACS Catalysis"
                              value={newPub.journal}
                              onChange={(e) => setNewPub({ ...newPub, journal: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Publication Year *</label>
                            <select 
                              value={newPub.year}
                              onChange={(e) => setNewPub({ ...newPub, year: e.target.value })}
                            >
                              <option value={2026}>2026</option>
                              <option value={2025}>2025</option>
                              <option value={2024}>2024</option>
                              <option value={2023}>2023</option>
                              <option value={2022}>2022</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Category</label>
                            <select 
                              value={newPub.category}
                              onChange={(e) => setNewPub({ ...newPub, category: e.target.value })}
                            >
                              <option value="journal">Refereed Journal</option>
                              <option value="conference">Conference Proceeding</option>
                              <option value="patent">Patent</option>
                              <option value="keynote">Plenary Keynote</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Volume / Pages (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Vol. 19, pp. 4410-4425"
                              value={newPub.volume}
                              onChange={(e) => setNewPub({ ...newPub, volume: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>DOI (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. 10.1002/cssc.202600184"
                              value={newPub.doi}
                              onChange={(e) => setNewPub({ ...newPub, doi: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label>Award / Honor (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. VIP Featured Article"
                              value={newPub.award}
                              onChange={(e) => setNewPub({ ...newPub, award: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>BibTeX Citation (Optional — Auto-generated if left blank)</label>
                          <textarea 
                            rows={3}
                            placeholder="@article{cst2026,...}"
                            value={newPub.bibtex}
                            onChange={(e) => setNewPub({ ...newPub, bibtex: e.target.value })}
                          ></textarea>
                        </div>

                        <button type="submit" className="btn-primary full-width">
                          <Plus size={16} />
                          <span>Publish to Website</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Right / Delete Manager List */}
                  {(pubMode === 'split' || pubMode === 'delete') && (
                    <div className="admin-list-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Delete & Manage Publications ({data.publications.length})</h4>
                        <span className="badge badge-danger">Deletion Action</span>
                      </div>
                      <p className="form-subtext">Click the red <strong>Delete</strong> button next to any paper to remove it immediately.</p>

                      {/* Search Bar for Quick Deletion */}
                      <div className="admin-search-wrap">
                        <Search size={15} />
                        <input 
                          type="text"
                          placeholder="Search paper by title, author, venue, or year..."
                          value={pubSearch}
                          onChange={(e) => setPubSearch(e.target.value)}
                        />
                        {pubSearch && (
                          <button className="clear-search-btn" onClick={() => setPubSearch('')}>
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      <div className="admin-items-scroll">
                        {filteredPubs.length === 0 ? (
                          <div className="admin-empty-state">
                            <p>No publications match your search filter.</p>
                          </div>
                        ) : (
                          filteredPubs.map((pub) => (
                            <div key={pub.id} className="admin-item-row">
                              <div className="admin-item-info">
                                <div className="admin-item-meta">
                                  <span className="badge badge-cyan">{pub.category}</span>
                                  <span className="admin-item-year">{pub.year}</span>
                                </div>
                                <h5 className="admin-item-title" title={pub.title}>{pub.title}</h5>
                                <span className="admin-item-sub">
                                  {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors} &bull; {pub.journal}
                                </span>
                              </div>

                              <button 
                                onClick={() => confirmDeletePub(pub)}
                                className="btn-admin-danger"
                                title={`Delete "${pub.title}"`}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MEMBERS MANAGEMENT */}
            {activeTab === 'members' && (
              <div className="admin-tab-content">
                {/* Subnav to toggle Add vs Delete vs Split */}
                <div className="admin-section-subnav">
                  <div className="admin-section-info">
                    <h4>Department Members Directory</h4>
                    <p>Add new faculty, scholars, and postdocs or delete existing profiles</p>
                  </div>
                  <div className="subnav-pill-group">
                    <button 
                      onClick={() => setMemberMode('split')}
                      className={`subnav-pill ${memberMode === 'split' ? 'active' : ''}`}
                    >
                      <Layers size={14} />
                      <span>Side-by-Side</span>
                    </button>
                    <button 
                      onClick={() => setMemberMode('add')}
                      className={`subnav-pill ${memberMode === 'add' ? 'active' : ''}`}
                    >
                      <Plus size={14} />
                      <span>Add Member</span>
                    </button>
                    <button 
                      onClick={() => setMemberMode('delete')}
                      className={`subnav-pill danger-pill ${memberMode === 'delete' ? 'active' : ''}`}
                    >
                      <Trash2 size={14} />
                      <span>Delete Members ({data.members.length})</span>
                    </button>
                  </div>
                </div>

                <div className={`admin-view-container ${memberMode === 'split' ? 'admin-grid-layout' : 'admin-single-layout'}`}>
                  {/* Left / Add Member Form */}
                  {(memberMode === 'split' || memberMode === 'add') && (
                    <div className="admin-form-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Add New Lab Member</h4>
                        <span className="badge badge-terracotta">Entry Form</span>
                      </div>
                      <p className="form-subtext">Add research scholar, postdoc, PI, or technical staff</p>

                      <form onSubmit={handleCreateMember} className="admin-form">
                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Full Name *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Priya Venkataraman"
                              value={newMember.name}
                              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Native Script Name (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. ಪ್ರಿಯಾ ವೆಂಕಟರಾಮನ್"
                              value={newMember.nativeName}
                              onChange={(e) => setNewMember({ ...newMember, nativeName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Role Category *</label>
                            <select 
                              value={newMember.category}
                              onChange={(e) => {
                                const cat = e.target.value;
                                let roleTitle = 'Ph.D. Scholar';
                                if (cat === 'faculty') roleTitle = 'Associate Professor';
                                if (cat === 'postdoc') roleTitle = 'Postdoctoral Fellow';
                                if (cat === 'masters') roleTitle = 'M.Tech (Research) Scholar';
                                if (cat === 'alumni') roleTitle = 'Distinguished Alumni';
                                setNewMember({ ...newMember, category: cat, role: roleTitle });
                              }}
                            >
                              <option value="phd">Ph.D. Scholar</option>
                              <option value="postdoc">Postdoctoral Fellow</option>
                              <option value="faculty">Faculty & PI</option>
                              <option value="masters">M.Tech (Research)</option>
                              <option value="alumni">Alumni</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Degrees / Background</label>
                            <input 
                              type="text" 
                              placeholder="e.g. B.Tech (Chemical Engg.)"
                              value={newMember.degrees}
                              onChange={(e) => setNewMember({ ...newMember, degrees: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Institutional Email *</label>
                            <input 
                              type="email" 
                              placeholder="priyav@iisc.ac.in" 
                              value={newMember.email}
                              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Room / Lab Space</label>
                            <input 
                              type="text" 
                              placeholder="CST Room 104" 
                              value={newMember.room}
                              onChange={(e) => setNewMember({ ...newMember, room: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Research Topic / Focus *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Heterogeneous Catalysis & Green Hydrogen Gasification"
                            value={newMember.topic}
                            onChange={(e) => setNewMember({ ...newMember, topic: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Avatar Photo URL</label>
                          <input 
                            type="url" 
                            placeholder="https://images.unsplash.com/..."
                            value={newMember.avatar}
                            onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
                          />
                        </div>

                        <button type="submit" className="btn-primary full-width">
                          <Plus size={16} />
                          <span>Add to CST Directory</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Right / Delete Member List */}
                  {(memberMode === 'split' || memberMode === 'delete') && (
                    <div className="admin-list-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Delete & Manage Members ({data.members.length})</h4>
                        <span className="badge badge-danger">Deletion Action</span>
                      </div>
                      <p className="form-subtext">Click the red <strong>Delete</strong> button to remove any member from the website.</p>

                      {/* Search Bar for Members */}
                      <div className="admin-search-wrap">
                        <Search size={15} />
                        <input 
                          type="text"
                          placeholder="Search member by name, role, or topic..."
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                        />
                        {memberSearch && (
                          <button className="clear-search-btn" onClick={() => setMemberSearch('')}>
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      <div className="admin-items-scroll">
                        {filteredMembers.length === 0 ? (
                          <div className="admin-empty-state">
                            <p>No lab members match your search query.</p>
                          </div>
                        ) : (
                          filteredMembers.map((member) => (
                            <div key={member.id} className="admin-item-row">
                              <img src={member.avatar} alt={member.name} className="admin-member-thumb" />
                              <div className="admin-item-info">
                                <h5 className="admin-item-title">{member.name}</h5>
                                <div className="admin-item-meta">
                                  <span className="badge badge-purple">{member.role}</span>
                                  <span className="admin-item-sub">{member.email}</span>
                                </div>
                              </div>

                              <button 
                                onClick={() => confirmDeleteMember(member)}
                                className="btn-admin-danger"
                                title={`Remove ${member.name}`}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: NEWS & ANNOUNCEMENTS MANAGEMENT */}
            {activeTab === 'news' && (
              <div className="admin-tab-content">
                {/* Subnav to toggle Add vs Delete vs Split */}
                <div className="admin-section-subnav">
                  <div className="admin-section-info">
                    <h4>Department Announcements & Events</h4>
                    <p>Post department news or delete past notices</p>
                  </div>
                  <div className="subnav-pill-group">
                    <button 
                      onClick={() => setNewsMode('split')}
                      className={`subnav-pill ${newsMode === 'split' ? 'active' : ''}`}
                    >
                      <Layers size={14} />
                      <span>Side-by-Side</span>
                    </button>
                    <button 
                      onClick={() => setNewsMode('add')}
                      className={`subnav-pill ${newsMode === 'add' ? 'active' : ''}`}
                    >
                      <Plus size={14} />
                      <span>Post News</span>
                    </button>
                    <button 
                      onClick={() => setNewsMode('delete')}
                      className={`subnav-pill danger-pill ${newsMode === 'delete' ? 'active' : ''}`}
                    >
                      <Trash2 size={14} />
                      <span>Delete News ({data.news.length})</span>
                    </button>
                  </div>
                </div>

                <div className={`admin-view-container ${newsMode === 'split' ? 'admin-grid-layout' : 'admin-single-layout'}`}>
                  {/* Left / Post News Form */}
                  {(newsMode === 'split' || newsMode === 'add') && (
                    <div className="admin-form-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Post New Announcement</h4>
                        <span className="badge badge-terracotta">Entry Form</span>
                      </div>
                      <p className="form-subtext">Share research milestones, awards, grants, or symposium notices</p>

                      <form onSubmit={handleCreateNews} className="admin-form">
                        <div className="form-group">
                          <label>Announcement Headline *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. CST Commissions Advanced Oxy-Steam Gasification Pilot Unit"
                            value={newNews.title}
                            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Category</label>
                            <select 
                              value={newNews.category}
                              onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                            >
                              <option value="Publication">Publication</option>
                              <option value="Award">Award & Fellowship</option>
                              <option value="Grant">R&D Grant</option>
                              <option value="Facility">Facility & Pilot Plant</option>
                              <option value="Symposium">Conference / Symposium</option>
                              <option value="Farewell">Thesis Defense / Farewell</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Date</label>
                            <input 
                              type="date" 
                              value={newNews.date}
                              onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Summary / Excerpt *</label>
                          <textarea 
                            rows={3}
                            placeholder="Brief summary displayed on the card..."
                            value={newNews.excerpt}
                            onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="btn-primary full-width">
                          <Plus size={16} />
                          <span>Publish Live Announcement</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Right / Delete News List */}
                  {(newsMode === 'split' || newsMode === 'delete') && (
                    <div className="admin-list-col glass-card">
                      <div className="admin-panel-header">
                        <h4>Delete & Manage News ({data.news.length})</h4>
                        <span className="badge badge-danger">Deletion Action</span>
                      </div>
                      <p className="form-subtext">Click the red <strong>Delete</strong> button to permanently remove an announcement.</p>

                      {/* Search Bar for News */}
                      <div className="admin-search-wrap">
                        <Search size={15} />
                        <input 
                          type="text"
                          placeholder="Search announcement by headline or category..."
                          value={newsSearch}
                          onChange={(e) => setNewsSearch(e.target.value)}
                        />
                        {newsSearch && (
                          <button className="clear-search-btn" onClick={() => setNewsSearch('')}>
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      <div className="admin-items-scroll">
                        {filteredNews.length === 0 ? (
                          <div className="admin-empty-state">
                            <p>No news items match your search.</p>
                          </div>
                        ) : (
                          filteredNews.map((item) => (
                            <div key={item.id} className="admin-item-row">
                              <div className="admin-item-info">
                                <span className="badge badge-gold">{item.category} &bull; {item.date}</span>
                                <h5 className="admin-item-title">{item.title}</h5>
                                <span className="admin-item-sub">{item.excerpt?.substring(0, 75)}...</span>
                              </div>

                              <button 
                                onClick={() => confirmDeleteNews(item)}
                                className="btn-admin-danger"
                                title={`Delete "${item.title}"`}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: UNIVERSAL DELETE ENTRIES HUB */}
            {activeTab === 'deleteHub' && (
              <div className="admin-tab-content">
                <div className="delete-hub-panel glass-card">
                  <div className="delete-hub-header">
                    <div className="delete-hub-icon-wrap">
                      <Trash2 size={26} />
                    </div>
                    <div>
                      <h4>Universal Entry Deletion Manager</h4>
                      <p>Browse and delete any publication, lab member, or announcement from one unified screen</p>
                    </div>
                  </div>

                  {/* Filter bar by category & live search */}
                  <div className="delete-hub-controls">
                    <div className="hub-category-pills">
                      <button 
                        onClick={() => setHubCategory('all')} 
                        className={`hub-pill ${hubCategory === 'all' ? 'active' : ''}`}
                      >
                        All Entries ({totalEntries})
                      </button>
                      <button 
                        onClick={() => setHubCategory('publications')} 
                        className={`hub-pill ${hubCategory === 'publications' ? 'active' : ''}`}
                      >
                        Publications ({data.publications.length})
                      </button>
                      <button 
                        onClick={() => setHubCategory('members')} 
                        className={`hub-pill ${hubCategory === 'members' ? 'active' : ''}`}
                      >
                        Members ({data.members.length})
                      </button>
                      <button 
                        onClick={() => setHubCategory('news')} 
                        className={`hub-pill ${hubCategory === 'news' ? 'active' : ''}`}
                      >
                        News ({data.news.length})
                      </button>
                    </div>

                    <div className="admin-search-wrap hub-search">
                      <Search size={16} />
                      <input 
                        type="text" 
                        placeholder="Search any title, name, or keyword across all entries to delete..."
                        value={hubSearch}
                        onChange={(e) => setHubSearch(e.target.value)}
                      />
                      {hubSearch && (
                        <button className="clear-search-btn" onClick={() => setHubSearch('')}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Unified Delete Table / Card Grid */}
                  <div className="delete-hub-list">
                    {/* Publications in Hub */}
                    {(hubCategory === 'all' || hubCategory === 'publications') && (
                      <div className="hub-section-block">
                        <div className="hub-section-header">
                          <BookOpen size={16} />
                          <h5>Publications ({filteredPubs.length})</h5>
                        </div>
                        <div className="hub-cards-grid">
                          {filteredPubs.map(pub => (
                            <div key={pub.id} className="hub-entry-card">
                              <div className="hub-card-body">
                                <div className="hub-card-meta">
                                  <span className="badge badge-cyan">{pub.category}</span>
                                  <span className="hub-year">{pub.year}</span>
                                </div>
                                <h6 className="hub-title">{pub.title}</h6>
                                <p className="hub-sub">{Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}</p>
                                <p className="hub-venue">{pub.journal}</p>
                              </div>
                              <div className="hub-card-footer">
                                <button 
                                  onClick={() => confirmDeletePub(pub)}
                                  className="btn-danger-prominent"
                                >
                                  <Trash2 size={15} />
                                  <span>Delete Publication</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Members in Hub */}
                    {(hubCategory === 'all' || hubCategory === 'members') && (
                      <div className="hub-section-block">
                        <div className="hub-section-header">
                          <Users size={16} />
                          <h5>Lab Team Members ({filteredMembers.length})</h5>
                        </div>
                        <div className="hub-cards-grid">
                          {filteredMembers.map(member => (
                            <div key={member.id} className="hub-entry-card member-hub-card">
                              <div className="hub-card-body">
                                <div className="hub-member-header">
                                  <img src={member.avatar} alt={member.name} className="hub-member-avatar" />
                                  <div>
                                    <h6 className="hub-title">{member.name}</h6>
                                    <span className="badge badge-purple">{member.role}</span>
                                  </div>
                                </div>
                                <p className="hub-sub">{member.email}</p>
                                <p className="hub-topic"><strong>Focus:</strong> {member.topic}</p>
                              </div>
                              <div className="hub-card-footer">
                                <button 
                                  onClick={() => confirmDeleteMember(member)}
                                  className="btn-danger-prominent"
                                >
                                  <Trash2 size={15} />
                                  <span>Delete Member</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* News in Hub */}
                    {(hubCategory === 'all' || hubCategory === 'news') && (
                      <div className="hub-section-block">
                        <div className="hub-section-header">
                          <Newspaper size={16} />
                          <h5>News & Announcements ({filteredNews.length})</h5>
                        </div>
                        <div className="hub-cards-grid">
                          {filteredNews.map(item => (
                            <div key={item.id} className="hub-entry-card">
                              <div className="hub-card-body">
                                <div className="hub-card-meta">
                                  <span className="badge badge-gold">{item.category}</span>
                                  <span className="hub-year">{item.date}</span>
                                </div>
                                <h6 className="hub-title">{item.title}</h6>
                                <p className="hub-sub">{item.excerpt}</p>
                              </div>
                              <div className="hub-card-footer">
                                <button 
                                  onClick={() => confirmDeleteNews(item)}
                                  className="btn-danger-prominent"
                                >
                                  <Trash2 size={15} />
                                  <span>Delete Announcement</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS & RESET */}
            {activeTab === 'settings' && (
              <div className="admin-tab-content">
                <div className="settings-panel glass-card">
                  <div className="settings-header">
                    <RotateCcw size={28} className="settings-icon" />
                    <div>
                      <h4>Reset CST Lab Data to Defaults</h4>
                      <p>
                        Restore the original IISc Bangalore CST Lab dummy dataset (resets any custom 
                        papers, members, or news back to the clean default departmental state).
                      </p>
                    </div>
                  </div>

                  <div className="settings-body">
                    <button 
                      onClick={() => {
                        if (window.confirm('Reset all publications, members, and news back to initial IISc CST defaults?')) {
                          onResetData();
                          onNotify('Database reset to clean IISc CST defaults!');
                        }
                      }}
                      className="btn-danger"
                    >
                      <RotateCcw size={16} />
                      <span>Reset All Data to IISc Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
