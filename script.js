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

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80; // Navbar height
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

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    interest: document.getElementById("interest").value,
    message: document.getElementById("message").value,
  };

  console.log("[v0] Form submitted:", formData);

  // Show success message
  alert("Thank you for your interest! We will get back to you soon.");

  // Reset form
  contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for fade-in animations
document
  .querySelectorAll(
    ".about-card, .class-card, .level-card, .style-card, .program-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
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

// Gallery Filtering Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and add to clicked
    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

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
