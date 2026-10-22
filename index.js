document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE
  
  const menuBtn = document.getElementById('menu');
  const navMenu = document.getElementById('nav');

  if (menuBtn && navMenu) {
    // Menu icon click par open/close karein
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Link par click hote hi mobile menu close ho jaye
    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. SCROLL SPY (Active Navbar Highlighting)

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navlink');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // 3. TAB SWITCHER (Coding vs Video Editing)
 
  const tabCoding = document.getElementById('tab-coding');
  const tabEditing = document.getElementById('tab-editing');
  const codingContainer = document.getElementById('coding-container');
  const editingContainer = document.getElementById('editing-container');

  if (tabCoding && tabEditing && codingContainer && editingContainer) {
    
    // Coding Tab Click
    tabCoding.addEventListener('click', () => {
      tabCoding.classList.add('active');
      tabEditing.classList.remove('active');

      codingContainer.classList.remove('hidden');
      editingContainer.classList.add('hidden');

      // Agar coding tab khule to background video sound band kar do
      muteAllVideos();
    });

    // Editing Tab Click
    tabEditing.addEventListener('click', () => {
      tabEditing.classList.add('active');
      tabCoding.classList.remove('active');

      editingContainer.classList.remove('hidden');
      codingContainer.classList.add('hidden');

      // Sabhi video ko smooth loop autoplay karein
      const videos = editingContainer.querySelectorAll('video');
      videos.forEach((v) => {
        v.play().catch(() => {});
      });
    });
  }
  
  // 4. VIDEO REELS: AUTOPLAY & CLICK FOR SOUND

  // Card chahe .reel-card ho ya .video-card, dono ko handle karega
  const videoCards = document.querySelectorAll('.reel-card, .video-card');

  videoCards.forEach((card) => {
    const video = card.querySelector('.editing-video');
    const badge = card.querySelector('.sound-status');
    const icon = card.querySelector('.sound-icon');
    const text = card.querySelector('.sound-text');

    if (video) {
      card.addEventListener('click', () => {
        const isMuted = video.muted;

        // Pehle baaki saari videos ko mute kar do
        muteAllVideos();

        if (isMuted) {
          // Click ki hui video ki voice on karein
          video.muted = false;
          video.play();

          if (badge && icon && text) {
            badge.classList.remove('bg-black/60', 'text-slate-200');
            badge.classList.add('bg-cyan-500', 'text-black', 'border-cyan-300');
            icon.textContent = '🔊';
            text.textContent = 'Sound ON';
          }
        } else {
          // Dobara click karne par wapas mute kar do
          video.muted = true;
          if (badge && icon && text) {
            badge.classList.add('bg-black/60', 'text-slate-200');
            badge.classList.remove('bg-cyan-500', 'text-black', 'border-cyan-300');
            icon.textContent = '🔇';
            text.textContent = 'Tap for Sound';
          }
        }
      });
    }
  });

  // Sabhi videos ko mute karne ka simple helper function
  function muteAllVideos() {
    videoCards.forEach((card) => {
      const v = card.querySelector('.editing-video');
      const b = card.querySelector('.sound-status');
      const i = card.querySelector('.sound-icon');
      const t = card.querySelector('.sound-text');

      if (v) v.muted = true;
      if (b && i && t) {
        b.classList.add('bg-black/60', 'text-slate-200');
        b.classList.remove('bg-cyan-500', 'text-black', 'border-cyan-300');
        i.textContent = '🔇';
        t.textContent = 'Tap for Sound';
      }
    });
  }

});