      // Floating settings panel
      const settingsFab = document.getElementById("settingsFab");
      const settingsOverlay = document.getElementById("settingsOverlay");
      const heroSettingsBtn = document.getElementById("heroSettingsBtn");

      function toggleSettings() {
        const isActive = settingsOverlay.classList.toggle("active");
        settingsFab.classList.toggle("active", isActive);
        settingsFab.setAttribute("aria-expanded", String(isActive));
        settingsOverlay.setAttribute("aria-hidden", String(!isActive));
        document.body.style.overflow = isActive ? "hidden" : "";
      }

      settingsFab.addEventListener("click", toggleSettings);
      if (heroSettingsBtn) {
        heroSettingsBtn.addEventListener("click", toggleSettings);
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && settingsOverlay.classList.contains("active")) {
          toggleSettings();
        }
      });

      // ---- Settings: preferences (ADHD-friendly UI, floating assistant, text size, appearance) ----
      const root = document.documentElement;
      const adhdToggle = document.getElementById("adhdToggle");
      const assistantToggle = document.getElementById("assistantToggle");
      const textSizeBtns = document.querySelectorAll("[data-text-size]");
      const themeBtns = document.querySelectorAll("[data-theme-choice]");
      const floatingAssistant = document.getElementById("floatingAssistant");
      const assistantFab = document.getElementById("assistantFab");
      const assistantPopover = document.getElementById("assistantPopover");

      function applyTextSize(size) {
        root.setAttribute("data-text-size", size);
        textSizeBtns.forEach((b) =>
          b.classList.toggle("active", b.dataset.textSize === size)
        );
        localStorage.setItem("c360-text-size", size);
      }

      function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        themeBtns.forEach((b) =>
          b.classList.toggle("active", b.dataset.themeChoice === theme)
        );
        localStorage.setItem("c360-theme", theme);
      }

      function applyAdhd(on) {
        root.classList.toggle("adhd-mode", on);
        adhdToggle.checked = on;
        localStorage.setItem("c360-adhd", on ? "1" : "0");
      }

      function applyAssistant(on) {
        assistantToggle.checked = on;
        floatingAssistant.classList.toggle("active", on);
        floatingAssistant.setAttribute("aria-hidden", String(!on));
        if (!on) {
          assistantPopover.classList.remove("active");
          assistantFab.setAttribute("aria-expanded", "false");
        }
        localStorage.setItem("c360-assistant", on ? "1" : "0");
      }

      // Restore saved preferences on load
      applyTextSize(localStorage.getItem("c360-text-size") || "mid");
      applyTheme(localStorage.getItem("c360-theme") || "light");
      applyAdhd(localStorage.getItem("c360-adhd") === "1");
      applyAssistant(localStorage.getItem("c360-assistant") === "1");

      textSizeBtns.forEach((btn) =>
        btn.addEventListener("click", () => applyTextSize(btn.dataset.textSize))
      );
      themeBtns.forEach((btn) =>
        btn.addEventListener("click", () => applyTheme(btn.dataset.themeChoice))
      );
      adhdToggle.addEventListener("change", () => applyAdhd(adhdToggle.checked));
      assistantToggle.addEventListener("change", () =>
        applyAssistant(assistantToggle.checked)
      );

      assistantFab.addEventListener("click", () => {
        const isActive = assistantPopover.classList.toggle("active");
        assistantFab.setAttribute("aria-expanded", String(isActive));
      });

      document.addEventListener("click", (e) => {
        if (
          !floatingAssistant.contains(e.target) &&
          assistantPopover.classList.contains("active")
        ) {
          assistantPopover.classList.remove("active");
          assistantFab.setAttribute("aria-expanded", "false");
        }
      });

      // Role dropdown toggle
      const roleToggle = document.getElementById("roleToggle");
      const roleDropdown = document.getElementById("roleDropdown");

      roleToggle.addEventListener("click", () => {
        const isExpanded = roleToggle.getAttribute("aria-expanded") === "true";
        roleToggle.setAttribute("aria-expanded", !isExpanded);
        roleDropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !roleToggle.contains(e.target) &&
          !roleDropdown.contains(e.target)
        ) {
          roleToggle.setAttribute("aria-expanded", "false");
          roleDropdown.classList.remove("active");
        }
      });

      // Modal functionality
      const modal = document.getElementById("buildingModal");
      const modalClose = document.getElementById("modalClose");
      const mapPins = document.querySelectorAll(".map-pin");
      const modalTitle = document.getElementById("modalTitle");

      const buildingData = {
        admin: {
          name: "Admin Block",
          dept: "Administration",
          hod: "N/A",
          faculty: "N/A",
          contact: "admin@jntuh.ac.in",
          services: "Admissions, Exams, Records",
          hours: "9:30 AM – 4:30 PM",
          accessible: true,
        },
        cse: {
          name: "CSE Department",
          dept: "Computer Science & Engineering",
          hod: "Dr. Anitha Rao",
          faculty: "42 members",
          contact: "cse@jntuh.ac.in",
          services: "Wi-Fi, Lab Access, Library",
          hours: "8:00 AM – 6:00 PM",
          accessible: true,
        },
        library: {
          name: "Central Library",
          dept: "Library Services",
          hod: "Dr. M. Lakshmi",
          faculty: "18 staff",
          contact: "library@jntuh.ac.in",
          services: "Books, Journals, Digital Resources",
          hours: "8:00 AM – 8:00 PM",
          accessible: true,
        },
        auditorium: {
          name: "Auditorium",
          dept: "Events & Cultural",
          hod: "N/A",
          faculty: "N/A",
          contact: "events@jntuh.ac.in",
          services: "Events, Seminars, Performances",
          hours: "Event-based",
          accessible: true,
        },
        ece: {
          name: "ECE Department",
          dept: "Electronics & Communication",
          hod: "Dr. Suresh Kumar",
          faculty: "38 members",
          contact: "ece@jntuh.ac.in",
          services: "Wi-Fi, Lab Access",
          hours: "8:00 AM – 6:00 PM",
          accessible: true,
        },
        canteen: {
          name: "Canteen",
          dept: "Food Services",
          hod: "N/A",
          faculty: "N/A",
          contact: "canteen@jntuh.ac.in",
          services: "Food, Beverages",
          hours: "8:00 AM – 8:00 PM",
          accessible: true,
        },
        sports: {
          name: "Sports Complex",
          dept: "Physical Education",
          hod: "Dr. K. Reddy",
          faculty: "12 coaches",
          contact: "sports@jntuh.ac.in",
          services: "Gym, Courts, Athletics",
          hours: "6:00 AM – 9:00 PM",
          accessible: true,
        },
      };

      mapPins.forEach((pin) => {
        pin.addEventListener("click", () => {
          const building = pin.getAttribute("data-building");
          const data = buildingData[building];
          if (data) {
            modalTitle.textContent = data.name;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
          }
        });

        // Keyboard accessibility
        pin.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            pin.click();
          }
        });
      });

      modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });

      // Close modal on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (href !== "#") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        });
      });

      // Form submission prevention (demo)
      const ticketForm = document.querySelector(".ticket-form");
      if (ticketForm) {
        ticketForm.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Ticket submitted successfully! (Demo only)");
          ticketForm.reset();
        });
      }

      // Search functionality (demo)
      const searchInput = document.querySelector(".search-input");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          const query = e.target.value.toLowerCase();
          const listRows = document.querySelectorAll(".list-row");
          listRows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? "flex" : "none";
          });
        });
      }
    
