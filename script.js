// Remove smooth scroll for nav links to allow navigation to other HTML files

// Optional: Add other interactive JS later (animations, project filters, etc.)
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Optional: Add other interactive JS later (animations, project filters, etc.)
