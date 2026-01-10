// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
  });
});

// Navbar scroll and Scroll Spy effect
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
let isScrolling = false;

function updateNavigation() {
  const scrollY = window.pageYOffset;

  // Navbar background threshold
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Scroll Spy logic
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // Adjusted for navbar height
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.nav-menu a[href*=${sectionId}]`)
        ?.classList.add("active");
    } else {
      document
        .querySelector(`.nav-menu a[href*=${sectionId}]`)
        ?.classList.remove("active");
    }
  });

  isScrolling = false;
}

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(updateNavigation);
    isScrolling = true;
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 70; // Improved navbar offset
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerText;

  // Show loading state
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  // Create FormData object (automatically grabs all named inputs)
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 200) {
      // Success
      alert("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    } else {
      // API returned an error
      console.error(result);
      alert("Something went wrong. Please try again later.");
    }
  } catch (error) {
    // Network error
    console.error(error);
    alert("Network error. Please check your internet connection.");
  } finally {
    // Reset button state
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
    }
  });
}, observerOptions);

// Observe elements for reveal animations
document
  .querySelectorAll(
    ".about-card, .class-card, .level-card, .style-card, .program-card, .special-card, .section-header, .pricing-section, .contact-info"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add active state to nav links based on scroll position
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Reusable Slider Function
function initSlider(sliderId, dotsId, totalSlides) {
  const slider = document.getElementById(sliderId);
  const dots = document.querySelectorAll(`#${dotsId} .dot`);
  let currentSlide = 0;
  let slideInterval;

  function updateSlider() {
    const isMobile =
      window.innerWidth < (sliderId === "classesSlider" ? 1024 : 768);
    if (isMobile) {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    } else {
      slider.style.transform = "none";
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function startSlider() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.getAttribute("data-index"));
      updateSlider();
      startSlider();
    });
  });

  window.addEventListener("resize", updateSlider);
  startSlider();
  updateSlider();
}

// Initialize Sliders
initSlider("aboutSlider", "sliderDots", 3);
initSlider("classesSlider", "classesDots", 4);
initSlider("stylesSlider", "stylesDots", 4);
initSlider("programsSlider", "programsDots", 3);

const levelCards = document.querySelectorAll(".level-card");

levelCards.forEach((card, index) => {
  // Add hover effect that makes other cards slightly fade
  card.addEventListener("mouseenter", () => {
    levelCards.forEach((otherCard, otherIndex) => {
      if (otherIndex !== index) {
        otherCard.style.opacity = "0.6";
        otherCard.style.transform = "scale(0.95)";
      }
    });
  });

  card.addEventListener("mouseleave", () => {
    levelCards.forEach((otherCard) => {
      otherCard.style.opacity = "1";
      otherCard.style.transform = "scale(1)";
    });
  });

  // Add click animation effect
  card.addEventListener("click", () => {
    // Remove active class from all cards
    levelCards.forEach((c) => c.classList.remove("level-active"));

    // Add active class to clicked card
    card.classList.add("level-active");

    // Animate the level number
    const levelNumber = card.querySelector(".level-number");
    levelNumber.style.transform = "scale(1.2) rotate(360deg)";
    levelNumber.style.transition = "transform 0.6s ease";

    setTimeout(() => {
      levelNumber.style.transform = "scale(1) rotate(0deg)";
    }, 600);

    // Animate the features list
    const features = card.querySelectorAll(".level-features li");
    features.forEach((feature, idx) => {
      feature.style.animation = "none";
      setTimeout(() => {
        feature.style.animation = `slideInRight 0.5s ease forwards ${
          idx * 0.1
        }s`;
      }, 10);
    });
  });
});

// Add keyframe animation for features dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .level-active {
    border-color: var(--secondary-color) !important;
    box-shadow: 0 0 30px rgba(247, 147, 30, 0.5) !important;
  }
`;
document.head.appendChild(style);

// Gallery Filtering & Progressive Loading Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let itemsVisible = 6;
let currentFilter = "all";

function updateGalleryVisibility() {
  let count = 0;
  let matches = 0;

  galleryItems.forEach((item) => {
    const isMatch =
      currentFilter === "all" ||
      item.getAttribute("data-category") === currentFilter;

    if (isMatch) {
      matches++;
      if (count < itemsVisible) {
        item.classList.remove("hide");
        item.classList.add("show");
        count++;
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    } else {
      item.classList.remove("show");
      item.classList.add("hide");
    }
  });

  // Show/hide Load More button based on matches vs visible
  if (matches > itemsVisible) {
    loadMoreBtn.style.display = "inline-block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.getAttribute("data-filter");
    itemsVisible = 6; // Reset visible count on filter change
    updateGalleryVisibility();
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    itemsVisible += 6;
    updateGalleryVisibility();
  });
}

// Initial call
updateGalleryVisibility();

// Lightbox Logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-caption").textContent;

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scroll
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scroll
};

lightboxClose.addEventListener("click", closeLightbox);

// Close lightbox on click outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});
// Hero Mouse Parallax Effect
const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate mouse position as a percentage from center (-1 to 1)
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // Set CSS variables for parallax elements
    hero.style.setProperty("--mouse-x", xPos.toFixed(3));
    hero.style.setProperty("--mouse-y", yPos.toFixed(3));
  });

  // Reset positions when mouse leaves
  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--mouse-x", "0");
    hero.style.setProperty("--mouse-y", "0");
  });
}

// Elite "Spotlight Reveal" for Special Programs
// Assuming 'observer' is defined elsewhere for these cards, or needs to be defined here.
// For now, I'll assume it's meant to be a new observer or a placeholder.
// If 'observer' is not defined, this block will cause an error.
// For the purpose of this edit, I'm adding the provided code as is,
// but noting the potential dependency on an 'observer' variable.
// If 'observer' is meant to be a new IntersectionObserver, it should be initialized.
// For example: const observer = new IntersectionObserver(callback, options);
const specialCards = document.querySelectorAll(".special-card");
if (specialCards.length > 0) {
  const specialCardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active"); // Assuming a class like this
          specialCardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  specialCards.forEach((card) => {
    specialCardObserver.observe(card);
  });
}

// Elite "Curtain Rise" for Footer
const footerContent = document.querySelector(".footer-content");
if (footerContent) {
  const footerChildren = Array.from(footerContent.children); // select direct children elements
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply class to all children with staggered transition handled in CSS
          footerChildren.forEach((child) =>
            child.classList.add("reveal-active")
          );
          footerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  footerObserver.observe(footerContent);
}

// Program Card Spotlight Effect
const programCards = document.querySelectorAll(".program-card");
programCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--program-x", `${x}%`);
    card.style.setProperty("--program-y", `${y}%`);
  });
});

// Skill Levels Progress Line ("The Journey")
const levelsSection = document.querySelector(".skill-levels");
const levelsProgressBar = document.getElementById("levelsProgressBar");

if (levelsSection && levelsProgressBar) {
  window.addEventListener("scroll", () => {
    const sectionTop = levelsSection.offsetTop;
    const sectionHeight = levelsSection.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Start filling when section enters viewport
    // Adjustment: start filling a bit earlier
    const startPoint = sectionTop - windowHeight * 0.7;
    const endPoint = sectionTop + sectionHeight - windowHeight * 0.3;

    let progress = ((scrollY - startPoint) / (endPoint - startPoint)) * 100;
    progress = Math.max(0, Math.min(100, progress));

    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      levelsProgressBar.style.width = `${progress}%`;
      levelsProgressBar.style.height = "100%";
    } else {
      levelsProgressBar.style.height = `${progress}%`;
      levelsProgressBar.style.width = "100%";
    }
  });
}
