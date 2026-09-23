/**
 * ABDULQUADRI OLAJIDE — PORTFOLIO APPLICATION LOGIC
 * VELOS Brutalist Theme: Dynamic Project Filters, In-Page Live Previewer,
 * Certificate Viewer, Interactive Hacker Terminal, and Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalGreeting();
  initKeyboardShortcuts();
  initMobileMenuDismiss();
});

/* ==========================================================================
   1. PROJECT FILTERING LOGIC
   ========================================================================== */
function filterProjects(category) {
  const allCards = document.querySelectorAll('.project-item');
  const btnAll = document.getElementById('btn-filter-all');
  const btnCyber = document.getElementById('btn-filter-cyber');
  const btnAi = document.getElementById('btn-filter-ai');
  const btnWeb = document.getElementById('btn-filter-web');

  const btns = [btnAll, btnCyber, btnAi, btnWeb];
  const activeClass = 'filter-btn px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 bg-white text-neutral-950 shadow-md font-semibold shrink-0 cursor-pointer whitespace-nowrap select-none border border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]';
  const inactiveClass = 'filter-btn px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] border border-transparent font-medium shrink-0 cursor-pointer whitespace-nowrap select-none';

  btns.forEach(b => {
    if (b) b.className = inactiveClass;
  });

  if (category === 'all' && btnAll) btnAll.className = activeClass;
  if (category === 'cyber-web3' && btnCyber) btnCyber.className = activeClass;
  if (category === 'ai-health' && btnAi) btnAi.className = activeClass;
  if (category === 'core-web' && btnWeb) btnWeb.className = activeClass;

  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.setAttribute('data-filter', category);
  }

  // Show/Hide matching cards
  allCards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.classList.add('animate');
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.96)';
    }
  });

  const catNames = {
    'all': 'ALL PROJECTS (08)',
    'cyber-web3': 'SECURITY & WEB3 (04)',
    'ai-health': 'AI & HEALTH (02)',
    'core-web': 'WEB & TOOLS (02)'
  };
  showToast(`Showing: ${catNames[category] || category}`);
}

/* ==========================================================================
   2. IN-PAGE LIVE PREVIEW MODAL (FULL BROWSER FRAME)
   ========================================================================== */
let currentPreviewUrl = '';

function openLivePreviewModal(url, title, externalUrl) {
  const modal = document.getElementById('live-preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const urlDisplay = document.getElementById('modal-url-display');
  const externalLink = document.getElementById('modal-external-link');
  const spinner = document.getElementById('modal-spinner');

  if (!modal || !iframe) return;

  currentPreviewUrl = url;
  if (urlDisplay) urlDisplay.textContent = url;
  if (externalLink) externalLink.href = externalUrl || url;

  if (spinner) {
    spinner.style.display = 'flex';
    spinner.style.opacity = '1';
  }

  // Load iframe
  iframe.src = url;

  // Open modal
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  document.body.style.overflow = 'hidden';
}

function closeLivePreviewModal() {
  const modal = document.getElementById('live-preview-modal');
  const iframe = document.getElementById('preview-iframe');

  if (!modal) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  document.body.style.overflow = '';

  if (iframe) {
    // Clear src to stop background audio/videos/network
    iframe.src = '';
  }
}

function reloadPreviewIframe() {
  const iframe = document.getElementById('preview-iframe');
  const spinner = document.getElementById('modal-spinner');
  if (iframe && currentPreviewUrl) {
    if (spinner) {
      spinner.style.display = 'flex';
      spinner.style.opacity = '1';
    }
    iframe.src = currentPreviewUrl;
  }
}

function hidePreviewSpinner() {
  const spinner = document.getElementById('modal-spinner');
  if (spinner) {
    spinner.style.opacity = '0';
    setTimeout(() => {
      spinner.style.display = 'none';
    }, 300);
  }
}

function handleIframeError() {
  const spinner = document.getElementById('modal-spinner');
  if (spinner) {
    spinner.innerHTML = `
      <div class="text-amber-400 font-mono text-sm mb-2">Notice: External Domain Protected from Direct Embedding</div>
      <p class="text-white/60 text-xs font-mono max-w-md text-center mb-4">This website has set 'X-Frame-Options: SAMEORIGIN' security headers preventing direct iframe rendering.</p>
      <a href="${currentPreviewUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 rounded-full bg-emerald-500 text-black font-mono text-xs font-bold hover:bg-emerald-400">Launch in New Window</a>
    `;
  }
}

/* ==========================================================================
   3. CERTIFICATE VIEWER MODAL
   ========================================================================== */
function openCertModal(certType) {
  const modal = document.getElementById('cert-modal');
  const certImg = document.getElementById('cert-img');
  const certTitle = document.getElementById('cert-title');

  if (!modal || !certImg) return;

  if (certType === 'ethical_hacker') {
    certImg.src = 'assets/cert_ethical_hacker.jpg';
    if (certTitle) certTitle.textContent = 'Cisco Certified Ethical Hacker (Issued Aug 22, 2025)';
  } else if (certType === 'intro_cyber') {
    certImg.src = 'assets/cert_intro_cyber.jpg';
    if (certTitle) certTitle.textContent = 'Cisco Introduction to Cybersecurity (Issued Mar 18, 2025)';
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  document.body.style.overflow = '';
}

/* ==========================================================================
   4. COPY EMAIL & TOAST NOTIFICATION
   ========================================================================== */
function copyEmailToClipboard() {
  const email = 'abdulquadriolajide22@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast(`COPIED: ${email}`);
  }).catch(() => {
    // Fallback prompt
    showToast(`Email: ${email}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3200);
}

/* ==========================================================================
   5. INTERACTIVE HACKER TERMINAL
   ========================================================================== */
function initTerminalGreeting() {
  // Ready state indicator
}

function handleTerminalSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('terminal-input');
  if (!input) return;

  const rawCmd = input.value.trim();
  if (rawCmd) {
    runCommand(rawCmd);
  }
  input.value = '';
}

function runCommand(cmd) {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  const cleanCmd = cmd.toLowerCase().trim();

  // Print user command line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'text-white font-mono flex items-center gap-2 pt-2 border-t border-white/5';
  cmdLine.innerHTML = `<span class="text-emerald-400 font-bold">&gt;</span> <span>${escapeHtml(cmd)}</span>`;
  output.appendChild(cmdLine);

  const resLine = document.createElement('div');
  resLine.className = 'text-xs font-mono pl-4 leading-relaxed';

  switch (cleanCmd) {
    case 'help':
      resLine.className += ' text-white/80';
      resLine.innerHTML = `
        <div class="text-emerald-300 font-bold mb-1">AVAILABLE TERMINAL COMMANDS:</div>
        <div><strong class="text-emerald-400">projects</strong>  - List all 8 deployed systems and URLs</div>
        <div><strong class="text-emerald-400">certs</strong>     - View verified Cisco & Forage certifications</div>
        <div><strong class="text-emerald-400">whoami</strong>    - Security profile & academic background</div>
        <div><strong class="text-emerald-400">skills</strong>    - Offensive security & engineering tech stack</div>
        <div><strong class="text-emerald-400">scan</strong>      - Run mock port & vulnerability scanner</div>
        <div><strong class="text-emerald-400">contact</strong>   - Direct emails, phone & social coordinates</div>
        <div><strong class="text-emerald-400">clear</strong>     - Clear the terminal screen</div>
      `;
      break;

    case 'projects':
      resLine.className += ' text-white/80 space-y-1';
      resLine.innerHTML = `
        <div class="text-emerald-300 font-bold">[+] ACTIVE DEPLOYED PROJECTS:</div>
        <div>1. <strong class="text-white">TrustX:</strong> Statutory Anti-Counterfeit Verification (https://trustxx.netlify.app/)</div>
        <div>2. <strong class="text-white">TwinSense:</strong> Deterministic Sepsis Digital Twin (https://twinsense.vercel.app/)</div>
        <div>3. <strong class="text-white">ArcBounty:</strong> Decentralized Bug Bounty Infrastructure (https://arcbounty.netlify.app/)</div>
        <div>4. <strong class="text-white">AI Small Small:</strong> Child AI Literacy Platform (https://aismallsmall.netlify.app/)</div>
        <div>5. <strong class="text-white">Pevra:</strong> Blockchain Telecom Identity on Base (https://x.com/pevrahq)</div>
        <div>6. <strong class="text-white">Physics 104:</strong> OAU Mechanics & Tutoring Portal (https://physics104.netlify.app/)</div>
        <div>7. <strong class="text-white">ARCX:</strong> Modern High-Performance Experience (https://arccx.netlify.app/)</div>
        <div>8. <strong class="text-white">Git-Bounty:</strong> Automated GitHub Micro-Rewards Dispatcher</div>
      `;
      break;

    case 'certs':
      resLine.className += ' text-white/80 space-y-1';
      resLine.innerHTML = `
        <div class="text-emerald-300 font-bold">[+] VERIFIED INDUSTRY CREDENTIALS:</div>
        <div>• <strong class="text-emerald-400">Cisco Certified Ethical Hacker:</strong> Aug 22, 2025 (34+ hands-on labs)</div>
        <div>• <strong class="text-blue-400">Cisco Introduction to Cybersecurity:</strong> Mar 18, 2025</div>
        <div>• <strong class="text-purple-400">The Forage Virtual Simulations:</strong> 3 Verified Industry Certificates</div>
        <div>• <strong class="text-white">Credly Transcript:</strong> https://www.credly.com/users/olajide-abdulquadri</div>
      `;
      break;

    case 'whoami':
      resLine.className += ' text-white/80 space-y-1';
      resLine.innerHTML = `
        <div class="text-emerald-300 font-bold">OPERATIVE PROFILE:</div>
        <div>Name: Abdulquadri (Abayomi) Olajide</div>
        <div>Degree: Part 3, B.Sc. Computer Science with Mathematics</div>
        <div>Institution: Obafemi Awolowo University (OAU), Ile-Ife, Nigeria</div>
        <div>Specialty: Ethical Hacking, Web Penetration Testing, Full-Stack Architecture</div>
        <div>Affiliations: IEEE OAU Student Branch, HackerOne & Bugcrowd Researcher</div>
      `;
      break;

    case 'skills':
      resLine.className += ' text-white/80 space-y-1';
      resLine.innerHTML = `
        <div class="text-emerald-300 font-bold">[+] TECHNICAL CAPABILITIES:</div>
        <div>• <strong class="text-white">Offensive Security:</strong> Kali Linux, Burp Suite Pro, Metasploit, Nmap, Wireshark, WebSploit, OWASP Top 10, IDOR, SSRF, XSS.</div>
        <div>• <strong class="text-white">Full-Stack & Web:</strong> React, Next.js, Node.js, Express, TypeScript, JavaScript, TailwindCSS, REST APIs.</div>
        <div>• <strong class="text-white">Applied Math & Web3:</strong> Discrete Mathematics, State Machine Modeling, Python, Solidity, Base L2.</div>
      `;
      break;

    case 'scan':
      resLine.className += ' text-emerald-400 space-y-1';
      resLine.innerHTML = `
        <div>[*] Initializing SYN stealth scan on 127.0.0.1...</div>
        <div>[+] Port 443/tcp (HTTPS) - OPEN (TLS 1.3 / Strict-Transport-Security)</div>
        <div>[+] Port 80/tcp (HTTP) - REDIRECT TO 443</div>
        <div>[+] Geovelocity Anomaly Engine: ACTIVE</div>
        <div>[+] NAFDAC Registry Interceptor: ARMED</div>
        <div>[+] Result: 0 Critical Vulnerabilities Detected. Hardened Node.</div>
      `;
      break;

    case 'contact':
      resLine.className += ' text-white/80 space-y-1';
      resLine.innerHTML = `
        <div>Email: <a href="mailto:abdulquadriolajide22@gmail.com" class="text-emerald-400 underline">abdulquadriolajide22@gmail.com</a></div>
        <div>LinkedIn: <a href="https://www.linkedin.com/in/abdulquadri-olajide-516503407" target="_blank" class="text-emerald-400 underline">abdulquadri-olajide</a></div>
        <div>GitHub: <a href="https://github.com/Blackwrld04" target="_blank" class="text-emerald-400 underline">github.com/Blackwrld04</a></div>
        <div>Location: Ile-Ife, Osun State, Nigeria (WAT)</div>
      `;
      break;

    case 'clear':
      output.innerHTML = '';
      return;

    default:
      resLine.className += ' text-red-400';
      resLine.innerHTML = `Command not recognized: "${escapeHtml(cmd)}". Type <span class="text-emerald-300 font-bold">'help'</span> for list of commands.`;
      break;
  }

  output.appendChild(resLine);
  output.scrollTop = output.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   6. MOBILE NAVIGATION TOGGLE & DISMISS
   ========================================================================== */
function toggleMobileNav() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('hidden');
}

function initMobileMenuDismiss() {
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    if (!menu || menu.classList.contains('hidden')) return;

    // Check if click was on hamburger button or inside mobile menu
    const isTrigger = e.target.closest('button[onclick="toggleMobileNav()"]');
    const isMenuContent = menu.contains(e.target);

    if (!isTrigger && !isMenuContent) {
      menu.classList.add('hidden');
    }
  });
}

function toggleTerminalModal() {
  const terminalSec = document.getElementById('terminal');
  if (terminalSec) {
    terminalSec.scrollIntoView({ behavior: 'smooth' });
    const input = document.getElementById('terminal-input');
    if (input) setTimeout(() => input.focus(), 600);
  }
}

/* ==========================================================================
   7. KEYBOARD SHORTCUTS (ESC TO CLOSE MODALS)
   ========================================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLivePreviewModal();
      closeCertModal();
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
}
