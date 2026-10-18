// ==========================================================================
// MD SHAKIB FARAZI - MAIN APPLICATION LOGIC & INTERACTIVE SYSTEMS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Init Audio system triggers on first interaction
  const audioToggle = document.getElementById('audio-toggle-btn');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const isMuted = !window.cyberAudio.enabled;
      const state = window.cyberAudio.toggleSound();
      audioToggle.classList.toggle('active', state);
      const textSpan = audioToggle.querySelector('.audio-status-text');
      if (textSpan) textSpan.textContent = state ? 'SFX: ON' : 'SFX: OFF';
    });
  }

  // Play hover sounds on interactive elements
  document.querySelectorAll('a, button, .design-card, .metric-box, .tool-project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.cyberAudio) window.cyberAudio.playHover();
    });
    el.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  // 1. 3D Tilt Effect on Portrait Card
  initPortraitTilt();

  // 1.5 Cycle through the editable role tagline
  initRoleTaglineAnimation();

  // 2. Interactive Hacker Terminal Modal & CLI
  initTerminalCLI();

  // 3. Projects & Design Vault Filter & Lightbox
  initDesignGallery();

  // 4. Email contact form
  initContactForm();

  // 5. Responsible local portfolio chat
  initAIChat();

  // 6. Arsenal Controls & Theme Switcher
  initArsenalUI();

  // 7. Mobile Menu Navigation
  initMobileMenu();

  // 8. Keep navigation in sync with the visible section
  initSectionNavigation();

  // 9. Animate hero stats when they enter the viewport
  initStatCounters();

});

function initRoleTaglineAnimation() {
  const tagline = document.getElementById('dyn-hero-tagline');
  if (!tagline) return;

  let animationTimer;
  let currentSource = '';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setRoleTagline = (source) => {
    const normalizedSource = typeof source === 'string' ? source.trim() : '';
    if (!normalizedSource || normalizedSource === currentSource) return;
    currentSource = normalizedSource;
    window.clearTimeout(animationTimer);

    const roles = normalizedSource.split(/\s*\|\s*/).filter(Boolean);
    tagline.setAttribute('aria-label', roles.join('. '));

    if (roles.length < 2 || reducedMotion.matches) {
      tagline.textContent = roles.join(' | ');
      tagline.classList.remove('is-typing');
      return;
    }

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    tagline.classList.add('is-typing');

    const animateNextCharacter = () => {
      const role = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      tagline.textContent = role.slice(0, characterIndex);

      let delay = deleting ? 28 : 55;
      if (!deleting && characterIndex === role.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }

      animationTimer = window.setTimeout(animateNextCharacter, delay);
    };

    tagline.textContent = '';
    animationTimer = window.setTimeout(animateNextCharacter, 450);
  };

  setRoleTagline(window.portfolioStore?.get().profile.roleTagline || tagline.textContent);
  window.portfolioStore?.subscribe((data) => setRoleTagline(data.profile.roleTagline));
  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      window.clearTimeout(animationTimer);
      tagline.textContent = currentSource.split(/\s*\|\s*/).filter(Boolean).join(' | ');
      tagline.classList.remove('is-typing');
    } else {
      const previousSource = currentSource;
      currentSource = '';
      setRoleTagline(previousSource);
    }
  });
}

// --- NUMBER COUNTERS ---
function initStatCounters() {
  const counters = [...document.querySelectorAll(
    '.stat-value, .metric-box-val, .growth-stat-value, .calc-result-value'
  )];
  if (counters.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = 1400;
  const animationFrames = new WeakMap();

  function getCounterValue(counter, value) {
    const match = value.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);

    if (!match) return null;

    return {
      prefix: match[1],
      suffix: match[3],
      target: Number(match[2].replace(/,/g, '')),
      decimals: (match[2].split('.')[1] || '').length
    };
  }

  function formatCounter(value, counterValue) {
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: counterValue.decimals,
      maximumFractionDigits: counterValue.decimals
    });
    return `${counterValue.prefix}${formatted}${counterValue.suffix}`;
  }

  function animateCounter(counter, value, fromZero) {
    const target = String(value).trim();
    const targetValue = getCounterValue(counter, target);
    if (!targetValue) {
      counter.textContent = target;
      delete counter.dataset.counterTarget;
      return;
    }

    const existingFrame = animationFrames.get(counter);
    if (existingFrame) cancelAnimationFrame(existingFrame);
    counter.dataset.counterTarget = target;

    const currentValue = getCounterValue(counter, counter.textContent.trim());
    const startValue = fromZero || !currentValue ? 0 : currentValue.target;
    if (reducedMotion || startValue === targetValue.target) {
      counter.textContent = formatCounter(targetValue.target, targetValue);
      return;
    }

    const startTime = performance.now();
    counter.textContent = formatCounter(startValue, targetValue);

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const currentValue = startValue + (targetValue.target - startValue) * easedProgress;
      counter.textContent = formatCounter(currentValue, targetValue);

      if (progress < 1) {
        animationFrames.set(counter, requestAnimationFrame(updateCounter));
      } else {
        animationFrames.delete(counter);
      }
    }

    animationFrames.set(counter, requestAnimationFrame(updateCounter));
  }

  function resetCounter(counter) {
    const frame = animationFrames.get(counter);
    if (frame) cancelAnimationFrame(frame);
    animationFrames.delete(counter);

    const target = counter.dataset.counterTarget || counter.textContent.trim();
    const counterValue = getCounterValue(counter, target);
    if (counterValue) counter.textContent = formatCounter(0, counterValue);
  }

  window.animatePortfolioCounter = (counter, value) => animateCounter(counter, value, false);

  if (!('IntersectionObserver' in window)) {
    counters.forEach((counter) => {
      animateCounter(counter, counter.dataset.counterTarget || counter.textContent.trim(), true);
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(
          entry.target,
          entry.target.dataset.counterTarget || entry.target.textContent.trim(),
          true
        );
      } else {
        resetCounter(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach((counter) => observer.observe(counter));
}

// --- 1. PORTRAIT 3D TILT EFFECT ---
function initPortraitTilt() {
  const card = document.getElementById('hero-portrait-card');
  if (!card) return;

  const wrapper = card.parentElement;
  wrapper.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 12;
    const rotY = (x / (rect.width / 2)) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// --- 2. INTERACTIVE CYBER TERMINAL (CLI) ---
function initTerminalCLI() {
  const modal = document.getElementById('terminal-modal');
  const openBtns = document.querySelectorAll('.open-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const termBody = document.getElementById('terminal-cli-body');
  const inputField = document.getElementById('terminal-cli-input');

  if (!modal || !termBody || !inputField) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      inputField.focus();
      if (window.cyberAudio) window.cyberAudio.playSuccess();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  const commands = {
    help: `Available Commands:
  • whoami    - Profile of Md Shakib Farazi
  • esports   - Free Fire competitive stats & playstyle
  • squad     - Team Unique background & philosophy
  • skills    - Technical & creative skill stack
  • tools     - Smart software tools developed
  • security  - Cyber security journey & credentials
  • admin     - Open Shakib Farazi Admin Command Center
  • theme     - Cycle neon visual theme [emerald, cyan, flare, purple]
  • clear     - Clear terminal buffer
  • contact   - Direct transmission links`,
    whoami: `MD SHAKIB FARAZI
Leader of Team Unique • Esports Competitor • Creative Designer • Self-Taught Developer
"Bridging high-speed tactical gameplay, standout visual craft, and smart code."`,
    esports: `FREE FIRE COMPETITIVE SPEC SHEET:
• Role: In-Game Leader (IGL) & Tactical Fragger
• Signature Strengths: Zone Prediction, Macro-Rotations, Clutch Combat
• Rank: Grandmaster Elite | Scrim Placement Avg: Top 3 (68%)`,
    squad: `TEAM UNIQUE:
• Established to dominate competitive Free Fire scrims & regional cups.
• Creed: Discipline, Chemistry, Relentless Improvement.
• Leader: Md Shakib Farazi`,
    skills: `SKILL MATRIX:
[ESPORTS] Free Fire Competitive, Team Shotcalling, Tournament Analysis
[DESIGN]  Esports Branding, Jersey Concepts, Stream Overlays, 3D Art
[DEV]     JavaScript, Python, Three.js, Web Automation, Discord Bots
[CYBER]   Network Security, Linux/Bash, Vulnerability Scanning, OWASP Top 10`,
    tools: `SMART DIGITAL TOOLS DEVELOPED:
1. ScrimPulse - Automated Free Fire Tournament Point Scorer
2. Valkyrie SecOps - Automated Port & Network Vulnerability Inspector
3. GrowthRadar - Digital Marketing & Social Reach Engine
4. Unique Nexus - Automated Esports Tournament Discord Bot`,
    security: `CYBER SECURITY EXPLORATION:
Focused on Offensive & Defensive Cybersecurity, Ethical Hacking, Network Analysis,
Linux Hardening, and Securing Web Infrastructure.`,
    contact: `TRANSMIT DIRECT COMMS:
• Email: shakibfarazi.official@gmail.com
• Team: Team Unique Esports
• Socials: YouTube, Discord, GitHub, Instagram, X/Twitter`
  };

  inputField.addEventListener('keydown', (e) => {
    if (window.cyberAudio) window.cyberAudio.playTerminalKey();
    if (e.key === 'Enter') {
      const val = inputField.value.trim().toLowerCase();
      inputField.value = '';

      const line = document.createElement('div');
      line.innerHTML = `<span style="color:var(--neon-emerald)">guest@shakib-os:~$</span> ${val}`;
      termBody.appendChild(line);

      if (val === 'clear') {
        termBody.innerHTML = '';
      } else if (val.startsWith('theme')) {
        const parts = val.split(' ');
        const theme = parts[1] || 'emerald';
        document.body.setAttribute('data-theme', theme);
        const resp = document.createElement('div');
        resp.style.color = '#38ef7d';
        resp.textContent = `[OK] Switched theme to: ${theme}`;
        termBody.appendChild(resp);
      } else if (commands[val]) {
        const resp = document.createElement('div');
        resp.style.color = '#cbd5e1';
        resp.style.whiteSpace = 'pre-wrap';
        resp.textContent = commands[val];
        termBody.appendChild(resp);
      } else if (val === '') {
        // empty
      } else {
        const resp = document.createElement('div');
        resp.style.color = '#ff6b6b';
        resp.textContent = `command not found: "${val}". Type "help" for command manifest.`;
        termBody.appendChild(resp);
      }

      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}

// --- 5. CREATIVE DESIGN VAULT FILTER & LIGHTBOX ---
function initDesignGallery() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const lightbox = document.getElementById('lightbox-modal');
  const closeLightbox = document.getElementById('close-lightbox-btn');

  const applyProjectFilter = () => {
    const activeFilter = document.querySelector('.filter-pill-btn.active');
    const category = activeFilter?.dataset.filter || 'all';
    const cards = [...document.querySelectorAll('#design-gallery-grid .design-card')];
    let visibleCount = 0;

    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visibleCount += 1;
    });

    const resultsCount = document.getElementById('project-results-count');
    if (resultsCount) {
      resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown`;
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyProjectFilter();
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  document.addEventListener('portfolio:projects-rendered', applyProjectFilter);
  applyProjectFilter();

  const closeLightboxModal = () => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    const returnFocusId = lightbox.dataset.returnFocusId;
    lightbox.classList.remove('active');
    document.body.style.overflow = lightbox.dataset.previousBodyOverflow || '';
    delete lightbox.dataset.returnFocusId;
    delete lightbox.dataset.previousBodyOverflow;
    if (returnFocusId) document.getElementById(returnFocusId)?.focus();
  };

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener('click', closeLightboxModal);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightboxModal();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('active')) return;
      if (event.key === 'Escape') {
        closeLightboxModal();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeLightbox?.focus();
      }
    });
  }
}

function initAIChat() {
  const panel = document.getElementById('ai-chat-panel');
  const toggle = document.getElementById('ai-chat-toggle');
  const close = document.getElementById('ai-chat-close');
  const contactOpen = document.getElementById('ai-chat-open-contact');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const send = document.getElementById('ai-chat-send');
  const messagesNode = document.getElementById('ai-chat-messages');
  const status = document.getElementById('ai-chat-status');

  if (!panel || !toggle || !close || !form || !input || !send || !messagesNode || !status) return;

  let lastTrigger = toggle;

  const appendMessage = (role, text, isError = false) => {
    const message = document.createElement('div');
    message.className = `ai-chat-message ${role}${isError ? ' error' : ''}`;
    message.textContent = text;
    messagesNode.appendChild(message);
    messagesNode.scrollTop = messagesNode.scrollHeight;
  };

  const openPanel = (trigger) => {
    lastTrigger = trigger;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close AI chat');
    input.focus();
  };

  const closePanel = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open AI chat');
    lastTrigger.focus();
  };

  toggle.addEventListener('click', () => {
    if (panel.hidden) openPanel(toggle);
    else closePanel();
  });
  close.addEventListener('click', closePanel);
  if (contactOpen) {
    contactOpen.addEventListener('click', () => openPanel(contactOpen));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  const chatHistory = [];
  let aiAvailability;
  const localModeStatus = 'Portfolio-based local chat — no chat messages are sent to an AI service.';

  const isAIAvailable = async () => {
    if (typeof aiAvailability === 'boolean') return aiAvailability;

    let timeout;
    try {
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), 2500);
      const response = await fetch('/api/chat/status', {
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('application/json')) {
        aiAvailability = false;
      } else {
        const result = await response.json();
        aiAvailability = result.enabled === true;
      }
    } catch (error) {
      aiAvailability = false;
    } finally {
      if (timeout) window.clearTimeout(timeout);
    }
    return aiAvailability;
  };

  isAIAvailable().then((enabled) => {
    if (!send.disabled) {
      status.textContent = enabled
        ? 'AI assistant ready — answers are grounded in the portfolio.'
        : localModeStatus;
    }
  });

  const getAIReply = async () => {
    const messages = chatHistory.slice(-11);
    while (messages.length > 1 && messages.reduce((total, message) => total + message.content.length, 0) > 5500) {
      messages.shift();
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22_000);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ messages }),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || typeof result.reply !== 'string' || !result.reply.trim()) {
        throw new Error(result.error || 'The AI assistant returned an invalid response.');
      }
      return result.reply.trim();
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const getLocalReply = (question) => {
    const text = question.toLowerCase();
    const profileName = document.getElementById('dyn-hero-name')?.textContent.trim() || 'Md Shakib Farazi';
    const profileBio = document.getElementById('dyn-hero-bio')?.textContent.trim();
    const tagline = document.getElementById('dyn-hero-tagline')?.textContent.trim();
    const skillCards = [...document.querySelectorAll('#about .skill-card')];
    const matchingSkill = skillCards.find((card) => {
      const title = card.querySelector('.tool-title')?.textContent.toLowerCase() || '';
      const badge = card.querySelector('.tool-badge')?.textContent.toLowerCase() || '';
      const terms = `${title} ${badge}`.split(/[^a-z0-9]+/).filter(term => term.length > 3);
      return terms.some(term => text.includes(term)) ||
        (/(design|logo|brand|graphic|thumbnail|visual)/.test(text) && /design/.test(title)) ||
        (/(web|website|code|develop|program|app|software|python|javascript|coding|script)/.test(text) && /development/.test(title)) ||
        (/(cyber|security|linux|hacking|network)/.test(text) && /cybersecurity/.test(title)) ||
        (/(market|seo|social media|audience|promotion)/.test(text) && /marketing/.test(title)) ||
        (/(esport|gaming|free fire|game|team|scrim|tournament)/.test(text) && /esports/.test(title)) ||
        (/(lead|project|management|planning)/.test(text) && /leadership/.test(title));
    });

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
      return `Hello! I’m the free portfolio helper. Ask me about ${profileName}’s skills, projects, esports, or contact details.`;
    }
    if (/(your name|who are you|who is|about shakib|about md|tell me about|bio|profile)/.test(text)) {
      return `${profileName}${tagline ? ` — ${tagline}` : ''}.${profileBio ? ` ${profileBio}` : ''}`;
    }
    if (/(contact|email|e-mail|whatsapp|hire|collaborat|reach|message|phone)/.test(text)) {
      const email = document.getElementById('dyn-contact-email')?.textContent.trim();
      const whatsapp = document.getElementById('contact-whatsapp-link')?.href;
      const whatsappNumber = whatsapp ? new URL(whatsapp).pathname.replace(/\//g, '') : '';
      return `You can contact ${profileName}${email ? ` by email at ${email}` : ''}${email && whatsappNumber ? ' or ' : ''}${whatsappNumber ? `on WhatsApp at +${whatsappNumber}` : ''}. Use the email and WhatsApp links in the Contact section to open a message. I don’t have confirmed pricing or availability information.`;
    }
    if (/(price|pricing|cost|rate|available|availability|hire)/.test(text)) {
      return `I don’t have confirmed pricing or availability details. Please use the email or WhatsApp links in the Contact section to ask ${profileName} directly.`;
    }
    if (/(team unique|free fire|esport|gaming|scrim|tournament|squad)/.test(text)) {
      return 'The portfolio bio describes Shakib as the leader of Team Unique and lists competitive Free Fire, esports team leadership, and team coordination among his skills. Tournament results and the points calculator are no longer shown on the site.';
    }
    if (/(cyber|security|hack|password|malware|attack|exploit)/.test(text)) {
      return 'The portfolio describes cybersecurity as a learning area, including fundamentals, Linux, networking, web security, ethical hacking concepts, and privacy. I can only help with general, defensive information—not instructions to break into accounts or systems.';
    }
    if (/(project|portfolio|work|example|built|made|show me)/.test(text)) {
      const designs = [...document.querySelectorAll('#design .design-card-title')]
        .map(item => item.textContent.trim())
        .filter(Boolean)
        .slice(0, 5);
      const examples = designs.slice(0, 8);
      return examples.length
        ? `Some work shown on the portfolio: ${examples.join('; ')}. Visit the Projects & Design Vault section to explore them.`
        : 'Explore the Projects & Design Vault section of the portfolio for project examples.';
    }
    if (matchingSkill) {
      const title = matchingSkill.querySelector('.tool-title')?.textContent.trim() || 'Skills';
      const description = matchingSkill.querySelector('.tool-desc')?.textContent.trim() || '';
      const skills = [...matchingSkill.querySelectorAll('.tech-tag')]
        .map(tag => tag.textContent.trim())
        .filter(Boolean);
      return `${title}: ${description}${skills.length ? ` Skills include ${skills.join(', ')}.` : ''}`;
    }
    if (/(skill|expertise|what can you do|what does shakib do)/.test(text)) {
      const categories = skillCards.map(card => card.querySelector('.tool-title')?.textContent.trim()).filter(Boolean);
      return `The portfolio lists these areas: ${categories.join('; ')}. Ask about one area—such as design, web development, cybersecurity, marketing, or esports—for details.`;
    }
    return 'I can answer basic questions using the information on this portfolio. Try asking about Shakib’s bio, skills, projects, Team Unique, esports, or how to contact him. This free helper works locally and does not use a paid AI service.';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || send.disabled) return;

    input.value = '';
    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    send.disabled = true;
    status.textContent = 'Checking the portfolio and chat service…';
    (async () => {
      let reply;
      let responseStatus = localModeStatus;
      if (await isAIAvailable()) {
        try {
          reply = await getAIReply();
          responseStatus = 'AI assistant connected — answers are grounded in the portfolio.';
        } catch (error) {
          reply = getLocalReply(text);
          responseStatus = 'AI assistant unavailable; answered from the portfolio instead.';
        }
      } else {
        reply = getLocalReply(text);
      }

      appendMessage('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
      status.textContent = responseStatus;
      send.disabled = false;
      input.focus();
    })();
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status-msg');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const recipient = document.getElementById('dyn-contact-email')?.textContent.trim();
    const name = document.getElementById('contact-name')?.value.trim();
    const senderEmail = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-msg')?.value.trim();
    if (!recipient || !name || !senderEmail || !subject || !message) {
      status.textContent = 'Please complete every field before opening your email draft.';
      return;
    }

    const body = [
      `From: ${name}`,
      `Reply email: ${senderEmail}`,
      '',
      message
    ].join('\n');
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(body)}`;

    status.textContent = 'Opening your email app with the message draft. Review it there and press Send.';
    window.location.href = mailto;
  });
}

// --- 7. ARSENAL CONTROLS & THEME SWITCHER ---
function initArsenalUI() {
  const modelBtns = document.querySelectorAll('.model-btn');
  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const model = btn.dataset.model;
      if (window.setArsenalModel) window.setArsenalModel(model);
    });
  });

  const swatches = document.querySelectorAll('.color-swatch-btn');
  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const hex = parseInt(btn.dataset.hex, 16);
      const name = btn.dataset.name;
      if (window.setArsenalTheme) window.setArsenalTheme(hex, name);
      document.body.setAttribute('data-theme', name);
    });
  });

  const wireBtn = document.getElementById('toggle-wireframe-btn');
  if (wireBtn) {
    wireBtn.addEventListener('click', () => {
      if (window.toggleArsenalWireframe) {
        const isWire = window.toggleArsenalWireframe();
        wireBtn.classList.toggle('active', isWire);
      }
    });
  }

  const rotBtn = document.getElementById('toggle-rotate-btn');
  if (rotBtn) {
    rotBtn.addEventListener('click', () => {
      if (window.toggleArsenalRotate) {
        const isRot = window.toggleArsenalRotate();
        rotBtn.classList.toggle('active', isRot);
      }
    });
  }
}

// --- 8. MOBILE MENU ---
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileBtn && navMenu) {
    const setMenuOpen = (isOpen) => {
      navMenu.classList.toggle('is-open', isOpen);
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      mobileBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    mobileBtn.addEventListener('click', () => {
      setMenuOpen(!navMenu.classList.contains('is-open'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
        setMenuOpen(false);
      }
    });
  }
}

function initSectionNavigation() {
  const links = [...document.querySelectorAll('.nav-menu .nav-link[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);
  if (links.length === 0 || sections.length === 0) return;

  const setActiveSection = (sectionId) => {
    links.forEach((link) => {
      const isActive = link.hash === `#${sectionId}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', () => setActiveSection(link.hash.slice(1)));
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (visibleSection) setActiveSection(visibleSection.target.id);
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.35] });

  sections.forEach((section) => observer.observe(section));
}
