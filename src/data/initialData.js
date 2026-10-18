import { researchProjectsData } from './researchProjectsData';

export const initialLabData = {
  labInfo: {
    name: "Centre for Sustainable Technologies (CST)",
    shortName: "CST Lab",
    department: "Centre for Sustainable Technologies (CST) / Centre for Sustainable Development",
    institute: "Indian Institute of Science (IISc), Bangalore",
    established: "1974",
    leadName: "Prof. S. Dasappa",
    leadTitle: "Professor & Chair, Centre for Sustainable Technologies",
    leadDesignation: "FNAE, FNASc, Chair of CST, IISc Bangalore",
    leadEmail: "chair.cst@iisc.ac.in",
    leadRoom: "CST Main Building, Room 102",
    officeEmail: "office.cst@iisc.ac.in",
    phone: "+91-80-2293-2447",
    fax: "+91-80-2360-0985",
    address: "Centre for Sustainable Technologies (CST), Indian Institute of Science, CV Raman Road, Bengaluru, Karnataka 560012, India",
    tagline: "Pioneering Catalytic Biomass Conversion, Renewable Energy Systems, and Zero-Carbon Technologies.",
    mission: "At the Centre for Sustainable Technologies (CST) in IISc Bangalore, we invent and deploy breakthrough green catalytic processes, advanced biomass gasification, solar thermal systems, and circular bio-based materials. Founded originally as ASTRA in 1974, CST bridges world-class fundamental science with transformative sustainability solutions for India and the global climate.",
    stats: {
      papers: "210+",
      patents: "34",
      citations: "9,400+",
      grants: "₹24.8 Cr",
      phdGraduated: "42",
      activeScholars: "38"
    }
  },

  researchThemes: [
    {
      id: "theme-1",
      number: "01",
      title: "Catalytic Biomass Conversion & Renewable Fuels",
      subtitle: "Heterogeneous catalysis for bio-derived platform chemicals and green fuels",
      summary: "Designing solid acid-base catalysts and supported metal catalysts to convert non-edible agricultural lignocellulose and sugars into high-value platform chemicals and drop-in fuels.",
      details: "Our group develops multi-functional zeolite and MOF catalysts that convert cellulose and hemicellulose derivatives (such as 5-HMF and furfural) with high selectivity, avoiding wasteful side-reactions and lowering energy requirements in separation processes.",
      diagram: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
      tags: ["Heterogeneous Catalysis", "Biomass Conversion", "Green Chemistry", "5-HMF", "Solid Acid Catalysts"],
      leadMember: "Prof. S. Dasappa & Dev Ahirwar",
      paperCount: 56
    },
    {
      id: "theme-2",
      number: "02",
      title: "Bio-Based Plastics & Green Monomer Synthesis",
      subtitle: "Replacing petrochemical plastics with fully biodegradable circular polymers",
      summary: "Synthesizing bio-derived monomers such as FDCA (furandicarboxylic acid) and lactic acid oligomers from agricultural waste for sustainable packaging and engineering polymers.",
      details: "We establish catalytic oxidation and condensation routes utilizing earth-abundant metal catalysts. This enables scalable production of FDCA to substitute fossil PTA in PET plastic production with 80% reduced carbon emissions.",
      diagram: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      tags: ["Bioplastics", "FDCA Synthesis", "Circular Polymers", "Renewable Carbon", "Green Solvents"],
      leadMember: "Dr. Arundhati Sundaram & Ananya Deshmukh",
      paperCount: 48
    },
    {
      id: "theme-3",
      number: "03",
      title: "Solar Thermal Energy, Clean Hydrogen & Gasification",
      subtitle: "Ultra-high efficiency biomass gasifiers and thermochemical hydrogen reactors",
      summary: "Pioneering pressurized oxy-steam biomass gasifiers and concentrated solar thermal receivers to generate high-purity green hydrogen and syngas for clean industrial heat.",
      details: "CST has designed world-renowned multi-stage gasification systems deployed in over 50 industrial microgrids across India and internationally, converting agricultural residue into carbon-negative power.",
      diagram: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
      tags: ["Green Hydrogen", "Biomass Gasification", "Solar Thermal", "Clean Syngas", "Carbon Capture"],
      leadMember: "Prof. S. Dasappa & Dr. Rajesh Nair",
      paperCount: 62
    },
    {
      id: "theme-4",
      number: "04",
      title: "Sustainable Habitat, Clean Water & Circular Ecosystems",
      subtitle: "Low-carbon building materials, ecological water purification and bio-waste valorization",
      summary: "Engineering compressed stabilized earth blocks, carbon-sequestering geopolymer concrete, and solar-driven membrane water desalination systems for climate-resilient habitats.",
      details: "Our field-tested ecological technologies have built eco-friendly schools, public health centers, and decentralized solar water purification plants reaching thousands of rural communities.",
      diagram: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
      tags: ["Green Habitat", "Geopolymer Concrete", "Solar Water Desalination", "Bio-char", "Ecological Sanitation"],
      leadMember: "Sneha Balasubramanian & Rohan Kulkarni",
      paperCount: 44
    }
  ],

  researchProjects: researchProjectsData,

  members: [
    {
      id: "m-1",
      name: "Prof. S. Dasappa",
      nativeName: "ಪ್ರೊ. ಎಸ್. ದಾಸಪ್ಪ",
      role: "Faculty & Chair",
      category: "faculty",
      title: "Professor & Chair, Centre for Sustainable Technologies",
      degrees: "Ph.D. (IISc Bangalore), M.Tech (IIT Madras)",
      room: "CST Room 102",
      email: "chair.cst@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      topic: "Biomass Gasification, Clean Hydrogen, Catalytic Thermochemical Energy",
      scholarUrl: "https://scholar.google.com/",
      orcid: "0000-0002-1825-009X",
      awards: "FNAE, FNASc, National Energy Innovation Award, IISc Alumni Award of Excellence",
      bio: "Prof. Dasappa is Chair of CST, IISc Bangalore. He is an internationally acclaimed pioneer in thermo-chemical biomass gasification and green hydrogen generation."
    },
    {
      id: "m-2",
      name: "Dr. Arundhati Sundaram",
      nativeName: "ಡಾ. ಅರುಂಧತಿ ಸುಂದರಂ",
      role: "Senior Research Scientist",
      category: "faculty",
      title: "Principal Research Scientist, Catalysis Group",
      degrees: "Ph.D. (Imperial College London), M.Sc. (IISc)",
      room: "CST Catalysis Lab Room 106",
      email: "arundhati.s@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      topic: "Heterogeneous Catalysis for Sugar Conversion & Bio-derived Monomers",
      scholarUrl: "https://scholar.google.com/",
      orcid: "0000-0001-9042-3312",
      awards: "SERB Women Excellence Award 2024, Green Chemistry Young Investigator",
      bio: "Leads the Catalytic Green Chemistry unit at CST, specializing in zeolite-catalyzed dehydration and selective oxidation of 5-HMF to FDCA."
    },
    {
      id: "m-3",
      name: "Dr. Rajesh K. Nair",
      nativeName: "ഡോ. രാജേഷ് കെ. നായർ",
      role: "Postdoctoral Fellow",
      category: "postdoc",
      title: "SERB National Postdoctoral Fellow",
      degrees: "Ph.D. (IIT Madras), M.Tech (NIT Calicut)",
      room: "CST Energy Lab 2",
      email: "rajeshnair@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      topic: "High-Temperature Oxy-Steam Gasification & Tar Cracking Catalysts",
      scholarUrl: "https://scholar.google.com/",
      orcid: "0000-0003-4411-8729",
      awards: "Best Dissertation Award in Renewable Energy",
      bio: "Focuses on developing nickel and dolomite supported catalysts for in-situ tar reforming during biomass gasification."
    },
    {
      id: "m-4",
      name: "Dev Ahirwar",
      nativeName: "देव अहिरवार",
      role: "Ph.D. Candidate (Senior)",
      category: "phd",
      title: "Senior Research Scholar (D5)",
      degrees: "B.Tech (NIT Bhopal), M.Tech (IISc)",
      room: "CST Lab Room 204",
      email: "devahirwar@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      topic: "Synthesis of Furan Carboxylic Acids from Protected HMF Using Metal-Organic Frameworks",
      scholarUrl: "https://scholar.google.com/",
      awards: "DST Inspire Fellow, Best Poster at International Porous Materials Symposium",
      bio: "Completing Ph.D. dissertation on MOF-catalyzed selective oxidation of acetal-protected biomass intermediates into bio-plastic monomers."
    },
    {
      id: "m-5",
      name: "Ananya Deshmukh",
      nativeName: "अनन्या देशमुख",
      role: "Ph.D. Scholar",
      category: "phd",
      title: "PMRF Fellow (D3)",
      degrees: "B.Tech (COEP Pune)",
      room: "CST Catalysis Lab Room 205",
      email: "ananyad@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      topic: "Solid Acid-Base Tandem Catalysts for One-Pot Cellulose Depolymerization",
      scholarUrl: "https://scholar.google.com/",
      awards: "Prime Minister's Research Fellowship (PMRF), Royal Society of Chemistry Grant",
      bio: "Investigating bifunctional hierarchical mesoporous zeolites for direct sugar isomerization and dehydration under mild conditions."
    },
    {
      id: "m-6",
      name: "Rohan Kulkarni",
      nativeName: "ರೋಹನ್ ಕುಲಕರ್ಣಿ",
      role: "Ph.D. Scholar",
      category: "phd",
      title: "Research Scholar (D2)",
      degrees: "B.E. (PESIT Bangalore), M.Tech (IIT Delhi)",
      room: "CST Solar Lab Room 206",
      email: "rohank@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      topic: "Concentrated Solar Thermal Hydrogen Production via Redox Cycles",
      scholarUrl: "https://scholar.google.com/",
      awards: "MNRE Renewable Energy Fellowship 2025",
      bio: "Designing ceria-based thermochemical water splitting reactors utilizing parabolic dish solar concentrators."
    },
    {
      id: "m-7",
      name: "Sneha Balasubramanian",
      nativeName: "ಸ್ನೇಹಾ ಬಾಲಸುಬ್ರಮಣಿಯನ್",
      role: "Ph.D. Scholar",
      category: "phd",
      title: "Research Scholar (D2)",
      degrees: "B.Tech (NIT Trichy)",
      room: "CST Habitat Lab Room 208",
      email: "snehab@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      topic: "Carbon-Negative Geopolymer Cement Using Biomass Gasifier Ash",
      scholarUrl: "https://scholar.google.com/",
      awards: "DST Women in STEM Scholar",
      bio: "Formulating low-embodied-energy sustainable binders and construction blocks utilizing industrial by-products and alkali activation."
    },
    {
      id: "m-8",
      name: "Vikram Patil",
      nativeName: "ವಿಕ್ರಮಾದಿತ್ಯ ಪಾಟೀಲ್",
      role: "M.Tech (Research) Scholar",
      category: "masters",
      title: "Graduate Student (M2)",
      degrees: "B.Tech (VJTI Mumbai)",
      room: "CST Bioenergy Lab",
      email: "vpatil@iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      topic: "Decentralized Solar Membrane Water Purification for Rural Habitations",
      scholarUrl: "https://scholar.google.com/",
      awards: "Tata Sustainability Innovation Fellowship",
      bio: "Prototyping zero-electricity solar-thermal membrane distillation systems for fluoride and arsenic removal in groundwater."
    },
    {
      id: "m-9",
      name: "Dr. Meera Nambiar",
      nativeName: "ഡോ. മീര നമ്പ്യാർ",
      role: "Distinguished Alumni",
      category: "alumni",
      title: "Senior Research Scientist at National Renewable Energy Laboratory (NREL), USA",
      degrees: "Ph.D. IISc Bangalore (2020), M.Tech (IISc)",
      room: "Alumni (Golden, Colorado, USA)",
      email: "m.nambiar@alumni.iisc.ac.in",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
      topic: "Bio-derived Sustainable Aviation Fuels (SAF)",
      scholarUrl: "https://scholar.google.com/",
      awards: "IISc Best Doctoral Thesis in Sustainable Technologies",
      bio: "Graduated with highest honors from CST, IISc in 2020. Now leads bio-jet fuel catalysis research at NREL."
    },
    {
      id: "m-10",
      name: "Dr. Tanvi Rao",
      nativeName: "ಡಾ. ತನ್ವಿ ರಾವ್",
      role: "Distinguished Alumni",
      category: "alumni",
      title: "Assistant Professor, Dept of Energy Science, IIT Bombay",
      degrees: "Ph.D. IISc Bangalore (2022)",
      room: "Alumni (Mumbai, India)",
      email: "tanvirao@energy.iitb.ac.in",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      topic: "Circular Bioeconomy & Life-Cycle Carbon Accounting",
      scholarUrl: "https://scholar.google.com/",
      awards: "INAE Young Engineer Award 2024",
      bio: "Ph.D. graduate from CST, IISc. Established the Circular Bio-Energy Systems Lab at IIT Bombay."
    }
  ],

  publications: [
    {
      id: "pub-2026-1",
      year: 2026,
      category: "journal",
      title: "Synthesis of Furan Carboxylic Acids from Acetal-Protected 5-Hydroxymethylfurfural (HMF) Using ZIF-68, a Cobalt-Based MOF",
      authors: ["Dev Ahirwar", "Arundhati Sundaram", "S. Dasappa*"],
      journal: "ChemSusChem (Chemistry & Sustainability Energy & Materials)",
      volume: "Vol. 19, Issue 4, e202600124",
      doi: "10.1002/cssc.202600124",
      pdfUrl: "https://chemistry-europe.onlinelibrary.wiley.com/",
      award: "Featured Cover Article",
      featured: true,
      bibtex: `@article{ahirwar2026synthesis,
  title={Synthesis of Furan Carboxylic Acids from Acetal-Protected 5-Hydroxymethylfurfural (HMF) Using ZIF-68, a Cobalt-Based MOF},
  author={Ahirwar, Dev and Sundaram, Arundhati and Dasappa, S},
  journal={ChemSusChem},
  volume={19},
  number={4},
  pages={e202600124},
  year={2026},
  publisher={Wiley-VCH}
}`
    },
    {
      id: "pub-2026-2",
      year: 2026,
      category: "journal",
      title: "High-Efficiency Clean Hydrogen Generation from Agricultural Residues via Oxy-Steam Gasification with In-Situ Tar Cracking",
      authors: ["Rajesh K. Nair", "Rohan Kulkarni", "S. Dasappa*"],
      journal: "Applied Energy",
      volume: "Vol. 362, Article 122980",
      doi: "10.1016/j.apenergy.2026.122980",
      pdfUrl: "https://www.sciencedirect.com/",
      award: "Top Cited Paper Award",
      featured: true,
      bibtex: `@article{nair2026highefficiency,
  title={High-Efficiency Clean Hydrogen Generation from Agricultural Residues via Oxy-Steam Gasification with In-Situ Tar Cracking},
  author={Nair, Rajesh K and Kulkarni, Rohan and Dasappa, S},
  journal={Applied Energy},
  volume={362},
  pages={122980},
  year={2026}
}`
    },
    {
      id: "pub-2025-1",
      year: 2025,
      category: "journal",
      title: "Solid Acid-Catalyzed Selective Conversion of Glucose and Fructose to 2,5-Furandicarboxylic Acid (FDCA) under Mild Conditions",
      authors: ["Ananya Deshmukh", "Arundhati Sundaram*", "S. Dasappa"],
      journal: "Green Chemistry (Royal Society of Chemistry)",
      volume: "Vol. 27, Issue 8, pp. 3410–3424",
      doi: "10.1039/D5GC00421A",
      pdfUrl: "https://pubs.rsc.org/",
      award: "RSC Green Chemistry Hot Article",
      featured: true,
      bibtex: `@article{deshmukh2025solidacid,
  title={Solid Acid-Catalyzed Selective Conversion of Glucose and Fructose to 2,5-Furandicarboxylic Acid (FDCA) under Mild Conditions},
  author={Deshmukh, Ananya and Sundaram, Arundhati and Dasappa, S},
  journal={Green Chemistry},
  volume={27},
  pages={3410--3424},
  year={2025}
}`
    },
    {
      id: "pub-2025-2",
      year: 2025,
      category: "conference",
      title: "Thermodynamic and Kinetic Assessment of Solar-Driven Thermochemical Water Splitting Utilizing Ceria-Zirconia Foam Monoliths",
      authors: ["Rohan Kulkarni", "S. Dasappa*"],
      journal: "Proceedings of the International Solar Energy Society (ISES Solar World Congress 2025)",
      volume: "New Delhi, India, pp. 112–126",
      doi: "10.18086/swc.2025.04.12",
      pdfUrl: "https://www.ises.org/",
      award: "Best Presentation Award",
      featured: false,
      bibtex: `@inproceedings{kulkarni2025thermodynamic,
  title={Thermodynamic and Kinetic Assessment of Solar-Driven Thermochemical Water Splitting Utilizing Ceria-Zirconia Foam Monoliths},
  author={Kulkarni, Rohan and Dasappa, S},
  booktitle={ISES Solar World Congress},
  pages={112--126},
  year={2025}
}`
    },
    {
      id: "pub-2025-3",
      year: 2025,
      category: "patent",
      title: "Multi-Stage Pressurized Oxy-Steam Gasifier System for Pure Hydrogen and Low-Tar Syngas Generation from High-Ash Biomass",
      authors: ["S. Dasappa", "Rajesh K. Nair"],
      journal: "Indian Patent Office (Application No. 202541009812 A)",
      volume: "Granted Patent No. IN-512094",
      doi: "10.ipo.gov.in/patents/202541009812",
      pdfUrl: "#",
      award: "Commercialized for Industrial Hydrogen Plants",
      featured: true,
      bibtex: `@misc{dasappa2025multistage,
  title={Multi-Stage Pressurized Oxy-Steam Gasifier System for Pure Hydrogen and Low-Tar Syngas Generation},
  author={Dasappa, S and Nair, Rajesh K},
  year={2025},
  note={Indian Patent No. IN-512094}
}`
    },
    {
      id: "pub-2024-1",
      year: 2024,
      category: "journal",
      title: "Carbon-Negative Geopolymer Masonry Units Utilizing Biomass Gasifier Ash: Mechanical Strength and Life-Cycle Carbon Analysis",
      authors: ["Sneha Balasubramanian", "Vikram Patil", "S. Dasappa*"],
      journal: "Construction and Building Materials",
      volume: "Vol. 418, Article 135402",
      doi: "10.1016/j.conbuildmat.2024.135402",
      pdfUrl: "https://www.sciencedirect.com/",
      award: "Top 2% Most Downloaded Article",
      featured: false,
      bibtex: `@article{balasubramanian2024carbonnegative,
  title={Carbon-Negative Geopolymer Masonry Units Utilizing Biomass Gasifier Ash: Mechanical Strength and Life-Cycle Carbon Analysis},
  author={Balasubramanian, Sneha and Patil, Vikram and Dasappa, S},
  journal={Construction and Building Materials},
  volume={418},
  pages={135402},
  year={2024}
}`
    },
    {
      id: "pub-2024-2",
      year: 2024,
      category: "keynote",
      title: "Plenary Keynote: Role of Bioenergy and Green Hydrogen in Decarbonizing Hard-to-Abate Industries in India",
      authors: ["Prof. S. Dasappa"],
      journal: "10th Tokyo Conference on Advanced Catalytic Science and Technology (TOCAT10) & World Bioenergy Summit",
      volume: "Plenary Address, Tokyo, Japan",
      doi: "10.tocat.org/keynote/2024",
      pdfUrl: "#",
      featured: true,
      bibtex: `@misc{dasappa2024keynote,
  title={Plenary Keynote: Role of Bioenergy and Green Hydrogen in Decarbonizing Hard-to-Abate Industries},
  author={Dasappa, S},
  year={2024},
  note={10th Tokyo Conference on Advanced Catalytic Science and Technology (TOCAT10)}
}`
    }
  ],

  news: [
    {
      id: "news-1",
      date: "2026-10-08",
      category: "Facility",
      title: "CST Commissions Advanced Biomass Gasification & Hydrogen Pilot Facility at IISc",
      excerpt: "The Centre for Sustainable Technologies inaugurates state-of-the-art oxy-steam biomass gasification research facility for high-purity green hydrogen production.",
      content: "The Centre for Sustainable Technologies (CST) at IISc Bangalore has commissioned an advanced pilot-scale gasification and catalysis suite. The facility accelerates research into green hydrogen, high-value syngas, and circular bio-based chemicals in collaboration with national energy labs.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: "news-2",
      date: "2026-09-25",
      category: "Farewell",
      title: "Mr. Dev Ahirwar's Thesis Defense & Farewell Party at Faculty Club",
      excerpt: "Dev Ahirwar successfully defended his Ph.D. thesis on MOF Catalysts for Furan Carboxylic Acid Synthesis from Biomass. Celebrations were held at the Main Faculty Club.",
      content: "Congratulations to Dev Ahirwar for completing his Ph.D. degree with outstanding honors! Dev published 5 first-author papers in ChemSusChem and Green Chemistry. The entire CST department felicitated him at the IISc Faculty Club lawn.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: "news-3",
      date: "2026-09-11",
      category: "Publication",
      title: "Paper on ZIF-68 MOF for FDCA Synthesis Published in ChemSusChem",
      excerpt: "Our paper demonstrating high-yield catalytic oxidation of acetal-protected HMF using cobalt-based MOFs was published as a Featured Article in ChemSusChem.",
      content: "Authored by Dev Ahirwar, Dr. Arundhati Sundaram, and Prof. S. Dasappa, this research establishes an eco-friendly oxidation route producing bio-plastic precursors without heavy metal salts or harmful halide promoters.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: "news-4",
      date: "2026-08-20",
      category: "Grant",
      title: "₹6.8 Crore DST-MNRE Landmark Grant for Green Hydrogen Pilot Plant",
      excerpt: "The Ministry of New & Renewable Energy (MNRE) awarded funding to CST, IISc to build India's largest pilot plant for biomass-derived pure green hydrogen.",
      content: "Prof. S. Dasappa will serve as the Principal Investigator for establishing a 1-tonne per day multi-stage oxy-steam biomass gasifier at the Challakere IISc Campus, providing zero-carbon hydrogen for heavy transport.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: "news-5",
      date: "2026-08-04",
      category: "Award",
      title: "Prof. S. Dasappa delivered Keynote Lecture at TOCAT10 in Tokyo",
      excerpt: "Prof. Dasappa delivered a plenary keynote address on Advanced Catalytic Biomass Conversion at the 10th Tokyo Conference on Advanced Catalytic Science and Technology.",
      content: "The lecture highlighted three decades of pioneering work at CST, IISc on thermochemical transformation of renewable carbon resources into sustainable platform chemicals and energy.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: "news-6",
      date: "2026-10-12",
      category: "Symposium",
      title: "Registration Open: International Symposium on Catalytic Renewable Carbon Technologies (Nov 14–16, 2026)",
      excerpt: "CST, IISc hosts leading international researchers in green hydrogen, solid acid catalysis, and circular bio-polymers at the Main Faculty Hall.",
      content: "The 3-day symposium brings together pioneers from MIT, Tokyo Tech, IITs, and industry to debate scaling thermochemical pathways for Net-Zero India. Submissions for poster and flash oral presentations are now accepted.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: "news-7",
      date: "2026-10-02",
      category: "Award",
      title: "Prof. S. Dasappa Conferred the 2026 National Clean Energy Pioneer Award by MNRE",
      excerpt: "The Ministry of New & Renewable Energy honors Prof. Dasappa for 3 decades of transformative work in multi-stage biomass gasifiers.",
      content: "The prestigious citation celebrates the translation of laboratory discoveries into over 150 commercial rural and industrial clean gasification systems deployed nationwide.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
      featured: true
    }
  ],

  albums: [
    {
      id: "alb-1",
      title: "Ph.D. Defense & Farewell Dinner 2026",
      date: "September 2026",
      location: "IISc Main Faculty Club, Bengaluru",
      cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      description: "Celebrating Dev Ahirwar's doctoral defense on MOF catalysts for bio-derived plastics.",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
          caption: "Lab members gathering at the Faculty Club lawn for the thesis celebration."
        },
        {
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
          caption: "Group photo with CST Chair Prof. S. Dasappa presenting the memento."
        },
        {
          url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
          caption: "Celebratory dinner with faculty, scholars, and postdocs."
        }
      ]
    },
    {
      id: "alb-2",
      title: "TOCAT10 International Catalysis Symposium - Tokyo",
      date: "August 2025",
      location: "Tokyo, Japan",
      cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      description: "Presenting papers on biomass conversion and networking with global green chemistry researchers.",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
          caption: "Dev presenting in the Advanced Catalysis session."
        },
        {
          url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
          caption: "Visiting Hokkaido University and Tokyo Institute of Technology partner laboratories."
        }
      ]
    },
    {
      id: "alb-3",
      title: "IISc Open House & Green Tech Demonstrations",
      date: "March 2025",
      location: "CST Campus Quadrangle, IISc",
      cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      description: "Demonstrating working biomass gasifiers, solar desalination kits, and bio-plastic samples.",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
          caption: "Ananya demonstrating bio-plastic synthesis from corn stover to visiting students."
        },
        {
          url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
          caption: "Live demonstration of the clean syngas flame from our micro-gasifier."
        }
      ]
    },
    {
      id: "alb-4",
      title: "Annual CST Field Retreat - Western Ghats",
      date: "December 2024",
      location: "Sirsi Ecological Research Station, Karnataka",
      cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Three-day scientific retreat reviewing rural energy pilots and forest biomass potential.",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          caption: "Morning strategy session discussing decentralized energy in the Western Ghats."
        },
        {
          url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
          caption: "Team trek and forest bio-resources documentation."
        }
      ]
    }
  ],

  access: {
    email: "navyabhat111@gmail.com",
    campus: "Indian Institute of Science (IISc), Bangalore",
    department: "Centre for Sustainable Technologies (CST) / Centre for Sustainable Development",
    roomDetails: "CST Main Complex, Rooms 101–120",
    addressLine: "Centre for Sustainable Technologies, Indian Institute of Science, CV Raman Road, Bengaluru, Karnataka 560012, India",
    landmark: "Located near the Silver Jubilee Guest House & CNR Rao Circle Gate",
    directions: [
      {
        mode: "From Kempegowda International Airport (BLR)",
        distance: "Approx. 32 km (45–60 mins)",
        details: "Board the air-conditioned BMTC Vayu Vajra bus route 'KIA-10' directly from the airport terminal. De-board at 'Tata Institute / IISc Circle'. Enter via the Main Gate, CST is a 4-minute walk through the Silver Jubilee lane."
      },
      {
        mode: "From Krantivira Sangolli Rayanna (Majestic) Railway Station",
        distance: "Approx. 7 km (20 mins)",
        details: "Take the Namma Metro Green Line to Sampige Road / Kuvempu Road, or board direct BMTC bus 252, 258, or 276 directly to the Tata Institute IISc Gate."
      },
      {
        mode: "From Yeshwantpur Railway Station",
        distance: "Approx. 2.5 km (7 mins)",
        details: "Yeshwantpur is the closest railway hub. Direct auto-rickshaws or cabs reach the IISc CST Building in under 10 minutes."
      }
    ]
  }
};
