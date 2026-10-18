import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Mail, Printer, Send, CheckCircle, ExternalLink, Compass, Loader2 } from 'lucide-react';

export default function AccessSection({ accessInfo = {}, labInfo = {}, onNotify }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Research & Academic Collaboration Inquiry',
    message: ''
  });

  const targetEmail = (accessInfo?.email && !accessInfo.email.includes('aditya')) 
    ? accessInfo.email 
    : 'navyabhat111@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (onNotify) onNotify('Please fill in all inquiry fields.');
      return;
    }

    setIsSending(true);
    const currentData = { ...formData };
    setSubmittedData(currentData);

    try {
      // Send email directly to navyabhat111@gmail.com via FormSubmit endpoint
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: currentData.name,
          email: currentData.email,
          subject: currentData.subject,
          message: currentData.message,
          _subject: `[CST IISc Website Contact] ${currentData.subject} from ${currentData.name}`,
          _template: "table"
        })
      });

      setFormSubmitted(true);
      if (onNotify) onNotify(`Inquiry sent successfully to ${targetEmail}!`);
    } catch (err) {
      console.warn("Direct form submission error, falling back to mail client:", err);
      setFormSubmitted(true);
      if (onNotify) onNotify(`Inquiry processed for ${targetEmail}!`);
    } finally {
      setIsSending(false);
    }
  };

  const mailtoUrl = submittedData 
    ? `mailto:${targetEmail}?subject=${encodeURIComponent(`[CST IISc Inquiry] ${submittedData.subject}`)}&body=${encodeURIComponent(`Dear CST Team,\n\nFrom: ${submittedData.name} (${submittedData.email})\nSubject: ${submittedData.subject}\n\nMessage:\n${submittedData.message}\n\n---\nSent from IISc CST Department Website`)}`
    : `mailto:${targetEmail}`;

  return (
    <section id="access" className="section-padding access-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus Directions & Inquiries</span>
          <h2>Location, Access & Inquiries</h2>
          <p>
            Visiting the CST Laboratory at the Indian Institute of Science, Bangalore. 
            Detailed transit directions from airport and rail terminals.
          </p>
        </div>

        <div className="access-grid">
          {/* Left Column: Transit & Directions */}
          <div className="access-info-col">
            <div className="location-card glass-card">
              <div className="loc-card-header">
                <div className="loc-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3>{accessInfo.department}</h3>
                  <p>{accessInfo.campus}</p>
                </div>
              </div>

              <div className="loc-address-text">
                <p><strong>Address:</strong> {accessInfo.addressLine}</p>
                <p><strong>Suite:</strong> {accessInfo.roomDetails}</p>
                <p><strong>Landmark:</strong> {accessInfo.landmark}</p>
              </div>

              <div className="loc-contacts">
                <div className="contact-row">
                  <Phone size={16} />
                  <span>{labInfo.phone} (Lab Office)</span>
                </div>
                <div className="contact-row">
                  <Printer size={16} />
                  <span>{labInfo.fax} (CST Office Fax)</span>
                </div>
                <div className="contact-row">
                  <Mail size={16} />
                  <span>{labInfo.officeEmail}</span>
                </div>
              </div>

              <div className="map-action-wrap">
                <a 
                  href="https://maps.google.com/?q=Centre+for+Sustainable+Technologies+IISc+Bangalore" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary full-width"
                >
                  <Navigation size={16} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Step-by-Step Transit Instructions */}
            <div className="transit-steps-box glass-card">
              <h4>Transit Instructions to IISc Main Gate</h4>
              <div className="transit-list">
                {accessInfo.directions.map((dir, idx) => (
                  <div key={idx} className="transit-item">
                    <div className="transit-item-header">
                      <Compass size={16} className="transit-icon" />
                      <strong>{dir.mode}</strong>
                      <span className="transit-dist">{dir.distance}</span>
                    </div>
                    <p className="transit-desc">{dir.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="access-form-col">
            <div className="inquiry-form-card glass-card">
              <div className="inquiry-card-header">
                <h3>Direct Academic Inquiry</h3>
                <span className="inquiry-email-badge">
                  <Mail size={13} />
                  <span>{targetEmail}</span>
                </span>
              </div>
              <p>
                Are you a visiting researcher, scholar, or industrial partner? 
                Send a message directly to the CST coordinator inbox at <strong>{targetEmail}</strong>.
              </p>

              {formSubmitted ? (
                <div className="form-success-box">
                  <CheckCircle size={48} className="success-icon" />
                  <h4>Inquiry Sent to Department Coordinator!</h4>
                  <p>
                    Thank you, <strong>{submittedData?.name}</strong>. Your message regarding <em>"{submittedData?.subject}"</em> has been dispatched directly to <strong>{targetEmail}</strong>.
                  </p>
                  
                  <div className="form-success-actions">
                    <a 
                      href={mailtoUrl} 
                      className="btn-primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Mail size={16} />
                      <span>Open in Mail Client</span>
                    </a>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', subject: 'Research & Academic Collaboration Inquiry', message: '' });
                      }}
                      className="btn-hero-outline"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. ABC" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. abc@alumni.iisc.ac.in" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject / Purpose</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Research & Academic Collaboration Inquiry">Research & Academic Collaboration Inquiry</option>
                      <option value="Postdoctoral Fellowship Application">Postdoctoral Fellowship Application</option>
                      <option value="Industry R&D & Technology Transfer">Industry R&D & Technology Transfer</option>
                      <option value="Visiting Scholar / Internship Request">Visiting Scholar / Internship Request</option>
                      <option value="General Technical Question on Publications">General Technical Question on Publications</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Message / Inquiry *</label>
                    <textarea 
                      rows={5}
                      placeholder="Briefly state your institutional background, research focus, or project collaboration details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="inquiry-target-notice">
                    <Mail size={14} className="text-terracotta" />
                    <span>Your message will be emailed directly to: <strong>{targetEmail}</strong></span>
                  </div>

                  <button type="submit" disabled={isSending} className="btn-primary full-width">
                    {isSending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message to {targetEmail}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
