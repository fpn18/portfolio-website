
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

// ==========================
// Prevent multiple clicks on same nav link
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      // Prevent reload if already on this page
      if (href.includes(currentPage) || (href.startsWith('#') && currentPage === 'index.html')) {
        e.preventDefault();

        // Smooth scroll for anchor links
        if (href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
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



document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      if (!href) return;

      const linkPage = href.split('#')[0];

      // Highlight the link for the current page
      if (linkPage && linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Set the active link whenever the page loads
  updateActiveLink();

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (!href) return;

      const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

      const linkPage = href.split('#')[0];

      // Same-page section links
      if (href.startsWith('#')) {
        event.preventDefault();

        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }

        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      }

      // Prevent reloading the page you are already on
      else if (linkPage === currentPage) {
        event.preventDefault();
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});
