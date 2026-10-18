import React from 'react';
import { Building, ShieldCheck, Globe, Coins, Award, Sparkles } from 'lucide-react';

export default function PartnersSection() {
  const partners = [
    {
      name: "Ministry of New & Renewable Energy",
      abbr: "MNRE",
      type: "Govt of India Ministry",
      role: "Hydrogen Gasifiers & Biomass Power R&D Grants"
    },
    {
      name: "Department of Science and Technology",
      abbr: "DST",
      type: "Govt of India Department",
      role: "Clean Energy Mission & National Solar Mission"
    },
    {
      name: "Ministry of Environment, Forest & CC",
      abbr: "MoEFCC",
      type: "Govt of India Ministry",
      role: "Ecological Sanitation & Wetland Remediation"
    },
    {
      name: "Tata Trusts",
      abbr: "Tata Trusts",
      type: "Philanthropic Foundation",
      role: "Rural Microgrids & Tea Estate Electrification"
    },
    {
      name: "Indian Oil Corporation Limited",
      abbr: "IOCL R&D",
      type: "Navratna PSU Partner",
      role: "Supercritical Water Gasification & Bio-Hydrogen"
    },
    {
      name: "GAIL (India) Limited",
      abbr: "GAIL R&D",
      type: "Maharatna Energy PSU",
      role: "Agro-Residue Gasification & Syngas Methanation"
    },
    {
      name: "Cummins India Limited",
      abbr: "Cummins",
      type: "Global Industrial Partner",
      role: "100% Producer Gas Engine Technology Transfer"
    },
    {
      name: "United Nations Development Programme",
      abbr: "UNDP / GEF",
      type: "International Agency",
      role: "Hosahalli Integrated Rural Energy Utility"
    },
    {
      name: "Council of Scientific & Industrial Research",
      abbr: "CSIR",
      type: "Premier Research Body",
      role: "Drop-in Sustainable Aviation Fuel (SAF) Synthesis"
    },
    {
      name: "Bureau of Indian Standards",
      abbr: "BIS",
      type: "National Standards Body",
      role: "IS 1725 Codification of Stabilized Earth Masonry"
    },
    {
      name: "World Health Organization",
      abbr: "WHO SEARO",
      type: "United Nations Agency",
      role: "Decentralized Solar Medical Sterilization in PHCs"
    },
    {
      name: "Karnataka State Council for Sci & Tech",
      abbr: "KSCST",
      type: "State Innovation Council",
      role: "Pura Biogas & Rural Water Filtration Deployment"
    }
  ];

  return (
    <section className="home-preview-section home-partners-section" style={{ background: '#faf8f5' }}>
      <div className="container">
        <div className="home-section-header-row">
          <div className="home-section-title-wrap">
            <span className="section-tag">R&D Ecosystem</span>
            <h2>Sponsors, Industrial Partners & Policy Bodies</h2>
            <p>
              Our translational research, pilot deployments, and intellectual property are supported by leading government ministries, public sector enterprises, global foundations, and industry pioneers.
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="partners-grid">
          {partners.map((p, idx) => (
            <div key={idx} className="partner-card glass-card">
              <div className="partner-top">
                <span className="partner-abbr">{p.abbr}</span>
                <span className="partner-type-badge">{p.type}</span>
              </div>
              <h4 className="partner-name">{p.name}</h4>
              <p className="partner-role">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
