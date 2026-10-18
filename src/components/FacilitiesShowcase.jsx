import React from 'react';
import { Layers, ArrowRight, Microscope, Gauge, Cpu, Sun, Images, CheckCircle2 } from 'lucide-react';

export default function FacilitiesShowcase({ onNavigateAlbum, onNavigateAccess }) {
  const facilities = [
    {
      id: "fac-1",
      title: "High-Pressure Catalysis & Reactor Engineering Suite",
      category: "Catalysis & Green Synthesis",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      description: "Equipped with automated continuous-flow microreactors, 100-bar stirred slurry autoclaves, and in-situ catalyst reduction stations for 5-HMF and bio-fuel upgrading.",
      highlights: [
        "Agilent 8890 GC-MS with dual FID/TCD detectors",
        "Shimadzu Prominence Ultra-Fast HPLC system",
        "Micromeritics 3Flex BET Surface Area & Pore Analyzer",
        "ChemBET Pulsar automated chemisorption unit"
      ]
    },
    {
      id: "fac-2",
      title: "100 kg/day Oxy-Steam Biomass Gasification Pilot Hall",
      category: "Clean Energy & Hydrogen",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      description: "Full-scale multi-stage downdraft gasifier testbed with automated high-temperature catalytic tar cracking, ceramic candle filters, and fuel cell-grade PSA hydrogen cleanup.",
      highlights: [
        "100 kg/hr pressurized oxy-steam gasifier tower",
        "Online Gasmet FTIR multi-component syngas analyzer",
        "High-recovery Pressure Swing Adsorption (PSA) unit",
        "500 kWe 100% producer gas engine test dynamometer"
      ]
    },
    {
      id: "fac-3",
      title: "Sustainable Habitat & Geopolymer Structural Testing Complex",
      category: "Materials & Architecture",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
      description: "Dedicated testing laboratory for compressed stabilized earth blocks (CSEB), alkali-activated pozzolanic cements, and full-scale load-bearing structural masonry prisms.",
      highlights: [
        "500 kN Computerized Universal Testing Machine (UTM)",
        "Environmental CO2 accelerated carbonation curing chamber",
        "Ultrasonic pulse velocity and dynamic elastic modulus tester",
        "Automated hydraulic MARDINI earth block press station"
      ]
    },
    {
      id: "fac-4",
      title: "Concentrated Solar Thermal & Membrane Water Desalination Facility",
      category: "Solar & Water Technologies",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      description: "Rooftop solar testing yard with parabolic dish concentrators and cross-flow membrane filtration stations for rural fluoride, arsenic, and wastewater remediation.",
      highlights: [
        "25 kWt parabolic solar thermal concentrator dish",
        "Graphene oxide forward/reverse osmosis membrane rig",
        "Solar-driven high-pressure steam autoclave sterilizer",
        "PerkinElmer Avio 200 ICP-OES for trace metal analysis"
      ]
    }
  ];

  return (
    <section className="home-preview-section home-facilities-section" style={{ background: '#faf8f5' }}>
      <div className="container">
        <div className="home-section-header-row">
          <div className="home-section-title-wrap">
            <span className="section-tag">Experimental Infrastructure</span>
            <h2>State-of-the-Art Research Facilities</h2>
            <p>
              Advanced pilot plants, high-precision analytical spectroscopy, and environmental testbeds powering breakthrough sustainability investigations at IISc Bengaluru.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={onNavigateAlbum} className="btn-secondary">
              <Images size={16} />
              <span>View Lab Photo Album</span>
            </button>
            <button onClick={onNavigateAccess} className="btn-hero-terracotta">
              <span>Facility Access Inquiries</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Facilities 2x2 Grid */}
        <div className="facilities-grid">
          {facilities.map((fac) => (
            <div key={fac.id} className="facility-card glass-card">
              <div className="facility-image-wrap">
                <img 
                  src={fac.image} 
                  alt={fac.title} 
                  className="facility-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="badge badge-terracotta facility-badge-float">
                  {fac.category}
                </span>
              </div>

              <div className="facility-content">
                <h3 className="facility-title">{fac.title}</h3>
                <p className="facility-desc">{fac.description}</p>

                <div className="facility-equipment-block">
                  <h4 className="equip-heading">Core Analytical & Pilot Systems:</h4>
                  <ul className="equip-list">
                    {fac.highlights.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={13} className="text-forest flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
