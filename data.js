// ==========================================================================
// PORTFOLIO CENTRAL STATE MANAGEMENT FOR MD SHAKIB FARAZI
// Hybrid Engine: Full-Stack REST API Sync + Offline LocalStorage Resilience
// ==========================================================================

const STORAGE_KEY = 'shakib_portfolio_data_v1';
const AUTH_KEY = 'shakib_portfolio_admin_auth';
const API_BASE = '/api';
const LEGACY_CONTACT_EMAIL = 'shakibfarazi.official@gmail.com';

// Default Master Data Template
const LEGACY_ROLE_TAGLINE = "Creative Designer & Esports Leader";
const LEGACY_PROFILE_BIO = "I’m a dedicated Free Fire esports player, creative graphic designer, self-taught programmer, and digital marketing expert exploring cyber security. As the leader of Team Unique, I fuse tactical precision, standout visuals, and smart code to build, lead, and dominate across platforms.";
const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    fullName: "MD SHAKIB FARAZI",
    roleTagline: "Full-Stack Developer & UI/UX Designer | Graphic Designer & Brand Identity Specialist | Digital Marketer & Brand Strategist | Web Developer & Cybersecurity Learner | Esports Athlete & Team Leader",
    eyebrow: "HELLO, I'M",
    bio: "I’m a dedicated esports player, creative graphic designer, self-taught programmer, and digital marketing expert currently learning cybersecurity. I specialize in creating engaging digital experiences, developing modern websites and applications, designing standout visuals, and growing online brands through strategic marketing. As the leader of Team Unique, I combine creativity, technology, and leadership to build innovative projects and achieve ambitious goals.",
    photoUrl: "profile-current.png",
    stats: {
      years: "4+",
      yearsLabel: "Years Competitive & Design",
      projects: "60+",
      projectsLabel: "Projects & Smart Tools",
      trophies: "35+",
      trophiesLabel: "Team Scrims & Trophies",
      synergy: "100%",
      synergyLabel: "Squad Synergy & Focus"
    },
    socials: {
      youtube: "https://youtube.com/@gamershakib07?si=i44uG-FjyZQHELZP",
      discord: "https://discord.com/users/1118444538583859271",
      github: "https://github.com/mdshakibfarazimail-del",
      instagram: "https://www.instagram.com/md_shakib_farazi?cplk=NWJyNzQzcW9xcmhp",
      twitter: "https://x.com/Mdshakibfarazi",
      linkedin: "https://www.linkedin.com/in/mdshakibfarazi?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      facebook: "https://www.facebook.com/share/1EfKNtkeH9/",
      tiktok: "https://www.tiktok.com/@mdshakibfarazi?_r=1&_t=ZS-9AWMRV8zpa5"
    }
  },
  siteCopy: {},
  skills: [
    {
      id: "skill-graphic-design",
      badge: "GRAPHIC DESIGN",
      title: "Graphic Design & Creative",
      description: "Creating distinctive visual identities and digital content for esports teams, creators, social media, and online brands.",
      icon: "palette",
      tags: ["Graphic Design", "Logo Design & Brand Identity", "Photo Editing", "Video Editing", "Esports Branding", "Social Media Design", "YouTube Thumbnails & Banners", "UI/UX Design", "Motion Graphics & Visual Effects"]
    },
    {
      id: "skill-web-software",
      badge: "WEB & SOFTWARE",
      title: "Web & Software Development",
      description: "Developing responsive websites, interactive applications, and digital tools while continuing to grow across the full stack.",
      icon: "code-2",
      tags: ["HTML5, CSS3 & JavaScript", "Python", "Web Design", "Responsive Web Design", "Frontend Development", "Backend Development", "Full-Stack Development", "Website Development", "Web Application Development", "App Development", "Interactive UI & Animation", "Database Integration", "API Integration"]
    },
    {
      id: "skill-cybersecurity",
      badge: "CYBERSECURITY",
      title: "Cybersecurity & Technology",
      description: "Building cybersecurity knowledge with an interest in safer systems, networking, Linux, and responsible security practices.",
      icon: "shield-alert",
      tags: ["Cybersecurity Fundamentals", "Linux & Kali Linux Learning", "Networking Fundamentals", "Web Security Fundamentals", "Ethical Hacking Concepts", "Privacy & Digital Security"]
    },
    {
      id: "skill-marketing",
      badge: "DIGITAL MARKETING",
      title: "Digital Marketing & Branding",
      description: "Helping online projects and brands grow with purposeful content, consistent identity, and audience-focused promotion.",
      icon: "trending-up",
      tags: ["Digital Marketing", "Social Media Marketing", "Content Strategy", "Personal Branding", "YouTube Channel Branding", "Audience Growth Strategy", "Online Business Promotion", "SEO Fundamentals"]
    },
    {
      id: "skill-esports",
      badge: "ESPORTS & GAMING",
      title: "Esports & Gaming",
      description: "Competing in Free Fire and leading Team Unique through team strategy, coordination, tournaments, and community building.",
      icon: "gamepad-2",
      tags: ["Competitive Free Fire", "Esports Team Leadership", "In-Game Strategy & Team Coordination", "Rush Gameplay & Sniping", "Tournament Participation", "Gaming Content Creation", "Esports Team Branding", "Community Building"]
    },
    {
      id: "skill-leadership",
      badge: "LEADERSHIP & PROJECTS",
      title: "Leadership & Digital Projects",
      description: "Bringing ideas to life through team leadership, thoughtful planning, creative problem-solving, and continuous learning.",
      icon: "rocket",
      tags: ["Team Management", "Creative Problem-Solving", "Project Planning", "Digital Product Development", "Portfolio Development", "E-commerce Website Projects", "Continuous Learning & Innovation"]
    }
  ],
  appearance: {
    theme: "emerald",
    customAccent: "",
    background: "#0a100d",
    surface: "#101916",
    displayFont: "Inter",
    contentWidth: 1280,
    density: "comfortable"
  },
  layout: {
    sectionOrder: ["about", "esports", "arsenal-3d", "design", "growth", "contact"],
    sections: {
      about: true,
      esports: true,
      "arsenal-3d": true,
      design: true,
      growth: true,
      contact: true
    }
  },
  esports: {
    squadName: "TEAM UNIQUE",
    captainTitle: "CAPTAIN & IN-GAME LEADER: MD SHAKIB FARAZI",
    squadBio: "Team Unique was founded on chemistry, discipline, and unyielding tactical hunger. We analyze tournament circles, engineer synchronized entry-rushes, and maintain an aggressive, clutch-first playstyle in regional scrims and tournaments.",
    metrics: {
      top3Rate: "68%",
      kdRatio: "4.8",
      tier: "GM",
      scrimsTotal: ""
    },
    recentMilestone: "1st Place Champion in Regional Squad Blitz Scrims (14 Kills in Grand Finals Booyah)."
  },
  designs: [
    {
      id: "des-1",
      title: "Team Unique Official Crest",
      category: "branding",
      tag: "BRANDING",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
      description: "Complete visual branding suite, jersey typography, shield emblems, and competitive tournament broadcast graphics.",
      subtext: "Identity & Crest"
    },
    {
      id: "des-2",
      title: "High-CTR Scrim Highlights",
      category: "thumbnails",
      tag: "THUMBNAIL",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
      description: "High-contrast, saturated thumbnail compositions with custom glow typography engineered to maximize YouTube CTR and retention.",
      subtext: "Viral Content"
    },
    {
      id: "des-3",
      title: "Neo-Cyberpunk Tactical Mask",
      category: "vector",
      tag: "3D & VECTOR",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      description: "Custom vector illustration blending cyberpunk geometric shards with glowing neon gradients for gamer avatars and community merch.",
      subtext: "Vector Art"
    },
    {
      id: "des-4",
      title: "Tactical Live Stream Overlay",
      category: "branding",
      tag: "OVERLAY",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      description: "Animated HUD stream packaging with webcam frames, tournament bracket tickers, starting screens, and automated alerts.",
      subtext: "Stream Design"
    },
    {
      id: "des-5",
      title: "ScrimPulse Web UI",
      category: "tools",
      tag: "UI / TOOL",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      description: "Modern glassmorphism user interface for calculating tournament match points, leaderboards, and squad statistics in real time.",
      subtext: "UI / UX Concept"
    },
    {
      id: "des-6",
      title: "3D Hologram Type Specimen",
      category: "vector",
      tag: "TYPOGRAPHY",
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
      description: "Volumetric metallic 3D typography exploration featuring refractive glass materials and chrome emerald edge illumination.",
      subtext: "3D Typography"
    }
  ],
  tools: [
    {
      id: "tool-1",
      title: "ScrimPulse - Free Fire Scorer",
      badge: "TOURNAMENT ENGINE",
      icon: "flame",
      description: "Automated tournament scoring engine that digests squad match results, applies official Free Fire point tables, factors kill multipliers, and outputs real-time leaderboard standings.",
      tags: ["JavaScript", "Local Storage", "CSV Export", "Esports Logic"]
    },
    {
      id: "tool-2",
      title: "Team Unique Nexus Discord Bot",
      badge: "COMMUNITY BOT",
      icon: "bot",
      description: "Custom-built automated Discord bot managing scrim registration, role assignment for registered rosters, automatic voice channel allocation, and match time notifications.",
      tags: ["Node.js", "Discord API", "Webhooks", "Automation"]
    }
  ],
  growth: {
    impressions: "500K+",
    impressionsLabel: "TOTAL REACH & IMPRESSIONS",
    impressionsDesc: "Across YouTube, Instagram & esports posts",
    views: "150K+",
    viewsLabel: "VIDEO VIEWS GENERATED",
    viewsDesc: "Through optimized thumbnails & hooks",
    multiplier: "4.8x",
    multiplierLabel: "ENGAGEMENT MULTIPLIER",
    multiplierDesc: "Compared to standard gaming channels",
    assets: "35+",
    assetsLabel: "BRAND & TEAM ASSETS",
    assetsDesc: "Crafted for tournaments and squads"
  },
  contact: {
    email: "mdshakibfarazi7@gmail.com",
    squadDivision: "Team Unique Esports (Free Fire Division)",
    location: "Bangladesh • Available Globally (Remote)",
    whatsappUrl: "https://wa.me/8801310589692?text=Hi%20Shakib%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    statusText: "ALL SYSTEMS OPERATIONAL // LATENCY: 12ms"
  },
  messages: [],
  security: {}
};

class PortfolioStore {
  constructor() {
    this.data = this.loadLocal();
    this.listeners = [];
    this.isServerConnected = false;
    this.syncWithBackend();
  }

  // Load from LocalStorage
  loadLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const migratedProfile = this.migrateLegacyProfileCopy(parsed);
        const migratedPhoto = this.migrateLegacyProfilePhoto(parsed);
        const migratedContact = this.migrateLegacyContact(parsed);
        const migratedSocials = this.migrateLegacySocialLinks(parsed);
        const migratedSecurity = this.removeLegacyAdminPin(parsed);
        if (migratedProfile || migratedPhoto || migratedContact || migratedSocials || migratedSecurity) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        return mergePortfolioData(parsed);
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
  }

  migrateLegacyProfileCopy(data) {
    const profile = data && data.profile;
    if (!profile) return false;

    let migrated = false;
    if (profile.roleTagline === LEGACY_ROLE_TAGLINE) {
      profile.roleTagline = DEFAULT_PORTFOLIO_DATA.profile.roleTagline;
      migrated = true;
    }

    if (profile.bio === LEGACY_PROFILE_BIO) {
      profile.bio = DEFAULT_PORTFOLIO_DATA.profile.bio;
      migrated = true;
    }
    return migrated;
  }

  migrateLegacyProfilePhoto(data) {
    const profile = data && data.profile;
    if (!profile || !["profile.jpg", "profile.png"].includes(profile.photoUrl)) return false;

    profile.photoUrl = DEFAULT_PORTFOLIO_DATA.profile.photoUrl;
    return true;
  }

  migrateLegacyContact(data) {
    if (data.contact && data.contact.email === LEGACY_CONTACT_EMAIL) {
      data.contact.email = DEFAULT_PORTFOLIO_DATA.contact.email;
      return true;
    }
    return false;
  }

  migrateLegacySocialLinks(data) {
    if (!data.profile) return false;
    if (!data.profile.socials) data.profile.socials = {};

    const previousDefaultLinks = {
      youtube: ['https://youtube.com', 'https://www.youtube.com'],
      discord: ['https://discord.com', 'https://discord.com/'],
      github: ['https://github.com', 'https://github.com/'],
      instagram: ['https://instagram.com', 'https://instagram.com/'],
      twitter: ['https://x.com', 'https://x.com/'],
      linkedin: ['https://linkedin.com', 'https://linkedin.com/'],
      facebook: ['https://facebook.com', 'https://facebook.com/'],
      tiktok: ['https://tiktok.com', 'https://tiktok.com/']
    };
    let migrated = false;
    Object.entries(previousDefaultLinks).forEach(([platform, previousLinks]) => {
      if (!data.profile.socials[platform] || previousLinks.includes(data.profile.socials[platform])) {
        data.profile.socials[platform] = DEFAULT_PORTFOLIO_DATA.profile.socials[platform];
        migrated = true;
      }
    });
    return migrated;
  }

  removeLegacyAdminPin(data) {
    if (!data.security || !Object.hasOwn(data.security, 'adminPin')) return false;
    delete data.security.adminPin;
    return true;
  }

  // Sync with Server REST API if available
  async syncWithBackend() {
    try {
      const res = await fetch(`${API_BASE}/portfolio`);
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && typeof serverData === 'object') {
          this.migrateLegacyProfileCopy(serverData);
          this.migrateLegacyContact(serverData);
          this.migrateLegacySocialLinks(serverData);
          const migratedPhoto = this.migrateLegacyProfilePhoto(serverData);
          this.data = mergePortfolioData(serverData);
          this.isServerConnected = true;
          if (migratedPhoto) {
            await this.save(this.data);
          } else {
            this.saveLocal();
            this.notify();
          }
          console.log("⚡ [Shakib Store] Synchronized with Full-Stack Backend API");
        }
      }
    } catch (e) {
      // Backend not running (static hosting mode), continue using LocalStorage
      this.isServerConnected = false;
      console.log("ℹ️ [Shakib Store] Running in Standalone / Static Storage Mode");
    }
  }

  saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }

  async save(newData) {
    this.data = newData || this.data;
    this.removeLegacyAdminPin(this.data);
    this.saveLocal();
    this.notify();

    try {
      const token = sessionStorage.getItem(AUTH_KEY);
      const response = await fetch(`${API_BASE}/portfolio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(this.data)
      });
      if (!response.ok) {
        console.error(`Portfolio server save failed with HTTP ${response.status}`);
        return { savedLocally: true, savedToServer: false };
      }
      return { savedLocally: true, savedToServer: true };
    } catch (e) {
      console.error("Portfolio server save failed; changes remain saved in this browser.", e);
      return { savedLocally: true, savedToServer: false };
    }
  }

  get() {
    return this.data;
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    this.save(this.data);
    return this.data;
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      this.data = mergePortfolioData(parsed);
      this.save(this.data);
      return true;
    } catch (e) {
      console.error("Invalid JSON import", e);
      return false;
    }

  }

  async addMessage(msg) {
    if (!this.data.messages) this.data.messages = [];
    const newMsg = Object.assign({
      id: "msg-" + Date.now(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    }, msg);

    this.data.messages.unshift(newMsg);
    this.save(this.data);

    // Also send to backend
    try {
      await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
    } catch (e) {}

    return newMsg;
  }

  async deleteMessage(msgId) {
    if (!this.data.messages) return;
    this.data.messages = this.data.messages.filter(m => m.id !== msgId);
    this.save(this.data);

    try {
      const token = sessionStorage.getItem(AUTH_KEY);
      await fetch(`${API_BASE}/messages/${encodeURIComponent(msgId)}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
    } catch (e) {}
  }

  // Auth Helpers
  isAuthenticated() {
    return Boolean(sessionStorage.getItem(AUTH_KEY));
  }

  async login(pin) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });
    const result = await response.json();
    if (!response.ok || typeof result.token !== 'string') {
      throw new Error(result.error || 'Admin sign-in failed.');
    }

    sessionStorage.setItem(AUTH_KEY, result.token);
    const portfolioResponse = await fetch(`${API_BASE}/portfolio`, {
      headers: { Authorization: `Bearer ${result.token}` }
    });
    if (!portfolioResponse.ok) {
      sessionStorage.removeItem(AUTH_KEY);
      throw new Error('Signed in, but the portfolio could not be loaded.');
    }
    this.data = mergePortfolioData(await portfolioResponse.json());
    this.isServerConnected = true;
    this.saveLocal();
    this.notify();
    return true;
  }

  logout() {
    const token = sessionStorage.getItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    this.data.messages = [];
    this.saveLocal();
    if (token) {
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(error => console.error('Admin session could not be closed on the server.', error));
    }
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.data); } catch (e) { console.error(e); }
    });
  }
}

function mergePortfolioData(source) {
  const input = source && typeof source === 'object' ? source : {};
  const merged = Object.assign({}, DEFAULT_PORTFOLIO_DATA, input);
  merged.profile = Object.assign({}, DEFAULT_PORTFOLIO_DATA.profile, input.profile);
  merged.profile.stats = Object.assign({}, DEFAULT_PORTFOLIO_DATA.profile.stats, input.profile && input.profile.stats);
  merged.profile.socials = Object.assign({}, DEFAULT_PORTFOLIO_DATA.profile.socials, input.profile && input.profile.socials);
  merged.esports = Object.assign({}, DEFAULT_PORTFOLIO_DATA.esports, input.esports);
  merged.esports.metrics = Object.assign({}, DEFAULT_PORTFOLIO_DATA.esports.metrics, input.esports && input.esports.metrics);
  merged.growth = Object.assign({}, DEFAULT_PORTFOLIO_DATA.growth, input.growth);
  merged.contact = Object.assign({}, DEFAULT_PORTFOLIO_DATA.contact, input.contact);
  merged.siteCopy = Object.assign({}, DEFAULT_PORTFOLIO_DATA.siteCopy, input.siteCopy);
  merged.appearance = Object.assign({}, DEFAULT_PORTFOLIO_DATA.appearance, input.appearance);
  merged.layout = Object.assign({}, DEFAULT_PORTFOLIO_DATA.layout, input.layout);
  merged.layout.sections = Object.assign({}, DEFAULT_PORTFOLIO_DATA.layout.sections, input.layout && input.layout.sections);
  merged.layout.sectionOrder = Array.isArray(input.layout && input.layout.sectionOrder)
    ? input.layout.sectionOrder
    : DEFAULT_PORTFOLIO_DATA.layout.sectionOrder;
  merged.skills = Array.isArray(input.skills) ? input.skills : DEFAULT_PORTFOLIO_DATA.skills;
  merged.designs = Array.isArray(input.designs) ? input.designs : DEFAULT_PORTFOLIO_DATA.designs;
  merged.tools = Array.isArray(input.tools) ? input.tools : DEFAULT_PORTFOLIO_DATA.tools;
  merged.messages = Array.isArray(input.messages) ? input.messages : DEFAULT_PORTFOLIO_DATA.messages;
  merged.security = {};
  merged.messages = Array.isArray(input.messages) ? input.messages : [];
  return merged;
}

window.portfolioStore = new PortfolioStore();
