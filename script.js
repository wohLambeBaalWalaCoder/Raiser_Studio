// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const mobileDrawer = document.getElementById("mobileDrawer");
const navOverlay = document.getElementById("navOverlay");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

mobileMenuBtn.addEventListener("click", () => {
  mobileDrawer.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
  if (navOverlay) navOverlay.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileDrawer.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
  });
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileDrawer.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileDrawer.classList.contains("active") &&
    !mobileDrawer.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    mobileDrawer.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
  }
});

// Close mobile menu when clicking the overlay specifically
if (navOverlay) {
  navOverlay.addEventListener("click", () => {
    mobileDrawer.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    navOverlay.classList.remove("active");
  });
}

// Navbar scroll and Scroll Spy effect
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
let isScrolling = false;
let currentId = "";

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
      document
        .querySelector(`.mobile-drawer a[href*=${sectionId}]`)
        ?.classList.add("active");
      currentId = sectionId;
    } else {
      document
        .querySelector(`.nav-menu a[href*=${sectionId}]`)
        ?.classList.remove("active");
      document
        .querySelector(`.mobile-drawer a[href*=${sectionId}]`)
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

  // Add your Web3Forms Access Key here
  data.access_key = "YOUR_ACCESS_KEY_HERE";

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

// Simplified Scroll Spy already handled in updateNavigation

// Reusable Slider Function
// Old initSlider function removed to prevent conflicts

// Initialize Sliders
initSlider("aboutSlider", "sliderDots", 3, false); // Auto-only, no manual interaction
initSlider("classesSlider", "classesDots", 0); // Manual sliding only
initSlider("stylesSlider", "stylesDots", 0); // Manual sliding only
initSlider("programsSlider", "programsDots", 0); // Manual sliding only
initSlider("pricingGrid", "pricingDots", 0);

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

// Cube Face Interaction: Voltage Pop
const cubeFaces = document.querySelectorAll(".cube-face");
cubeFaces.forEach((face) => {
  face.addEventListener("click", () => {
    if (!face.classList.contains("face-active")) {
      face.classList.add("face-active");

      // Auto-cooling sequence (2 seconds)
      setTimeout(() => {
        face.classList.remove("face-active");
      }, 2000);
    }
  });
});

// Basic Security Deterrent: Disable Right-Click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Premium Slider Synchronization with Cinematic Slow Drift & Dynamic Dots
// Premium Slider Synchronization with Cinematic Slow Drift & Dynamic Dots
// Premium Slider Synchronization with Cinematic Slow Drift & Dynamic Dots
function initSlider(sliderId, dotsId, driftSpeed = 0, allowManual = true) {
  const slider = document.getElementById(sliderId);
  const dotsContainer = dotsId ? document.getElementById(dotsId) : null;

  // Only return if slider is missing. Dots are now optional.
  if (!slider) return;

  const cards = slider.children;
  if (cards.length === 0) return;

  // Clear existing dots and dynamically generate new ones IF container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement("span");
      dot.className = i === 0 ? "dot active" : "dot";
      dot.setAttribute("data-index", i);
      dotsContainer.appendChild(dot);
    }
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];
  let animationId;
  let isInteracting = false;
  let currentScroll = slider.scrollLeft;
  let isPointerDown = false;

  // Configuration for manual vs auto-only
  if (!allowManual) {
    // slider.style.overflowX = "hidden"; // Removed to ensure JS scrolling works
    slider.style.cursor = "default";
    slider.style.touchAction = "none"; // Disable localized touch actions
  }

  const updateDots = () => {
    const scrollLeft = slider.scrollLeft;
    let activeIndex = 0;
    if (cards.length > 1) {
      const cardWidthWithGap = cards[1].offsetLeft - cards[0].offsetLeft;
      activeIndex = Math.round(scrollLeft / cardWidthWithGap);
    }

    // Safety check for activeIndex
    // If dots exist, cap index to length. Otherwise just prevent negative.
    const maxIndex = dots.length > 0 ? dots.length - 1 : cards.length - 1;
    activeIndex = Math.max(0, Math.min(activeIndex, maxIndex));

    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    }
    Array.from(cards).forEach((card, index) => {
      card.classList.toggle("active-slide", index === activeIndex);
    });
  };

  const drift = () => {
    if (isInteracting || isPointerDown) return;

    // Calculate which card to go to next
    let currentIndex = 0;
    if (cards.length > 1) {
      const cardWidthWithGap = cards[1].offsetLeft - cards[0].offsetLeft;
      currentIndex = Math.round(slider.scrollLeft / cardWidthWithGap);
    }

    // Move to next card (loop back to first if at end)
    const nextIndex = (currentIndex + 1) % cards.length;
    const targetCard = cards[nextIndex];

    if (targetCard) {
      slider.scrollTo({
        left:
          targetCard.offsetLeft -
          (slider.offsetWidth - targetCard.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  const startDrift = () => {
    if (driftSpeed <= 0) return;
    isInteracting = false;

    // Use interval for card-by-card sliding (4 seconds between slides)
    if (animationId) clearInterval(animationId);
    animationId = setInterval(drift, 4000);

    // Also run once immediately after a short delay
    setTimeout(drift, 100);
  };

  const stopDrift = () => {
    isInteracting = true;
    if (animationId) clearInterval(animationId);
    animationId = null;
  };

  slider.addEventListener("scroll", updateDots);

  // Only attach interaction listeners if manual control is allowed
  if (allowManual) {
    // Enhanced interaction detection for all pointer types (touch, mouse, pen)
    const handlePointerDown = () => {
      isPointerDown = true;
      stopDrift();
      slider.style.cursor = "grabbing";
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      slider.style.cursor = "grab";
      setTimeout(() => {
        if (driftSpeed > 0 && !isPointerDown) startDrift();
      }, 3000);
    };

    // Use pointer events for better touch support
    slider.addEventListener("pointerdown", handlePointerDown);
    slider.addEventListener("pointerup", handlePointerUp);
    slider.addEventListener("pointercancel", handlePointerUp);
    slider.addEventListener("pointerleave", handlePointerUp);

    // Fallback for older touch event support
    slider.addEventListener("touchstart", stopDrift, { passive: true });
    slider.addEventListener(
      "touchend",
      () => {
        setTimeout(() => {
          if (driftSpeed > 0) startDrift();
        }, 3000);
      },
      { passive: true }
    );

    // Mouse support
    slider.addEventListener("mousedown", handlePointerDown);
    slider.addEventListener("mouseup", handlePointerUp);
    slider.addEventListener("mouseleave", () => {
      if (isPointerDown) {
        handlePointerUp();
      }
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        stopDrift();
        const index = parseInt(dot.getAttribute("data-index"));
        const cardWidthWithGap =
          cards.length > 1
            ? cards[1].offsetLeft - cards[0].offsetLeft
            : slider.offsetWidth;
        slider.scrollTo({
          left: index * cardWidthWithGap,
          behavior: "smooth",
        });
        setTimeout(() => {
          if (driftSpeed > 0) startDrift();
        }, 3000);
      });
    });
  }

  updateDots();
  if (driftSpeed > 0) startDrift();
}

// Initialize all premium sliders - Manual sliding only (no auto-drift)
// driftSpeed is set to 0 to disable automatic sliding
initSlider("stylesSlider", "stylesDots", 0); // Manual sliding only
initSlider("programsSlider", "programsDots", 0); // Manual sliding only
initSlider("specialSlider", "specialDots", 0); // Manual sliding only
initSlider("rentSlider", "rentDots", 0); // Manual sliding only
