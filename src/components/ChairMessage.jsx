import React from 'react';
import { Quote, ArrowRight, Award, ShieldCheck, Flame, Leaf, Building2, Droplets } from 'lucide-react';

export default function ChairMessage({ onNavigateMembers, onNavigateHistory }) {
  const visionPillars = [
    {
      icon: Flame,
      color: "#e05328",
      bg: "#ffedd5",
      title: "Clean Energy Transition",
      desc: "Pioneering high-pressure oxy-steam biomass gasification and green hydrogen generation to replace fossil fuels in heavy industry and transport."
    },
    {
      icon: Leaf,
      color: "#166534",
      bg: "#dcfce7",
      title: "Circular Bioeconomy",
      desc: "Engineering single-atom and solid-acid catalysts to convert non-edible agricultural lignocellulose into recyclable PEF bioplastics and platform chemicals."
    },
    {
      icon: Building2,
      color: "#0f2942",
      bg: "#e2e8f0",
      title: "Low-Carbon Habitats",
      desc: "Developing stabilized earth block masonry, carbon-sequestering geopolymer concrete, and passive solar chimneys that cut building embodied energy by 70%."
    },
    {
      icon: Droplets,
      color: "#0284c7",
      bg: "#e0f2fe",
      title: "Ecological Water & Sanitation",
      desc: "Deploying solar-driven graphene oxide nanofiltration membranes and decentralized constructed wetlands for fluoride, arsenic, and wastewater remediation."
    }
  ];

  return (
    <section className="home-chair-section">
      <div className="container">
        <div className="chair-editorial-grid glass-card">
          {/* Left Column: Portrait & Credentials */}
          <div className="chair-portrait-col">
            <div className="chair-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                alt="Prof. S. Dasappa, Chair of Centre for Sustainable Technologies, IISc Bangalore" 
                className="chair-portrait-img"
                loading="lazy"
              />
              <div className="chair-badge-float">
                <ShieldCheck size={16} className="text-forest" />
                <span>Chair, CST IISc</span>
              </div>
            </div>

            <div className="chair-id-block">
              <h3>Prof. S. Dasappa</h3>
              <p className="chair-native-name">ಪ್ರೊ. ಎಸ್. ದಾಸಪ್ಪ</p>
              <p className="chair-titles">FNAE, FNASc &bull; Professor & Chair</p>
              <p className="chair-dept">Centre for Sustainable Technologies, IISc Bangalore</p>

              <div className="chair-awards-pill">
                <Award size={14} className="text-terracotta" />
                <span>National Clean Energy Pioneer Award 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Vision Message */}
          <div className="chair-message-col">
            <div className="chair-eyebrow">
              <Quote size={20} className="text-terracotta" />
              <span>Message from the Department Chair</span>
            </div>

            <h2 className="chair-editorial-heading">
              "Five Decades of Translational Green Engineering for a Climate-Resilient Planet"
            </h2>

            <div className="chair-quote-body">
              <p>
                Welcome to the <strong>Centre for Sustainable Technologies (CST)</strong> at the Indian Institute of Science, Bangalore. Established in 1974 under the visionary leadership of <strong>Prof. Amulya K. N. Reddy</strong> as ASTRA, our centre was founded on a singular conviction: that world-class science must directly serve society and ecological preservation.
              </p>
              <p>
                Our philosophy has never been confined to ivory-tower theory. From deploying India's first decentralized village biomass microgrid in Hosahalli to engineering commercial multi-megawatt gasifiers exported worldwide, CST has proven that deep scientific inquiry and translational field impact go hand in hand.
              </p>
              <p>
                Today, as climate vulnerability accelerates, our multidisciplinary teams of chemical engineers, material scientists, and architects are driving critical breakthroughs: catalytic routes for bio-derived plastics, green hydrogen generation, carbon-negative cement, and solar water decontamination. We warmly invite students, scholars, and industry partners to join us in shaping this clean technology revolution.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="chair-pillars-grid">
              {visionPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="chair-pillar-card">
                    <div className="pillar-icon-box" style={{ color: pillar.color, background: pillar.bg }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4>{pillar.title}</h4>
                      <p>{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="chair-actions-row">
              <button onClick={onNavigateMembers} className="btn-hero-terracotta">
                <span>Meet Faculty & Research Leadership</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={onNavigateHistory} className="btn-secondary">
                <span>ASTRA Heritage & Timeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
