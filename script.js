
  // ==========================
  // Scroll-triggered animations (for project sections)
  // ==========================
  const animatedSections = document.querySelectorAll(
    '.dreamteam-page .heading, .dreamteam-page .card-bg, .dreamteam-page .problem, .dreamteam-page .research, .dreamteam-page .userpersonas, .dreamteam-page .solution, .dreamteam-page .experiences-phases'
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'all 0.8s ease-out';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedSections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // ==========================
  // Scroll-triggered animations
  // ==========================
  const animatedSections = document.querySelectorAll(
    '.dreamteam-page .heading, .dreamteam-page .card-bg, .dreamteam-page .problem, .dreamteam-page .research, .dreamteam-page .userpersonas, .dreamteam-page .solution, .dreamteam-page .experiences-phases'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'all 0.8s ease-out';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    animatedSections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = 'translateY(30px)';
      observer.observe(section);
    });
  }

  // ==========================
  // Persistent Navbar Styling
  // ==========================
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const currentURL = new URL(window.location.href);

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkURL = new URL(href, window.location.href);

      // Match the actual destination page
      const samePage = linkURL.pathname === currentURL.pathname;

      // For links to sections, match the section too
      const sameSection =
        linkURL.hash && linkURL.hash === currentURL.hash;

      const isActive = samePage &&
        (linkURL.hash ? sameSection : !currentURL.hash);

      link.classList.toggle('active', isActive);
    });
  }

  updateActiveLink();

  // Keep section links active after clicking them
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (!href) return;

      const linkURL = new URL(href, window.location.href);
      const currentURL = new URL(window.location.href);

      if (
        linkURL.pathname === currentURL.pathname &&
        linkURL.hash
      ) {
        const target = document.querySelector(linkURL.hash);

        if (target) {
          event.preventDefault();
          history.pushState(null, '', linkURL.hash);
          target.scrollIntoView({ behavior: 'smooth' });
          updateActiveLink();
        }
      }
    });
  });

  window.addEventListener('popstate', updateActiveLink);
  window.addEventListener('hashchange', updateActiveLink);
});


// ==========================
// Carousel (Reusable for all sections)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");

    let currentIndex = 0;

    const updateCarousel = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length; // loop forward
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length; // loop backward
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    // Optional: Auto-slide every 5 seconds
    // setInterval(() => nextBtn.click(), 5000);
  });
});

// ==========================
// Video autoplay control (pause when off-screen)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".phone-screen video");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Autoplay only if you want automatic start
        // video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.4 });

  videos.forEach(video => observer.observe(video));
});

document.querySelectorAll('.polaroid').forEach((photo) => {
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  photo.addEventListener('pointerdown', (event) => {
    event.preventDefault();

    const rect = photo.getBoundingClientRect();

    startX = event.clientX;
    startY = event.clientY;
    offsetX = 0;
    offsetY = 0;

    photo.classList.add('dragging');
    photo.style.zIndex = Date.now();
    photo.setPointerCapture(event.pointerId);
  });

  photo.addEventListener('pointermove', (event) => {
    if (!photo.classList.contains('dragging')) return;

    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;

    photo.style.left = `calc(${getComputedStyle(photo).left} + ${offsetX}px)`;
    photo.style.top = `calc(${getComputedStyle(photo).top} + ${offsetY}px)`;

    startX = event.clientX;
    startY = event.clientY;
  });

  photo.addEventListener('pointerup', () => {
    photo.classList.remove('dragging');
  });

  photo.addEventListener('pointercancel', () => {
    photo.classList.remove('dragging');
  });
});
