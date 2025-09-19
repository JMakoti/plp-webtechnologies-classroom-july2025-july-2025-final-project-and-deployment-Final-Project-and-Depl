// File: js/index.js
// JavaScript for DriveEasy Kenya website functionality
//Home page Image Transition
const images = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1613859492095-85d9944f09f6?q=80&w=1287&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=931&auto=format&fit=crop&w=600&h=400&q=80",
];

let currentIndex = 0;
const carImage = document.getElementById("carImage");

setInterval(() => {
  carImage.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    carImage.src = images[currentIndex];
    carImage.style.opacity = 1;
  }, 1000); // match CSS transition duration
}, 30000); // 30 seconds


//Display the mobile menu when Clicked
document.addEventListener("DOMContentLoaded", () =>{

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      e.target !== mobileMenuBtn
    ) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Single-page navigation
  function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll(".page-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Update navigation active states
    const navLinks = document.querySelectorAll(
      ".nav-link, .mobile-nav a, .footer-links a"
    );
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const activeLinks = document.querySelectorAll(
      `[data-section="${sectionId}"]`
    );
    activeLinks.forEach((link) => {
      link.classList.add("active");
    });

    // Close mobile menu
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";

    // Scroll to top
    window.scrollTo(0, 0);
  }

  // Navigation event listeners
  document.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-section")) {
      e.preventDefault();
      const sectionId = e.target.getAttribute("data-section");
      showSection(sectionId);
    }
  });

  // Car filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car-card[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter cars
      carCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Scroll animations
  function animateOnScroll() {
    const animateElements = document.querySelectorAll(".scroll-animate");

    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run on load

  // Form validation and submission
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      const requiredFields = this.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#dc3545";
        } else {
          field.style.borderColor = "#dee2e6";
        }
      });

      // Date validation
      const pickupDate = document.getElementById("pickupDate");
      const dropoffDate = document.getElementById("dropoffDate");

      if (pickupDate.value && dropoffDate.value) {
        const pickup = new Date(pickupDate.value);
        const dropoff = new Date(dropoffDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pickup < today) {
          alert("Pickup date cannot be in the past.");
          isValid = false;
        }

        if (dropoff <= pickup) {
          alert("Drop-off date must be after pickup date.");
          isValid = false;
        }
      }

      if (isValid) {
        alert(
          "Asante! Thank you for your booking request! We will contact you within 2 hours to confirm your reservation."
        );
        this.reset();
      } else {
        alert("Please fill in all required fields correctly.");
      }
    });
  }

  // Set minimum date for date inputs
  const today = new Date().toISOString().split("T")[0];
  const pickupDate = document.getElementById("pickupDate");
  const dropoffDate = document.getElementById("dropoffDate");

  if (pickupDate) pickupDate.min = today;
  if (dropoffDate) dropoffDate.min = today;

  // Update dropoff minimum date when pickup changes
  if (pickupDate && dropoffDate) {
    pickupDate.addEventListener("change", function () {
      dropoffDate.min = this.value;
      if (dropoffDate.value && dropoffDate.value <= this.value) {
        dropoffDate.value = "";
      }
    });
  }
});
