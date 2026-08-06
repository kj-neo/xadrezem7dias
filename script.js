// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  // Only add animation class if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(el => {
      el.classList.add('animate');
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== COUNTER ANIMATION FOR HIGHLIGHTS =====
  const highlightNumbers = document.querySelectorAll('.highlight-item .number');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    
    highlightNumbers.forEach(numEl => {
      const text = numEl.getAttribute('data-value') || numEl.textContent;
      const hasPlus = text.includes('+');
      const hasPercent = text.includes('%');
      const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
      
      let current = 0;
      const increment = Math.ceil(numericValue / 40);
      const duration = 1500;
      const stepTime = duration / (numericValue / increment);

      const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(counter);
        }
        let display = current.toString();
        if (hasPlus) display = '+' + display;
        if (hasPercent) display = display + '%';
        numEl.textContent = display;
      }, stepTime);
    });
    
    countersAnimated = true;
  };

  // Observe the solution highlights section
  const highlightsSection = document.querySelector('.solution-highlights');
  if (highlightsSection && 'IntersectionObserver' in window) {
    const highlightObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          highlightObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    highlightObserver.observe(highlightsSection);
  }
});