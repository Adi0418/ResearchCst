import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Award, 
  Copy, 
  Check, 
  ExternalLink, 
  FileDown, 
  Calendar,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

export default function PublicationsSection({ publications, onNotify }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [bibtexModalPub, setBibtexModalPub] = useState(null);

  // Available categories
  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'journal', label: 'Refereed Journals' },
    { id: 'conference', label: 'Conferences (OSDI/NeurIPS/ASPLOS)' },
    { id: 'patent', label: 'Patents' },
    { id: 'keynote', label: 'Invited Keynotes' },
  ];

  // Distinct available years sorted descending
  const years = useMemo(() => {
    const set = new Set(publications.map(p => p.year));
    return ['all', ...Array.from(set).sort((a, b) => b - a)];
  }, [publications]);

  // Filtered publications
  const filteredPubs = useMemo(() => {
    return publications.filter(pub => {
      // Category match
      if (selectedCategory !== 'all' && pub.category !== selectedCategory) {
        return false;
      }
      // Year match
      if (selectedYear !== 'all' && pub.year !== parseInt(selectedYear)) {
        return false;
      }
      // Search query match (title, authors, journal, doi)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = pub.title?.toLowerCase().includes(q);
        const inAuthors = pub.authors?.some(a => a.toLowerCase().includes(q));
        const inJournal = pub.journal?.toLowerCase().includes(q);
        const inDoi = pub.doi?.toLowerCase().includes(q);
        if (!inTitle && !inAuthors && !inJournal && !inDoi) {
          return false;
        }
      }
      return true;
    });
  }, [publications, selectedCategory, selectedYear, searchQuery]);

  // Copy BibTeX handler
  const handleCopyBibtex = (pub) => {
    if (pub.bibtex) {
      navigator.clipboard.writeText(pub.bibtex);
      setCopiedId(pub.id);
      if (onNotify) onNotify('BibTeX citation copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Copy APA Citation
  const handleCopyAPA = (pub) => {
    const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;
    const apa = `${authorsStr} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ''}. DOI: ${pub.doi || 'N/A'}`;
    navigator.clipboard.writeText(apa);
    setCopiedId(`apa-${pub.id}`);
    if (onNotify) onNotify('APA citation copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'journal': return 'badge-cyan';
      case 'conference': return 'badge-purple';
      case 'patent': return 'badge-gold';
      case 'keynote': return 'badge-green';
      default: return 'badge-muted';
    }
  };

  return (
    <section id="publications" className="section-padding publications-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Scientific Output</span>
          <h2>Peer-Reviewed Publications & Patents</h2>
          <p>
            Explore our archival journal articles, flagship systems conference proceedings, 
            and intellectual property disclosures produced by IISc CST researchers.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="pub-toolbar glass-card">
          <div className="pub-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search by author (e.g. Shenoy, Ahirwar), keyword, paper title, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pub-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                &times;
              </button>
            )}
          </div>

          <div className="pub-filters-row">
            {/* Category Filter Pills */}
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="year-selector">
              <Calendar size={15} />
              <span>Year:</span>
              <div className="year-pills">
                {years.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr.toString())}
                    className={`year-btn ${selectedYear === yr.toString() ? 'active' : ''}`}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="pub-results-meta">
          <span>
            Showing <strong>{filteredPubs.length}</strong> of {publications.length} works
          </span>
          {(selectedCategory !== 'all' || selectedYear !== 'all' || searchQuery) && (
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedYear('all'); setSearchQuery(''); }}
              className="reset-filters-link"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Publications List */}
        <div className="pub-list">
          {filteredPubs.length === 0 ? (
            <div className="no-results-box glass-card">
              <BookOpen size={40} className="no-results-icon" />
              <h3>No publications matched your search criteria</h3>
              <p>Try modifying your search query or reset the category and year filters.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedYear('all'); setSearchQuery(''); }}
                className="btn-secondary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredPubs.map((pub) => {
              const authors = Array.isArray(pub.authors) ? pub.authors : [pub.authors];
              return (
                <div key={pub.id} className="pub-card glass-card">
                  <div className="pub-card-header">
                    <div className="pub-meta-left">
                      <span className={`badge ${getCategoryBadgeClass(pub.category)}`}>
                        {pub.category}
                      </span>
                      <span className="pub-year-badge">
                        {pub.year}
                      </span>
                    </div>

                    {pub.award && (
                      <span className="badge badge-gold pub-award-badge">
                        <Award size={13} />
                        {pub.award}
                      </span>
                    )}
                  </div>

                  <h3 className="pub-title">{pub.title}</h3>

                  <div className="pub-authors">
                    {authors.map((author, aIdx) => {
                      const isLabMember = author.includes('Shenoy') || author.includes('Ahirwar') || author.includes('Sundaram') || author.includes('Deshmukh') || author.includes('Kulkarni');
                      return (
                        <span key={aIdx} className={isLabMember ? 'author-highlight' : 'author-regular'}>
                          {author}{aIdx < authors.length - 1 ? ', ' : ''}
                        </span>
                      );
                    })}
                  </div>

                  <div className="pub-venue">
                    <span className="venue-name">{pub.journal}</span>
                    {pub.volume && <span className="venue-vol"> &bull; {pub.volume}</span>}
                  </div>

                  {/* Actions / Links */}
                  <div className="pub-actions">
                    {pub.doi && (
                      <a 
                        href={`https://doi.org/${pub.doi.replace('10.ipo.gov.in', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pub-btn pub-btn-doi"
                      >
                        <ExternalLink size={14} />
                        <span>DOI: {pub.doi}</span>
                      </a>
                    )}

                    {pub.pdfUrl && pub.pdfUrl !== '#' && (
                      <a 
                        href={pub.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pub-btn pub-btn-pdf"
                      >
                        <FileDown size={14} />
                        <span>Paper PDF</span>
                      </a>
                    )}

                    {pub.bibtex && (
                      <button 
                        onClick={() => handleCopyBibtex(pub)} 
                        className="pub-btn pub-btn-cite"
                        title="Copy BibTeX citation to clipboard"
                      >
                        {copiedId === pub.id ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                        <span>{copiedId === pub.id ? 'Copied BibTeX!' : 'BibTeX'}</span>
                      </button>
                    )}

                    <button 
                      onClick={() => handleCopyAPA(pub)} 
                      className="pub-btn pub-btn-apa"
                      title="Copy APA citation format"
                    >
                      {copiedId === `apa-${pub.id}` ? <Check size={14} className="text-green" /> : <Layers size={14} />}
                      <span>{copiedId === `apa-${pub.id}` ? 'Copied APA!' : 'Cite (APA)'}</span>
                    </button>

                    {pub.bibtex && (
                      <button 
                        onClick={() => setBibtexModalPub(pub)} 
                        className="pub-btn pub-btn-view"
                        title="View Raw BibTeX Entry"
                      >
                        <Code size={14} />
                        <span>View BibTeX</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* BibTeX Viewer Modal */}
      {bibtexModalPub && (
        <div className="modal-overlay" onClick={() => setBibtexModalPub(null)}>
          <div className="modal-content glass-card bibtex-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge badge-cyan">BibTeX Citation</span>
              <h3>{bibtexModalPub.title}</h3>
            </div>
            <pre className="bibtex-code-block">
              <code>{bibtexModalPub.bibtex}</code>
            </pre>
            <div className="modal-footer">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(bibtexModalPub.bibtex);
                  if (onNotify) onNotify('BibTeX copied to clipboard!');
                }}
                className="btn-primary"
              >
                <Copy size={16} />
                <span>Copy to Clipboard</span>
              </button>
              <button onClick={() => setBibtexModalPub(null)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
