// ==========================================================================
// MD SHAKIB FARAZI - CYBER ADMIN DASHBOARD CONTROLLER & LIVE RENDERER
// ==========================================================================

const SITE_COPY_GROUPS = [
  { title: "Browser & navigation", fields: [
    { key: "siteTitle", label: "Browser page title" },
    { key: "siteDescription", label: "Search description", multiline: true },
    { key: "navHome", label: "Home navigation" },
    { key: "navAbout", label: "About navigation" },
    { key: "navEsports", label: "Esports navigation" },
    { key: "navArsenal", label: "3D navigation" },
    { key: "navProjects", label: "Projects navigation" },
    { key: "navContact", label: "Contact navigation" }
  ] },
  { title: "Hero section", fields: [
    { key: "heroBadgeTitle", label: "Featured badge title" },
    { key: "heroBadgeDescription", label: "Featured badge text", multiline: true },
    { key: "heroWorkLabel", label: "Work button" },
    { key: "heroIntelLabel", label: "Second button" },
    { key: "heroIntelMeta", label: "Second button caption" },
    { key: "heroScrollLabel", label: "Scroll hint" },
    { key: "heroSelectedWorks", label: "Selected work label" },
    { key: "heroSelectedWorksArrow", label: "Selected work arrow" }
  ] },
  { title: "About section", fields: [
    { key: "aboutKicker", label: "Section eyebrow" },
    { key: "aboutTitle", label: "Section heading" },
    { key: "aboutSubtitle", label: "Section description", multiline: true }
  ] },
  { title: "Esports section", fields: [
    { key: "esportsKicker", label: "Section eyebrow" },
    { key: "esportsTitle", label: "Section heading" },
    { key: "esportsSubtitle", label: "Section description", multiline: true },
    { key: "esportsSquadBadge", label: "Squad card badge" },
    { key: "esportsProfileBadge", label: "Stats card badge" },
    { key: "esportsSnapshotTitle", label: "Stats card heading" },
    { key: "esportsTop3Label", label: "Top 3 stat label" },
    { key: "esportsKdLabel", label: "K/D stat label" },
    { key: "esportsTierLabel", label: "Tier stat label" },
    { key: "esportsScrimsLabel", label: "Scrims stat label" }
  ] },
  { title: "3D showcase", fields: [
    { key: "arsenalKicker", label: "Section eyebrow" },
    { key: "arsenalTitle", label: "Section heading" },
    { key: "arsenalSubtitle", label: "Section description", multiline: true },
    { key: "arsenalHudStatus", label: "Status HUD text" },
    { key: "arsenalHudInspect", label: "Controls HUD text" },
    { key: "arsenalHudOptics", label: "Optics HUD text" },
    { key: "arsenalCoordinates", label: "Target coordinates" },
    { key: "arsenalModelLabel", label: "Model picker label" },
    { key: "arsenalModelCore", label: "Core model name" },
    { key: "arsenalModelShield", label: "Shield model name" },
    { key: "arsenalModelRelic", label: "Relic model name" },
    { key: "arsenalModelDrone", label: "Drone model name" },
    { key: "arsenalThemeLabel", label: "Color picker label" },
    { key: "arsenalShaderLabel", label: "Shader controls label" },
    { key: "arsenalWireframeLabel", label: "Wireframe toggle" },
    { key: "arsenalSpinLabel", label: "Auto-spin toggle" }
  ] },
  { title: "Projects & Design Vault", fields: [
    { key: "designKicker", label: "Section eyebrow" },
    { key: "designTitle", label: "Section heading" },
    { key: "designSubtitle", label: "Section description", multiline: true },
    { key: "filterAll", label: "All projects filter" },
    { key: "filterBranding", label: "Branding filter" },
    { key: "filterThumbnails", label: "Media filter" },
    { key: "filterVector", label: "3D/vector filter" },
    { key: "filterTools", label: "Smart tools filter" },
    { key: "filterSoftware", label: "Software filter" }
  ] },
  { title: "Growth metrics", fields: [
    { key: "growthKicker", label: "Section eyebrow" },
    { key: "growthTitle", label: "Section heading" },
    { key: "growthSubtitle", label: "Section description", multiline: true }
  ] },
  { title: "Contact section", fields: [
    { key: "contactKicker", label: "Section eyebrow" },
    { key: "contactTitle", label: "Section heading" },
    { key: "contactSubtitle", label: "Section description", multiline: true },
    { key: "contactHeadline", label: "Contact card heading" },
    { key: "contactBody", label: "Contact card description", multiline: true },
    { key: "contactEmailLabel", label: "Email channel label" },
    { key: "contactWhatsappLabel", label: "WhatsApp channel label" },
    { key: "contactWhatsappText", label: "WhatsApp link text" },
    { key: "contactDivisionLabel", label: "Division label" },
    { key: "contactLocationLabel", label: "Location label" },
    { key: "contactFormTitle", label: "Form heading" },
    { key: "contactFormNote", label: "Form note", multiline: true },
    { key: "contactNameLabel", label: "Name field label" },
    { key: "contactEmailInputLabel", label: "Email field label" },
    { key: "contactSubjectLabel", label: "Subject field label" },
    { key: "contactMessageLabel", label: "Message field label" },
    { key: "contactSubmitLabel", label: "Form button" }
  ] },
  { title: "Footer", fields: [
    { key: "footerAbout", label: "About link" },
    { key: "footerEsports", label: "Esports link" },
    { key: "footerProjects", label: "Projects link" },
    { key: "footerContact", label: "Contact link" }
  ] }
];

const SITE_COPY_DEFAULTS = {
  siteTitle: "MD SHAKIB FARAZI | Leader of Team Unique • 3D Portfolio",
  siteDescription: "Official portfolio of Md Shakib Farazi — Leader of Team Unique, Free Fire esports competitor, creative graphic designer, self-taught programmer, and cyber security explorer.",
  navHome: "Home", navAbout: "About", navEsports: "Esports", navArsenal: "3D Arsenal", navProjects: "Projects & Design Vault", navContact: "Contact",
  heroBadgeTitle: "LEADER // TEAM UNIQUE",
  heroBadgeDescription: "Turning tactics, code & visuals into competitive dominance.",
  heroWorkLabel: "View My Work", heroIntelLabel: "Launch Intel", heroIntelMeta: "SYSTEM CLI 2.4", heroScrollLabel: "SCROLL TO EXPLORE", heroSelectedWorks: "PORTFOLIO: Selected Works", heroSelectedWorksArrow: "→",
  aboutKicker: "OPERATIONAL ARCHITECTURE", aboutTitle: "My Skills & Expertise",
  aboutSubtitle: "A multidisciplinary creator combining design, software development, cybersecurity learning, digital marketing, esports, and leadership.",
  esportsKicker: "COMPETITIVE GAMING", esportsTitle: "About Esports",
  esportsSubtitle: "Meet the team, learn about our competitive approach, and explore the current squad profile.",
  esportsSquadBadge: "FREE FIRE SQUAD", esportsProfileBadge: "SQUAD PROFILE", esportsSnapshotTitle: "Competitive Snapshot",
  esportsTop3Label: "Top 3 Rate:", esportsKdLabel: "K/D Ratio:", esportsTierLabel: "Current Tier:", esportsScrimsLabel: "Scrims Played:",
  arsenalKicker: "WEBGL 3D ENVIRONMENT", arsenalTitle: "Interactive 3D Arsenal",
  arsenalSubtitle: "Directly inspect 3D assets in real-time. Drag to rotate in 360°, scroll to zoom, toggle wireframe shaders, and switch neon frequencies.",
  arsenalHudStatus: "[STATUS] 3D ENGINE ONLINE (THREE.JS)", arsenalHudInspect: "[INSPECT] DRAG OR TOUCH TO ROTATE 360°",
  arsenalHudOptics: "[OPTICS] VOLUMETRIC SPECULAR SHADER", arsenalCoordinates: "TARGET LOCK // 23.8° N 90.4° E",
  arsenalModelLabel: "SELECT 3D ARTIFACT", arsenalModelCore: "Unique Core", arsenalModelShield: "Aegis Shield",
  arsenalModelRelic: "Quantum Relic", arsenalModelDrone: "Recon Drone", arsenalThemeLabel: "NEON FREQUENCY THEME",
  arsenalShaderLabel: "SHADER MODIFIERS", arsenalWireframeLabel: "Wireframe Mode", arsenalSpinLabel: "Auto Spin",
  designKicker: "MY PROJECTS & DESIGN VAULT", designTitle: "Projects & Design Vault",
  designSubtitle: "Explore my creative designs, esports branding, web projects, and software tools in one place.",
  filterAll: "All Projects", filterBranding: "Esports Branding", filterThumbnails: "Thumbnails & Media",
  filterVector: "3D & Vector Art", filterTools: "Smart UI Tools", filterSoftware: "Software Projects",
  growthKicker: "GROWTH METRICS", growthTitle: "Strategic Digital Marketing & Reach",
  growthSubtitle: "Combining visual psychology, content consistency, and algorithmic positioning to build passionate, engaged esports communities.",
  contactKicker: "DIRECT TRANSMISSION", contactTitle: "Initiate Contact",
  contactSubtitle: "Looking for a squad match, design commission, digital tool collaboration, or brand partnership? Message me on WhatsApp or use the form to prepare an email.",
  contactHeadline: "Ready for the Next Challenge",
  contactBody: "Whether you want to challenge Team Unique in a competitive scrim, need standout graphic designs that command high engagement, or want to collaborate on smart digital tools, I'm always open to new frontiers.",
  contactEmailLabel: "DIRECT EMAIL", contactWhatsappLabel: "WHATSAPP DIRECT", contactWhatsappText: "Chat with Shakib",
  contactDivisionLabel: "SQUAD / DIVISION", contactLocationLabel: "LOCATION",
  contactFormTitle: "Send a Message", contactFormNote: "Submit to open a draft in your email app. Review it there and press Send.",
  contactNameLabel: "YOUR NAME", contactEmailInputLabel: "YOUR EMAIL", contactSubjectLabel: "SUBJECT", contactMessageLabel: "MESSAGE", contactSubmitLabel: "Open Email Draft",
  footerAbout: "About", footerEsports: "Esports", footerProjects: "Projects", footerContact: "Contact"
};

const SITE_SECTIONS = [
  { id: "about", label: "About & Skills" },
  { id: "esports", label: "Esports" },
  { id: "arsenal-3d", label: "Interactive 3D Arsenal" },
  { id: "design", label: "Projects & Design Vault" },
  { id: "growth", label: "Growth Metrics" },
  { id: "contact", label: "Contact" }
];
let siteBuilderLayoutDraft = null;
let editingSkillId = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Render of Website from Data Store
  renderWebsiteFromStore();

  // 2. Subscribe to store changes for real-time reactive updates
  if (window.portfolioStore) {
    window.portfolioStore.subscribe(() => {
      renderWebsiteFromStore();
      populateAdminForms();
    });
  }

  // 3. Initialize Admin Panel UI & Event Listeners
  initAdminDashboard();
  initSiteBuilder();
});

function setCounterValue(element, value) {
  if (!element) return;

  const target = String(value);
  if (window.animatePortfolioCounter) {
    window.animatePortfolioCounter(element, target);
  } else {
    element.dataset.counterTarget = target;
    element.textContent = target;
  }
}

// ==========================================================================
// RENDER WEBSITE CONTENT DIRECTLY FROM STORE
// ==========================================================================
function renderWebsiteFromStore() {
  if (!window.portfolioStore) return;
  const data = window.portfolioStore.get();

  applySiteCopy(data.siteCopy);
  applyAppearance(data.appearance);
  applyLayout(data.layout);

  // --- Hero & Profile ---
  const navNameEl = document.getElementById('dyn-nav-name');
  if (navNameEl) navNameEl.textContent = data.profile.fullName;
  const navSquadEl = document.getElementById('dyn-nav-squad');
  if (navSquadEl) navSquadEl.textContent = data.esports.squadName;
  const nameEl = document.getElementById('dyn-hero-name');
  if (nameEl && data.profile.fullName) nameEl.textContent = data.profile.fullName;

  const taglineEl = document.getElementById('dyn-hero-tagline');
  if (taglineEl && data.profile.roleTagline) taglineEl.textContent = data.profile.roleTagline;

  const eyebrowEl = document.getElementById('dyn-hero-eyebrow');
  if (eyebrowEl && data.profile.eyebrow) eyebrowEl.textContent = data.profile.eyebrow;

  const bioEl = document.getElementById('dyn-hero-bio');
  if (bioEl && data.profile.bio) bioEl.textContent = data.profile.bio;

  const photoEl = document.getElementById('dyn-hero-photo');
  if (photoEl && data.profile.photoUrl) photoEl.src = data.profile.photoUrl;

  // Stats
  const statYears = document.getElementById('dyn-stat-years');
  const statYearsLbl = document.getElementById('dyn-stat-years-lbl');
  setCounterValue(statYears, data.profile.stats.years);
  if (statYearsLbl) statYearsLbl.textContent = data.profile.stats.yearsLabel;

  const statProjects = document.getElementById('dyn-stat-projects');
  const statProjectsLbl = document.getElementById('dyn-stat-projects-lbl');
  setCounterValue(statProjects, data.profile.stats.projects);
  if (statProjectsLbl) statProjectsLbl.textContent = data.profile.stats.projectsLabel;

  const statTrophies = document.getElementById('dyn-stat-trophies');
  const statTrophiesLbl = document.getElementById('dyn-stat-trophies-lbl');
  setCounterValue(statTrophies, data.profile.stats.trophies);
  if (statTrophiesLbl) statTrophiesLbl.textContent = data.profile.stats.trophiesLabel;

  const statSynergy = document.getElementById('dyn-stat-synergy');
  const statSynergyLbl = document.getElementById('dyn-stat-synergy-lbl');
  setCounterValue(statSynergy, data.profile.stats.synergy);
  if (statSynergyLbl) statSynergyLbl.textContent = data.profile.stats.synergyLabel;

  const experienceCaptain = document.getElementById('dyn-experience-captain');
  if (experienceCaptain) experienceCaptain.textContent = data.esports.captainTitle;
  const experienceSquadBio = document.getElementById('dyn-experience-squad-bio');
  if (experienceSquadBio) experienceSquadBio.textContent = data.esports.squadBio;
  const experienceYears = document.getElementById('dyn-experience-years');
  setCounterValue(experienceYears, data.profile.stats.years);
  const experienceYearsLabel = document.getElementById('dyn-experience-years-label');
  if (experienceYearsLabel) experienceYearsLabel.textContent = data.profile.stats.yearsLabel;
  const experienceProjects = document.getElementById('dyn-experience-projects');
  setCounterValue(experienceProjects, data.profile.stats.projects);
  const experienceProjectsLabel = document.getElementById('dyn-experience-projects-label');
  if (experienceProjectsLabel) experienceProjectsLabel.textContent = data.profile.stats.projectsLabel;

  // Socials
  if (data.profile.socials) {
    const socYt = document.getElementById('dyn-social-youtube');
    if (socYt) socYt.href = data.profile.socials.youtube;
    const socDisc = document.getElementById('dyn-social-discord');
    if (socDisc) socDisc.href = data.profile.socials.discord;
    const socGh = document.getElementById('dyn-social-github');
    if (socGh) socGh.href = data.profile.socials.github;
    const socIg = document.getElementById('dyn-social-instagram');
    if (socIg) socIg.href = data.profile.socials.instagram;
    const socTw = document.getElementById('dyn-social-twitter');
    if (socTw) socTw.href = data.profile.socials.twitter;
    const socLi = document.getElementById('dyn-social-linkedin');
    if (socLi) socLi.href = data.profile.socials.linkedin;
    const socFacebook = document.getElementById('dyn-social-facebook');
    if (socFacebook) socFacebook.href = data.profile.socials.facebook;
    const socTikTok = document.getElementById('dyn-social-tiktok');
    if (socTikTok) socTikTok.href = data.profile.socials.tiktok;
  }

  // --- Esports & Team Unique ---
  const squadNameEl = document.getElementById('dyn-squad-name');
  if (squadNameEl) squadNameEl.textContent = data.esports.squadName;

  const captainTitleEl = document.getElementById('dyn-captain-title');
  if (captainTitleEl) captainTitleEl.textContent = data.esports.captainTitle;

  const squadBioEl = document.getElementById('dyn-squad-bio');
  if (squadBioEl) squadBioEl.textContent = data.esports.squadBio;

  const metricTop3 = document.getElementById('dyn-esports-top3');
  setCounterValue(metricTop3, data.esports.metrics.top3Rate);

  const metricKd = document.getElementById('dyn-esports-kd');
  setCounterValue(metricKd, data.esports.metrics.kdRatio);

  const metricTier = document.getElementById('dyn-esports-tier');
  if (metricTier) metricTier.textContent = data.esports.metrics.tier;
  const scrimsWrap = document.getElementById('dyn-esports-scrims-wrap');
  const scrimsValue = document.getElementById('dyn-esports-scrims');
  if (scrimsWrap && scrimsValue) {
    scrimsValue.textContent = data.esports.metrics.scrimsTotal || "";
    scrimsWrap.hidden = !data.esports.metrics.scrimsTotal;
  }

  const milestoneEl = document.getElementById('dyn-esports-milestone');
  if (milestoneEl) milestoneEl.textContent = data.esports.recentMilestone;

  // --- Design Vault Grid ---
  renderDesignGrid(data.designs, data.tools);

  // --- Smart Tools Grid ---
  renderToolsGrid(data.tools);

  // --- Growth Metrics ---
  const gImp = document.getElementById('dyn-growth-impressions');
  setCounterValue(gImp, data.growth.impressions);
  const gViews = document.getElementById('dyn-growth-views');
  setCounterValue(gViews, data.growth.views);
  const gMult = document.getElementById('dyn-growth-multiplier');
  setCounterValue(gMult, data.growth.multiplier);
  const gAssets = document.getElementById('dyn-growth-assets');
  setCounterValue(gAssets, data.growth.assets);
  [
    ["growthImpressionsLabel", data.growth.impressionsLabel],
    ["growthImpressionsDesc", data.growth.impressionsDesc],
    ["growthViewsLabel", data.growth.viewsLabel],
    ["growthViewsDesc", data.growth.viewsDesc],
    ["growthMultiplierLabel", data.growth.multiplierLabel],
    ["growthMultiplierDesc", data.growth.multiplierDesc],
    ["growthAssetsLabel", data.growth.assetsLabel],
    ["growthAssetsDesc", data.growth.assetsDesc]
  ].forEach(([key, value]) => {
    const target = document.querySelector(`[data-site-copy="${key}"]`);
    if (target && value) target.textContent = value;
  });

  // --- Contact Info & Footer ---
  const contEmail = document.getElementById('dyn-contact-email');
  if (contEmail) {
    contEmail.textContent = data.contact.email;
    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) {
      emailLink.href = `mailto:${data.contact.email}?subject=${encodeURIComponent('Portfolio inquiry')}`;
    }
  }
  const contDiv = document.getElementById('dyn-contact-division');
  if (contDiv) contDiv.textContent = data.contact.squadDivision;

  const contLoc = document.getElementById('dyn-contact-location');
  if (contLoc) contLoc.textContent = data.contact.location;
  const whatsappLink = document.getElementById('contact-whatsapp-link');
  if (whatsappLink) whatsappLink.href = data.contact.whatsappUrl || "";

  const footerCopy = document.getElementById('dyn-footer-copy');
  if (footerCopy) footerCopy.textContent = `© 2026 ${data.profile.fullName} • LEADER OF ${data.esports.squadName}. ALL RIGHTS RESERVED.`;
  const footerBrand = document.getElementById('dyn-footer-brand');
  if (footerBrand) footerBrand.textContent = data.profile.fullName;
  const footerStatus = document.getElementById('dyn-footer-status');
  if (footerStatus) footerStatus.textContent = data.contact.statusText || "";

  // Re-run lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
  renderSkillsGrid(data.skills);
}

function getSiteCopy(copy = {}) {
  return Object.assign({}, SITE_COPY_DEFAULTS, copy);
}

function applySiteCopy(copy) {
  const values = getSiteCopy(copy);
  SITE_COPY_GROUPS.forEach(group => group.fields.forEach(field => {
    const targets = document.querySelectorAll(`[data-site-copy="${field.key}"]`);
    targets.forEach(target => {
      if (field.key === "siteTitle") document.title = values[field.key];
      else if (field.key === "siteDescription") target.setAttribute("content", values[field.key]);
      else target.textContent = values[field.key];
    });
  }));
}

function applyAppearance(appearance = {}) {
  const settings = Object.assign({}, window.DEFAULT_PORTFOLIO_DATA?.appearance, appearance);
  const allowedThemes = ["emerald", "cyan", "flare", "purple"];
  const body = document.body;
  body.dataset.theme = allowedThemes.includes(settings.theme) ? settings.theme : "emerald";
  const isColor = value => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
  if (isColor(settings.customAccent)) {
    body.style.setProperty("--neon-emerald", settings.customAccent);
    body.style.setProperty("--neon-mint", settings.customAccent);
  } else {
    body.style.removeProperty("--neon-emerald");
    body.style.removeProperty("--neon-mint");
  }
  if (isColor(settings.background)) body.style.setProperty("--bg-primary", settings.background);
  if (isColor(settings.surface)) body.style.setProperty("--bg-card", settings.surface);
  const fonts = ["Inter", "Orbitron", "Rajdhani", "system"];
  const font = fonts.includes(settings.displayFont) ? settings.displayFont : "Inter";
  body.style.setProperty("--font-display", font === "system" ? "system-ui, sans-serif" : `'${font}', sans-serif`);
  body.style.setProperty("--portfolio-content-width", `${Math.min(1520, Math.max(1040, Number(settings.contentWidth) || 1280))}px`);
  const spacing = {
    compact: "clamp(3rem, 5vw, 5rem)",
    comfortable: "clamp(4.25rem, 8vw, 7.25rem)",
    spacious: "clamp(5rem, 10vw, 9rem)"
  };
  body.style.setProperty("--portfolio-section-padding", spacing[settings.density] || spacing.comfortable);
}

function applyLayout(layout = {}) {
  const sectionSettings = layout.sections || {};
  document.querySelectorAll("[data-site-section]").forEach(section => {
    const key = section.dataset.siteSection;
    const visible = key === "hero" || sectionSettings[key] !== false;
    section.hidden = !visible;
    document.querySelectorAll(`.nav-link[href="#${key}"], .footer-nav a[href="#${key}"]`).forEach(link => {
      link.closest("li")?.toggleAttribute("hidden", !visible);
      if (link.closest("nav")?.classList.contains("footer-nav")) link.hidden = !visible;
    });
  });

  const container = document.querySelector(".app-container");
  if (!container) return;
  const sections = [...container.querySelectorAll(":scope > [data-site-section]")];
  if (sections.length < 2) return;
  const byId = new Map(sections.map(section => [section.dataset.siteSection, section]));
  const order = Array.isArray(layout.sectionOrder) ? layout.sectionOrder : [];
  const ordered = ["hero", ...order.filter(id => id !== "hero")];
  sections.forEach(section => {
    if (!ordered.includes(section.dataset.siteSection)) ordered.push(section.dataset.siteSection);
  });
  ordered.forEach(id => {
    const section = byId.get(id);
    if (section) container.appendChild(section);
  });
}

function renderSkillsGrid(skills = []) {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.replaceChildren();
  skills.forEach(skill => {
    const card = document.createElement("article");
    card.className = "tool-project-card skill-card";
    const header = document.createElement("div");
    header.className = "tool-header";
    const iconBox = document.createElement("div");
    iconBox.className = "tool-icon-box";
    const icon = document.createElement("i");
    icon.dataset.lucide = /^[a-z0-9-]+$/i.test(skill.icon || "") ? skill.icon : "sparkles";
    iconBox.appendChild(icon);
    const badge = document.createElement("span");
    badge.className = "tool-badge";
    badge.textContent = skill.badge || "";
    header.append(iconBox, badge);
    const title = document.createElement("h3");
    title.className = "tool-title";
    title.textContent = skill.title || "";
    const description = document.createElement("p");
    description.className = "tool-desc";
    description.textContent = skill.description || "";
    const tagList = document.createElement("div");
    tagList.className = "tool-tech-stack";
    (skill.tags || []).forEach(label => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = label;
      tagList.appendChild(tag);
    });
    card.append(header, title, description, tagList);
    grid.appendChild(card);
  });
  if (window.lucide) window.lucide.createIcons({ nodes: [...grid.querySelectorAll("[data-lucide]")] });
}

// Render Design Gallery
function renderDesignGrid(designs, tools = []) {
  const container = document.getElementById('design-gallery-grid');
  if (!container || !designs) return;

  container.innerHTML = '';
  const projects = [
    ...designs.map(item => ({ ...item, projectType: 'design' })),
    ...(tools || []).map(tool => ({
      id: tool.id,
      title: tool.title,
      category: 'software',
      tag: tool.badge || 'SOFTWARE PROJECT',
      description: tool.description,
      imageUrl: tool.imageUrl,
      subtext: (tool.tags || []).join(' · ') || 'Software Project',
      icon: tool.icon || 'terminal',
      projectType: 'software'
    }))
  ];

  projects.forEach(item => {
    const card = document.createElement('div');
    card.className = 'design-card';
    card.id = `project-preview-${item.id}`;
    card.dataset.category = item.category || 'all';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Preview project: ${item.title}`);

    const artwork = item.imageUrl
      ? `<img src="${item.imageUrl}" alt="${item.title}" class="design-card-img">`
      : `<div class="project-artwork-icon"><i data-lucide="${item.icon}"></i><span>SOFTWARE PROJECT</span></div>`;
    card.innerHTML = `
        <div class="design-card-img-wrap${item.projectType === 'software' ? ' software-project-artwork' : ''}">
          ${artwork}
          <span class="design-tag-chip">${item.tag || 'WORK'}</span>
        </div>
        <div class="design-card-body">
          <h4 class="design-card-title">${item.title}</h4>
          <p class="design-card-desc">${item.description}</p>
          <div class="design-card-footer">
            <span>${item.subtext || 'Selected Work'}</span>
            <span style="color:var(--neon-emerald)">Inspect →</span>
          </div>
        </div>
      `;

    const openPreview = () => {
      const lightbox = document.getElementById('lightbox-modal');
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxTitle = document.getElementById('lightbox-title');
      const lightboxDesc = document.getElementById('lightbox-desc');
      if (lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
        lightbox.dataset.returnFocusId = card.id;
        lightbox.dataset.previousBodyOverflow = document.body.style.overflow;
        lightboxImg.hidden = !item.imageUrl;
        if (item.imageUrl) lightboxImg.src = item.imageUrl;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.description;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('close-lightbox-btn')?.focus();
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      }
    };

    card.addEventListener('click', openPreview);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPreview();
      }
    });

    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons({ nodes: [...container.querySelectorAll('[data-lucide]')] });
  document.dispatchEvent(new CustomEvent('portfolio:projects-rendered'));
}

// Render Smart Tools Grid
function renderToolsGrid(tools) {
  const container = document.getElementById('tools-container-grid');
  if (!container || !tools) return;

  container.innerHTML = '';
  tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-project-card';

    const tagsHtml = (tool.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-icon-box">
          <i data-lucide="${tool.icon || 'terminal'}"></i>
        </div>
        <span class="tool-badge">${tool.badge || 'SMART TOOL'}</span>
      </div>
      <h3 class="tool-title">${tool.title}</h3>
      <p class="tool-desc">${tool.description}</p>
      <div class="tool-tech-stack">
        ${tagsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function initSiteBuilder() {
  const copyEditor = document.getElementById("admin-site-copy-editor");
  if (!copyEditor) return;
  copyEditor.replaceChildren();
  SITE_COPY_GROUPS.forEach(group => {
    const section = document.createElement("section");
    section.className = "admin-copy-group";
    const heading = document.createElement("h4");
    heading.textContent = group.title;
    section.appendChild(heading);
    const grid = document.createElement("div");
    grid.className = "admin-grid-2";
    group.fields.forEach(field => {
      const wrapper = document.createElement("div");
      wrapper.className = "admin-field";
      const label = document.createElement("label");
      label.className = "admin-label";
      label.htmlFor = `admin-copy-${field.key}`;
      label.textContent = field.label;
      const input = document.createElement(field.multiline ? "textarea" : "input");
      input.id = label.htmlFor;
      input.className = field.multiline ? "admin-textarea" : "admin-input";
      input.dataset.siteCopyInput = field.key;
      if (field.multiline) input.rows = 2;
      else input.type = "text";
      input.maxLength = field.key === "siteDescription" ? 320 : 500;
      input.addEventListener("input", () => applySiteCopy(readSiteCopyFields()));
      wrapper.append(label, input);
      grid.appendChild(wrapper);
    });
    section.appendChild(grid);
    copyEditor.appendChild(section);
  });

  document.querySelectorAll("#admin-theme-preset, #admin-theme-accent, #admin-theme-background, #admin-theme-surface, #admin-display-font, #admin-content-width, #admin-section-density").forEach(input => {
    input.addEventListener("input", () => {
      if (input.id === "admin-theme-accent") input.dataset.customAccentDisabled = "false";
      if (input.id === "admin-content-width") {
        const output = document.getElementById("admin-content-width-value");
        if (output) output.textContent = `${input.value}px`;
      }
      applyAppearance(readAppearanceFields());
    });
    input.addEventListener("change", () => applyAppearance(readAppearanceFields()));
  });

  document.getElementById("admin-theme-accent-reset")?.addEventListener("click", () => {
    const input = document.getElementById("admin-theme-accent");
    if (input) input.dataset.customAccentDisabled = "true";
    applyAppearance(readAppearanceFields());
  });

  initSkillManager();
}

function readSiteCopyFields() {
  const current = getSiteCopy(window.portfolioStore?.get().siteCopy);
  document.querySelectorAll("[data-site-copy-input]").forEach(input => {
    current[input.dataset.siteCopyInput] = input.value;
  });
  return current;
}

function readAppearanceFields() {
  const current = window.portfolioStore?.get().appearance || {};
  const accentInput = document.getElementById("admin-theme-accent");
  return {
    theme: getVal("admin-theme-preset") || current.theme || "emerald",
    customAccent: accentInput?.dataset.customAccentDisabled === "true" ? "" : (accentInput?.value || ""),
    background: document.getElementById("admin-theme-background")?.value || current.background || "#0a100d",
    surface: document.getElementById("admin-theme-surface")?.value || current.surface || "#101916",
    displayFont: getVal("admin-display-font") || current.displayFont || "Inter",
    contentWidth: Number(document.getElementById("admin-content-width")?.value || current.contentWidth || 1280),
    density: getVal("admin-section-density") || current.density || "comfortable"
  };
}

function readLayoutFields() {
  const current = window.portfolioStore?.get().layout || {};
  return siteBuilderLayoutDraft || {
    sectionOrder: [...(current.sectionOrder || SITE_SECTIONS.map(section => section.id))],
    sections: Object.assign({}, current.sections)
  };
}

function populateSiteBuilder(data) {
  const copy = getSiteCopy(data.siteCopy);
  document.querySelectorAll("[data-site-copy-input]").forEach(input => {
    input.value = copy[input.dataset.siteCopyInput] || "";
  });
  applySiteCopy(copy);

  const appearance = Object.assign({}, data.appearance);
  setVal("admin-theme-preset", appearance.theme || "emerald");
  const accentInput = document.getElementById("admin-theme-accent");
  if (accentInput) {
    accentInput.value = /^#[0-9a-f]{6}$/i.test(appearance.customAccent || "") ? appearance.customAccent : "#48d6a0";
    accentInput.dataset.customAccentDisabled = appearance.customAccent ? "false" : "true";
  }
  const background = document.getElementById("admin-theme-background");
  if (background) background.value = /^#[0-9a-f]{6}$/i.test(appearance.background || "") ? appearance.background : "#0a100d";
  const surface = document.getElementById("admin-theme-surface");
  if (surface) surface.value = /^#[0-9a-f]{6}$/i.test(appearance.surface || "") ? appearance.surface : "#101916";
  setVal("admin-display-font", appearance.displayFont || "Inter");
  setVal("admin-content-width", appearance.contentWidth || 1280);
  setVal("admin-section-density", appearance.density || "comfortable");
  const widthOutput = document.getElementById("admin-content-width-value");
  if (widthOutput) widthOutput.textContent = `${appearance.contentWidth || 1280}px`;

  siteBuilderLayoutDraft = {
    sectionOrder: [...(data.layout.sectionOrder || SITE_SECTIONS.map(section => section.id))],
    sections: Object.assign({}, data.layout.sections)
  };
  renderSectionOrderControls();
  populateSkillItemsList(data.skills);
}

function renderSectionOrderControls() {
  const list = document.getElementById("admin-section-order-list");
  if (!list || !siteBuilderLayoutDraft) return;
  list.replaceChildren();
  const ordered = [...siteBuilderLayoutDraft.sectionOrder];
  SITE_SECTIONS.forEach(section => {
    if (!ordered.includes(section.id)) ordered.push(section.id);
  });
  siteBuilderLayoutDraft.sectionOrder = ordered;
  ordered.forEach((id, index) => {
    const section = SITE_SECTIONS.find(item => item.id === id);
    if (!section) return;
    const row = document.createElement("div");
    row.className = "admin-section-order-row";
    const label = document.createElement("label");
    label.className = "admin-section-visibility";
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = siteBuilderLayoutDraft.sections[id] !== false;
    toggle.addEventListener("change", () => {
      siteBuilderLayoutDraft.sections[id] = toggle.checked;
      applyLayout(siteBuilderLayoutDraft);
    });
    const labelText = document.createElement("span");
    labelText.textContent = section.label;
    label.append(toggle, labelText);
    const actions = document.createElement("div");
    actions.className = "admin-order-actions";
    [["↑", "Move up", -1], ["↓", "Move down", 1]].forEach(([text, accessibleName, direction]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "admin-btn-action";
      button.textContent = text;
      button.setAttribute("aria-label", `${accessibleName}: ${section.label}`);
      button.disabled = index + direction < 0 || index + direction >= ordered.length;
      button.addEventListener("click", () => {
        const target = index + direction;
        [siteBuilderLayoutDraft.sectionOrder[index], siteBuilderLayoutDraft.sectionOrder[target]] =
          [siteBuilderLayoutDraft.sectionOrder[target], siteBuilderLayoutDraft.sectionOrder[index]];
        applyLayout(siteBuilderLayoutDraft);
        renderSectionOrderControls();
      });
      actions.appendChild(button);
    });
    row.append(label, actions);
    list.appendChild(row);
  });
}

function initSkillManager() {
  const saveButton = document.getElementById("admin-save-skill-btn");
  const cancelButton = document.getElementById("admin-cancel-skill-btn");
  if (!saveButton) return;
  const reset = () => {
    editingSkillId = null;
    setVal("admin-skill-badge", "");
    setVal("admin-skill-title", "");
    setVal("admin-skill-icon", "");
    setVal("admin-skill-description", "");
    setVal("admin-skill-tags", "");
    saveButton.querySelector("span").textContent = "Add Skill Card";
    cancelButton.hidden = true;
  };
  saveButton.addEventListener("click", async () => {
    const title = getVal("admin-skill-title");
    if (!title) {
      showToast("ADD A TITLE FOR THE SKILL CARD.");
      document.getElementById("admin-skill-title")?.focus();
      return;
    }
    const data = window.portfolioStore.get();
    const skill = {
      id: editingSkillId || `skill-${Date.now()}`,
      badge: getVal("admin-skill-badge"),
      title,
      icon: getVal("admin-skill-icon") || "sparkles",
      description: getVal("admin-skill-description"),
      tags: getVal("admin-skill-tags").split(/\r?\n/).map(tag => tag.trim()).filter(Boolean)
    };
    data.skills = Array.isArray(data.skills) ? data.skills : [];
    const existingIndex = data.skills.findIndex(item => item.id === editingSkillId);
    if (existingIndex >= 0) data.skills[existingIndex] = skill;
    else data.skills.push(skill);
    const result = await window.portfolioStore.save(data);
    reset();
    showToast(result.savedToServer ? "SKILL CARD PUBLISHED." : "SKILL CARD SAVED IN THIS BROWSER.");
  });
  cancelButton?.addEventListener("click", reset);
}

function populateSkillItemsList(skills = []) {
  const list = document.getElementById("admin-skill-items-list");
  if (!list) return;
  list.replaceChildren();
  skills.forEach((skill, index) => {
    const row = document.createElement("div");
    row.className = "admin-managed-item";
    const info = document.createElement("div");
    info.className = "admin-managed-item-info";
    const title = document.createElement("strong");
    title.textContent = skill.title || "Untitled skill";
    const meta = document.createElement("span");
    meta.textContent = `${skill.badge || "SKILL"} · ${(skill.tags || []).length} tags`;
    info.append(title, meta);
    const actions = document.createElement("div");
    actions.className = "admin-order-actions";
    const addAction = (label, titleText, handler, extraClass = "") => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `admin-btn-action ${extraClass}`;
      button.textContent = label;
      button.setAttribute("aria-label", `${titleText}: ${skill.title}`);
      button.addEventListener("click", handler);
      actions.appendChild(button);
      return button;
    };
    addAction("↑", "Move up", () => moveSkill(index, -1), "").disabled = index === 0;
    addAction("↓", "Move down", () => moveSkill(index, 1), "").disabled = index === skills.length - 1;
    addAction("Edit", "Edit", () => {
      editingSkillId = skill.id;
      setVal("admin-skill-badge", skill.badge);
      setVal("admin-skill-title", skill.title);
      setVal("admin-skill-icon", skill.icon);
      setVal("admin-skill-description", skill.description);
      setVal("admin-skill-tags", (skill.tags || []).join("\n"));
      document.querySelector("#admin-save-skill-btn span").textContent = "Save Skill Changes";
      document.getElementById("admin-cancel-skill-btn").hidden = false;
      document.getElementById("admin-skill-title").focus();
    });
    addAction("Delete", "Delete", async () => {
      if (!confirm(`Delete the "${skill.title}" skill card?`)) return;
      const data = window.portfolioStore.get();
      data.skills = data.skills.filter(item => item.id !== skill.id);
      const result = await window.portfolioStore.save(data);
      showToast(result.savedToServer ? "SKILL CARD DELETED." : "SKILL CARD DELETED IN THIS BROWSER.");
    }, "delete");
    row.append(info, actions);
    list.appendChild(row);
  });
}

async function moveSkill(index, direction) {
  const data = window.portfolioStore.get();
  const next = index + direction;
  if (next < 0 || next >= data.skills.length) return;
  [data.skills[index], data.skills[next]] = [data.skills[next], data.skills[index]];
  await window.portfolioStore.save(data);
}

// ==========================================================================
// ADMIN DASHBOARD CONTROLLER & LOGIC
// ==========================================================================
function initAdminDashboard() {
  const triggerBtn = document.getElementById('admin-floating-trigger');
  const modal = document.getElementById('admin-modal');
  const closeBtn = document.getElementById('admin-close-btn');
  const authBox = document.getElementById('admin-auth-box');
  const mainDash = document.getElementById('admin-main-dash');
  const pinInput = document.getElementById('admin-pin-input');
  const unlockBtn = document.getElementById('admin-unlock-btn');
  const saveAllBtn = document.getElementById('admin-save-all-btn');

  // Keyboard shortcut Ctrl + Shift + A to open Admin
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openAdminModal);
  }

  function openAdminModal() {
    if (!modal) return;
    modal.classList.add('active');
    if (window.portfolioStore && window.portfolioStore.isAuthenticated()) {
      if (authBox) authBox.style.display = 'none';
      if (mainDash) mainDash.style.display = 'flex';
      populateAdminForms();
    } else {
      if (authBox) authBox.style.display = 'flex';
      if (mainDash) mainDash.style.display = 'none';
      if (pinInput) { pinInput.value = ''; pinInput.focus(); }
    }
    if (window.cyberAudio) window.cyberAudio.playSuccess();
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Pin Unlock handler
  if (unlockBtn && pinInput) {
    unlockBtn.addEventListener('click', async () => {
      const pin = pinInput.value.trim();
      unlockBtn.disabled = true;
      try {
        await window.portfolioStore.login(pin);
        if (authBox) authBox.style.display = 'none';
        if (mainDash) mainDash.style.display = 'flex';
        populateAdminForms();
        showToast("ADMIN ACCESS GRANTED // WELCOME SHAKIB");
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      } catch (error) {
        alert(error.message || "Admin sign-in failed. Check the passcode and server configuration.");
        pinInput.value = '';
        pinInput.focus();
      } finally {
        unlockBtn.disabled = false;
      }
    });

    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') unlockBtn.click();
    });
  }

  // Tab Navigation
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const viewPanels = document.querySelectorAll('.admin-view-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(`view-${btn.dataset.tab}`);
      if (target) target.classList.add('active');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  // Save All Changes Button
  if (saveAllBtn) {
    saveAllBtn.addEventListener('click', async () => {
      saveAllBtn.disabled = true;
      try {
        const result = await saveAllFormData();
        showToast(result && result.savedToServer
          ? "CHANGES SAVED AND PUBLISHED!"
          : "SAVED IN THIS BROWSER; SERVER SYNC UNAVAILABLE.");
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      } catch (error) {
        console.error("Portfolio publish failed:", error);
        showToast("COULD NOT SAVE PORTFOLIO CHANGES.");
      } finally {
        saveAllBtn.disabled = false;
      }
    });
  }

  // Profile Image File Upload Handler (Converts to Base64)
  const photoFile = document.getElementById('admin-photo-file');
  const photoUrlInput = document.getElementById('admin-photo-url');
  const photoPreview = document.getElementById('admin-photo-preview');

  if (photoFile) {
    photoFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (photoUrlInput) photoUrlInput.value = re.target.result;
          if (photoPreview) photoPreview.src = re.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (photoUrlInput && photoPreview) {
    photoUrlInput.addEventListener('input', () => {
      photoPreview.src = photoUrlInput.value || 'profile-current.png';
    });
  }

  // Design Items Manager Handlers
  initDesignManager();

  // Tools Items Manager Handlers
  initToolsManager();

  // Settings & Backup Handlers
  initSettingsManager();
}

// Populate all form fields with current data
function populateAdminForms() {
  if (!window.portfolioStore) return;
  const data = window.portfolioStore.get();

  // Hero & Profile Form
  setVal('admin-fullname', data.profile.fullName);
  setVal('admin-tagline', data.profile.roleTagline);
  setVal('admin-eyebrow', data.profile.eyebrow);
  setVal('admin-bio', data.profile.bio);
  setVal('admin-photo-url', data.profile.photoUrl);
  const photoPrev = document.getElementById('admin-photo-preview');
  if (photoPrev) photoPrev.src = data.profile.photoUrl || 'profile-current.png';

  // Stats
  setVal('admin-stat-years', data.profile.stats.years);
  setVal('admin-stat-years-lbl', data.profile.stats.yearsLabel);
  setVal('admin-stat-projects', data.profile.stats.projects);
  setVal('admin-stat-projects-lbl', data.profile.stats.projectsLabel);
  setVal('admin-stat-trophies', data.profile.stats.trophies);
  setVal('admin-stat-trophies-lbl', data.profile.stats.trophiesLabel);
  setVal('admin-stat-synergy', data.profile.stats.synergy);
  setVal('admin-stat-synergy-lbl', data.profile.stats.synergyLabel);

  // Socials
  setVal('admin-soc-youtube', data.profile.socials.youtube);
  setVal('admin-soc-discord', data.profile.socials.discord);
  setVal('admin-soc-github', data.profile.socials.github);
  setVal('admin-soc-instagram', data.profile.socials.instagram);
  setVal('admin-soc-twitter', data.profile.socials.twitter);
  setVal('admin-soc-linkedin', data.profile.socials.linkedin);
  setVal('admin-soc-facebook', data.profile.socials.facebook);
  setVal('admin-soc-tiktok', data.profile.socials.tiktok);

  // Esports & Squad
  setVal('admin-squad-name', data.esports.squadName);
  setVal('admin-captain-title', data.esports.captainTitle);
  setVal('admin-squad-bio', data.esports.squadBio);
  setVal('admin-top3-rate', data.esports.metrics.top3Rate);
  setVal('admin-kd-ratio', data.esports.metrics.kdRatio);
  setVal('admin-tier', data.esports.metrics.tier);
  setVal('admin-scrims-total', data.esports.metrics.scrimsTotal);
  setVal('admin-milestone', data.esports.recentMilestone);

  // Growth Metrics
  setVal('admin-growth-imp', data.growth.impressions);
  setVal('admin-growth-views', data.growth.views);
  setVal('admin-growth-mult', data.growth.multiplier);
  setVal('admin-growth-assets', data.growth.assets);

  // Contact Info
  setVal('admin-cont-email', data.contact.email);
  setVal('admin-cont-div', data.contact.squadDivision);
  setVal('admin-cont-loc', data.contact.location);
  setVal('admin-cont-whatsapp', data.contact.whatsappUrl);
  setVal('admin-growth-imp-lbl', data.growth.impressionsLabel);
  setVal('admin-growth-imp-desc', data.growth.impressionsDesc);
  setVal('admin-growth-views-lbl', data.growth.viewsLabel);
  setVal('admin-growth-views-desc', data.growth.viewsDesc);
  setVal('admin-growth-mult-lbl', data.growth.multiplierLabel);
  setVal('admin-growth-mult-desc', data.growth.multiplierDesc);
  setVal('admin-growth-assets-lbl', data.growth.assetsLabel);
  setVal('admin-growth-assets-desc', data.growth.assetsDesc);

  populateSiteBuilder(data);

  // Render Design Items List in Admin
  populateDesignItemsList(data.designs);

  // Render Tools Items List in Admin
  populateToolsItemsList(data.tools);

  // Render Inbox Messages
  populateInboxMessages(data.messages);

  // Update Messages Badge
  const msgBadge = document.getElementById('admin-inbox-badge');
  if (msgBadge) msgBadge.textContent = (data.messages || []).length;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val !== undefined ? val : '';
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// Collect form data and commit to store
function saveAllFormData() {
  if (!window.portfolioStore) return;
  const data = window.portfolioStore.get();

  data.profile.fullName = getVal('admin-fullname') || data.profile.fullName;
  data.profile.roleTagline = getVal('admin-tagline') || data.profile.roleTagline;
  data.profile.eyebrow = getVal('admin-eyebrow') || data.profile.eyebrow;
  data.profile.bio = getVal('admin-bio') || data.profile.bio;
  data.profile.photoUrl = getVal('admin-photo-url') || data.profile.photoUrl;

  data.profile.stats.years = getVal('admin-stat-years');
  data.profile.stats.yearsLabel = getVal('admin-stat-years-lbl');
  data.profile.stats.projects = getVal('admin-stat-projects');
  data.profile.stats.projectsLabel = getVal('admin-stat-projects-lbl');
  data.profile.stats.trophies = getVal('admin-stat-trophies');
  data.profile.stats.trophiesLabel = getVal('admin-stat-trophies-lbl');
  data.profile.stats.synergy = getVal('admin-stat-synergy');
  data.profile.stats.synergyLabel = getVal('admin-stat-synergy-lbl');

  data.profile.socials.youtube = getVal('admin-soc-youtube');
  data.profile.socials.discord = getVal('admin-soc-discord');
  data.profile.socials.github = getVal('admin-soc-github');
  data.profile.socials.instagram = getVal('admin-soc-instagram');
  data.profile.socials.twitter = getVal('admin-soc-twitter');
  data.profile.socials.linkedin = getVal('admin-soc-linkedin');
  data.profile.socials.facebook = getVal('admin-soc-facebook');
  data.profile.socials.tiktok = getVal('admin-soc-tiktok');

  data.esports.squadName = getVal('admin-squad-name');
  data.esports.captainTitle = getVal('admin-captain-title');
  data.esports.squadBio = getVal('admin-squad-bio');
  data.esports.metrics.top3Rate = getVal('admin-top3-rate');
  data.esports.metrics.kdRatio = getVal('admin-kd-ratio');
  data.esports.metrics.tier = getVal('admin-tier');
  data.esports.metrics.scrimsTotal = getVal('admin-scrims-total');
  data.esports.recentMilestone = getVal('admin-milestone');

  data.growth.impressions = getVal('admin-growth-imp');
  data.growth.impressionsLabel = getVal('admin-growth-imp-lbl');
  data.growth.impressionsDesc = getVal('admin-growth-imp-desc');
  data.growth.views = getVal('admin-growth-views');
  data.growth.viewsLabel = getVal('admin-growth-views-lbl');
  data.growth.viewsDesc = getVal('admin-growth-views-desc');
  data.growth.multiplier = getVal('admin-growth-mult');
  data.growth.multiplierLabel = getVal('admin-growth-mult-lbl');
  data.growth.multiplierDesc = getVal('admin-growth-mult-desc');
  data.growth.assets = getVal('admin-growth-assets');
  data.growth.assetsLabel = getVal('admin-growth-assets-lbl');
  data.growth.assetsDesc = getVal('admin-growth-assets-desc');

  data.contact.email = getVal('admin-cont-email');
  data.contact.squadDivision = getVal('admin-cont-div');
  data.contact.location = getVal('admin-cont-loc');
  data.contact.whatsappUrl = getVal('admin-cont-whatsapp');
  data.contact.statusText = getVal('admin-cont-status');

  data.siteCopy = readSiteCopyFields();
  data.appearance = readAppearanceFields();
  data.layout = readLayoutFields();

  return window.portfolioStore.save(data);
}

async function compressPortfolioImage(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image files must be 10 MB or smaller.");
  }
  if (typeof createImageBitmap !== "function") {
    throw new Error("This browser cannot process image uploads. Try a recent browser.");
  }

  const bitmap = await createImageBitmap(file);
  try {
    const maxDimension = 1600;
    let scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare the image for upload.");

    let result = "";
    while (scale >= 0.4) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      result = canvas.toDataURL("image/webp", 0.82);
      if (result.length <= 1_000_000) return result;
      scale *= 0.8;
    }
    throw new Error("This image is still too large after optimization. Choose a smaller image.");
  } finally {
    bitmap.close();
  }
}

function initPortfolioImageUpload(fileId, urlId, previewId, statusId, saveButtonId) {
  const fileInput = document.getElementById(fileId);
  const urlInput = document.getElementById(urlId);
  const preview = document.getElementById(previewId);
  const status = document.getElementById(statusId);
  const saveButton = document.getElementById(saveButtonId);
  if (!fileInput || !urlInput || !preview || !status || !saveButton) return () => {};

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    saveButton.disabled = true;
    status.textContent = "Optimizing image…";
    status.classList.remove("is-error");
    try {
      const imageData = await compressPortfolioImage(file);
      urlInput.value = imageData;
      preview.src = imageData;
      preview.hidden = false;
      status.textContent = "Image ready. It will be saved with this project.";
    } catch (error) {
      fileInput.value = "";
      status.textContent = error.message || "Could not process this image.";
      status.classList.add("is-error");
    } finally {
      saveButton.disabled = false;
    }
  });

  urlInput.addEventListener("input", () => {
    const imageUrl = urlInput.value.trim();
    preview.hidden = !imageUrl;
    if (imageUrl) preview.src = imageUrl;
    status.textContent = "";
    status.classList.remove("is-error");
  });

  return () => {
    fileInput.value = "";
    urlInput.value = "";
    preview.removeAttribute("src");
    preview.hidden = true;
    status.textContent = "";
    status.classList.remove("is-error");
  };
}

// Design Manager (CRUD)
function initDesignManager() {
  const addBtn = document.getElementById('admin-add-design-btn');
  const cancelBtn = document.getElementById('admin-cancel-design-edit-btn');
  const heading = document.getElementById('admin-design-form-heading');
  if (!addBtn) return;

  const resetImageUpload = initPortfolioImageUpload(
    'admin-new-design-file',
    'admin-new-design-img',
    'admin-new-design-preview',
    'admin-new-design-upload-status',
    'admin-add-design-btn'
  );
  let editingId = null;
  const resetForm = () => {
    editingId = null;
    setVal('admin-new-design-title', '');
    setVal('admin-new-design-cat', 'branding');
    setVal('admin-new-design-tag', '');
    resetImageUpload();
    setVal('admin-new-design-subtext', '');
    setVal('admin-new-design-desc', '');
    addBtn.querySelector('span').textContent = 'Add Project to Live Portfolio';
    if (heading) heading.textContent = 'ADD NEW PROJECT';
    if (cancelBtn) cancelBtn.style.display = 'none';
  };

  addBtn.addEventListener('click', () => {
    const title = getVal('admin-new-design-title');
    const cat = getVal('admin-new-design-cat') || 'branding';
    const tag = getVal('admin-new-design-tag') || 'DESIGN';
    const imgUrl = getVal('admin-new-design-img');
    const subtext = getVal('admin-new-design-subtext') || 'Selected Work';
    const desc = getVal('admin-new-design-desc');

    if (!title || !desc) {
      alert("Please provide at least a title and description for the new design project.");
      return;
    }

    const data = window.portfolioStore.get();
    if (editingId) {
      const design = data.designs.find(item => item.id === editingId);
      if (!design) {
        alert("This project no longer exists. Refresh the dashboard and try again.");
        resetForm();
        return;
      }
      Object.assign(design, { title, category: cat, tag, imageUrl: imgUrl, description: desc, subtext });
    } else {
      data.designs.unshift({
        id: "des-" + Date.now(),
        title,
        category: cat,
        tag,
        imageUrl: imgUrl,
        description: desc,
        subtext
      });
    }

    window.portfolioStore.save(data);
    showToast(editingId ? "PROJECT UPDATED!" : "NEW PROJECT ADDED TO PORTFOLIO!");
    resetForm();
  });

  if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

  window.editPortfolioDesign = (id) => {
    const design = window.portfolioStore.get().designs.find(item => item.id === id);
    if (!design) return;
    editingId = id;
    setVal('admin-new-design-title', design.title);
    setVal('admin-new-design-cat', design.category);
    setVal('admin-new-design-tag', design.tag);
    setVal('admin-new-design-img', design.imageUrl);
    setVal('admin-new-design-subtext', design.subtext);
    setVal('admin-new-design-desc', design.description);
    document.getElementById('admin-new-design-img')?.dispatchEvent(new Event('input'));
    addBtn.querySelector('span').textContent = 'Save Project Changes';
    if (heading) heading.textContent = 'EDIT PROJECT';
    if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    document.querySelector('[data-tab="designs"]').click();
  };
}

function populateDesignItemsList(designs) {
  const list = document.getElementById('admin-design-items-list');
  if (!list || !designs) return;

  list.innerHTML = '';
  designs.forEach((des, idx) => {
    const row = document.createElement('div');
    row.className = 'admin-item-card';
    row.innerHTML = `
      <div class="admin-item-info">
        ${des.imageUrl ? `<img src="${des.imageUrl}" class="admin-item-thumb" alt="">` : ''}
        <div>
          <div class="admin-item-title">${des.title}</div>
          <div class="admin-item-sub">[${des.category.toUpperCase()}] • ${des.tag}</div>
        </div>
      </div>
      <div class="admin-btn-group">
        <button class="admin-btn-action edit" type="button">
          <i data-lucide="pencil" style="width:14px;height:14px;"></i>
          <span>Edit</span>
        </button>
        <button class="admin-btn-action delete" data-id="${des.id}">
          <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          <span>Delete</span>
        </button>
      </div>
    `;

    row.querySelector('.edit').addEventListener('click', () => window.editPortfolioDesign(des.id));
    row.querySelector('.delete').addEventListener('click', () => {
      if (confirm(`Remove "${des.title}" from portfolio?`)) {
        const data = window.portfolioStore.get();
        data.designs = data.designs.filter(d => d.id !== des.id);
        window.portfolioStore.save(data);
        showToast("DESIGN PROJECT REMOVED");
      }
    });

    list.appendChild(row);
  });
}

// Tools Manager (CRUD)
function initToolsManager() {
  const addBtn = document.getElementById('admin-add-tool-btn');
  const cancelBtn = document.getElementById('admin-cancel-tool-edit-btn');
  const heading = document.getElementById('admin-tool-form-heading');
  if (!addBtn) return;

  const resetImageUpload = initPortfolioImageUpload(
    'admin-new-tool-file',
    'admin-new-tool-img',
    'admin-new-tool-preview',
    'admin-new-tool-upload-status',
    'admin-add-tool-btn'
  );
  let editingId = null;
  const resetForm = () => {
    editingId = null;
    setVal('admin-new-tool-title', '');
    setVal('admin-new-tool-badge', '');
    setVal('admin-new-tool-desc', '');
    setVal('admin-new-tool-tags', '');
    resetImageUpload();
    addBtn.querySelector('span').textContent = 'Add Tool to Live Portfolio';
    if (heading) heading.textContent = 'ADD NEW DIGITAL TOOL';
    if (cancelBtn) cancelBtn.style.display = 'none';
  };

  addBtn.addEventListener('click', () => {
    const title = getVal('admin-new-tool-title');
    const badge = getVal('admin-new-tool-badge') || 'SMART TOOL';
    const desc = getVal('admin-new-tool-desc');
    const tagsRaw = getVal('admin-new-tool-tags') || 'JavaScript, Tools';
    const imageUrl = getVal('admin-new-tool-img');

    if (!title || !desc) {
      alert("Please provide at least a title and description for the new tool.");
      return;
    }

    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
    const data = window.portfolioStore.get();
    if (editingId) {
      const tool = data.tools.find(item => item.id === editingId);
      if (!tool) {
        alert("This project no longer exists. Refresh the dashboard and try again.");
        resetForm();
        return;
      }
      Object.assign(tool, { title, badge, description: desc, tags, imageUrl });
    } else {
      data.tools.unshift({
        id: "tool-" + Date.now(),
        title,
        badge,
        icon: "terminal",
        description: desc,
        tags,
        imageUrl
      });
    }

    window.portfolioStore.save(data);
    showToast(editingId ? "PROJECT UPDATED!" : "NEW DIGITAL TOOL ADDED TO PORTFOLIO!");
    resetForm();
  });

  if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

  window.editPortfolioTool = (id) => {
    const tool = window.portfolioStore.get().tools.find(item => item.id === id);
    if (!tool) return;
    editingId = id;
    setVal('admin-new-tool-title', tool.title);
    setVal('admin-new-tool-badge', tool.badge);
    setVal('admin-new-tool-desc', tool.description);
    setVal('admin-new-tool-tags', (tool.tags || []).join(', '));
    setVal('admin-new-tool-img', tool.imageUrl);
    document.getElementById('admin-new-tool-img')?.dispatchEvent(new Event('input'));
    addBtn.querySelector('span').textContent = 'Save Project Changes';
    if (heading) heading.textContent = 'EDIT DIGITAL TOOL / PROJECT';
    if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    document.querySelector('[data-tab="tools"]').click();
  };
}

function populateToolsItemsList(tools) {
  const list = document.getElementById('admin-tool-items-list');
  if (!list || !tools) return;

  list.innerHTML = '';
  tools.forEach(tool => {
    const row = document.createElement('div');
    row.className = 'admin-item-card';
    row.innerHTML = `
      <div class="admin-item-info">
        ${tool.imageUrl ? `<img src="${tool.imageUrl}" class="admin-item-thumb" alt="">` : ''}
        <div>
          <div class="admin-item-title">${tool.title}</div>
          <div class="admin-item-sub">${tool.badge} • ${(tool.tags || []).join(', ')}</div>
        </div>
      </div>
      <div class="admin-btn-group">
        <button class="admin-btn-action edit" type="button">
          <i data-lucide="pencil" style="width:14px;height:14px;"></i>
          <span>Edit</span>
        </button>
        <button class="admin-btn-action delete" data-id="${tool.id}">
          <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          <span>Delete</span>
        </button>
      </div>
    `;

    row.querySelector('.edit').addEventListener('click', () => window.editPortfolioTool(tool.id));
    row.querySelector('.delete').addEventListener('click', () => {
      if (confirm(`Remove "${tool.title}"?`)) {
        const data = window.portfolioStore.get();
        data.tools = data.tools.filter(t => t.id !== tool.id);
        window.portfolioStore.save(data);
        showToast("TOOL REMOVED");
      }
    });

    list.appendChild(row);
  });
}

// Inbox Messages Viewer
function populateInboxMessages(messages) {
  const container = document.getElementById('admin-inbox-list');
  if (!container) return;

  if (!messages || messages.length === 0) {
    container.innerHTML = `<div style="color:var(--text-dim);font-family:var(--font-mono);padding:1.5rem;text-align:center;">No transmission messages received yet.</div>`;
    return;
  }

  container.innerHTML = '';
  messages.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'admin-item-card';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'flex-start';
    card.style.gap = '0.75rem';

    card.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
        <div>
          <strong style="color:#fff;font-family:var(--font-display);">${msg.name}</strong> 
          <span style="color:var(--neon-emerald);font-size:0.8rem;margin-left:0.5rem;">&lt;${msg.email}&gt;</span>
        </div>
        <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-dim);">${msg.date || ''}</span>
      </div>
      <div style="font-size:0.88rem;color:var(--neon-cyan);font-family:var(--font-accent);font-weight:700;">
        MISSION: ${msg.subject || 'General Transmission'}
      </div>
      <div style="font-size:0.85rem;color:var(--text-muted);line-height:1.6;background:rgba(0,0,0,0.3);padding:0.75rem;border-radius:8px;width:100%;">
        ${msg.message}
      </div>
      <div style="align-self:flex-end;">
        <button class="admin-btn-action delete">
          <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          <span>Delete Message</span>
        </button>
      </div>
    `;

    card.querySelector('.delete').addEventListener('click', () => {
      window.portfolioStore.deleteMessage(msg.id);
      showToast("TRANSMISSION DELETED FROM INBOX");
    });

    container.appendChild(card);
  });
}

// Settings & Backup Manager
function initSettingsManager() {
  const exportBtn = document.getElementById('admin-export-json-btn');
  const importBtn = document.getElementById('admin-import-json-btn');
  const resetBtn = document.getElementById('admin-reset-defaults-btn');
  const logoutBtn = document.getElementById('admin-logout-btn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const json = window.portfolioStore.exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shakib-portfolio-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("BACKUP EXPORTED AS JSON FILE!");
    });
  }

  if (importBtn) {
    importBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            if (window.portfolioStore.importJSON(re.target.result)) {
              showToast("BACKUP RESTORED SUCCESSFULLY!");
            } else {
              alert("Failed to parse backup JSON file.");
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("WARNING: This will reset all information back to original default setup. Proceed?")) {
        window.portfolioStore.reset();
        showToast("RESTORED TO ORIGINAL DEFAULTS");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.portfolioStore.logout();
      const modal = document.getElementById('admin-modal');
      if (modal) modal.classList.remove('active');
      showToast("LOGGED OUT OF ADMIN MODE");
    });
  }
}

// Toast notification helper
function showToast(msg) {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <i data-lucide="check-circle" style="color:var(--neon-emerald);width:18px;height:18px;"></i>
    <span>${msg}</span>
  `;
  if (window.lucide) window.lucide.createIcons();
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
