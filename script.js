// Typing animation for hero section text
document.addEventListener('DOMContentLoaded', function() {
  const heroText = document.querySelector('.hero p');
  if (heroText) {
    const fullText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    function type() {
      if (i < fullText.length) {
        heroText.textContent += fullText.charAt(i);
        i++;
        setTimeout(type, 35); // Adjust speed here
      }
    }
    type();
  }

  // Scroll-triggered animations (DreamTeam page)
  const animatedSections = document.querySelectorAll(
    '.dreamteam-page .heading, .dreamteam-page .card-bg, .dreamteam-page .problem, scentinel-page .heading, .scentinel-page .card-bg, .scentinel-page .problem, vita-page .heading, .vita-page .card-bg, .vita-page .problem, tastetogether-page .heading, .tastetogether-page .card-bg, .tastetogether-page .problem'
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'all 0.8s ease-out';
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.2 } // triggers when 20% visible
  );

  animatedSections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
  });
});

// Prevent multiple clicks on the same nav link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            // If clicking on a link to the current page, prevent default behavior
            if (href.includes(currentPage) || (href.startsWith('#') && currentPage === 'index.html')) {
                e.preventDefault();
                
                // Smooth scroll to section if it's an anchor link
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

const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const images = document.querySelectorAll('.carousel-track img');

let currentIndex = 0;

// Calculate image width dynamically (in case container resizes)
function getImageWidth() {
  return images[0].getBoundingClientRect().width;
}

function updateCarousel() {
  const width = getImageWidth();
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Next button
nextButton.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Previous button
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Optional: recalc on window resize
window.addEventListener('resize', updateCarousel);

// Pause videos when scrolled out of view
const videos = document.querySelectorAll(".phone-screen video");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, { threshold: 0.5 });

videos.forEach(video => observer.observe(video));
