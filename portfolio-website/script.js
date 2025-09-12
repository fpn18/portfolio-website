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
    '.dreamteam-page .heading, .dreamteam-page .card-bg, .dreamteam-page .problem'
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
