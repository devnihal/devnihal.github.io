section = "home";
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const body = document.querySelector('body');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });
  }

  if (window.innerWidth > 768) {
    window.location.hash = "";
    const customScrollbar = document.getElementById("custom-scrollbar");
    let hideTimeout;
    let isDragging = false;

    // Helper function to clamp values
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    // Update the thumb position based on scroll
    const updateThumb = () => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (contentHeight <= viewportHeight) {
        // Hide scrollbar if content fits
        customScrollbar.classList.remove("visible");
        customScrollbar.style.setProperty("--thumb-height", `0px`); // Set thumb height to 0
        customScrollbar.style.setProperty("--scroll-top", `0px`); // Reset thumb position
        return;
      }

      // Calculate thumb height based on content vs viewport height
      const thumbHeight = Math.max(
        20,
        (viewportHeight / contentHeight) * viewportHeight
      );
      customScrollbar.style.setProperty("--thumb-height", `${thumbHeight}px`);

      // Calculate thumb position based on scroll position
      const scrollPercentage = window.scrollY / (contentHeight - viewportHeight);
      const thumbTop = scrollPercentage * (viewportHeight - thumbHeight);
      customScrollbar.style.setProperty("--scroll-top", `${thumbTop}px`);
    };

    // Initial thumb update
    updateThumb();
    window.addEventListener("resize", updateThumb);
    window.addEventListener("scroll", () => {
      if (!isDragging) updateThumb();
    });

    // Show/hide scrollbar on mouse movement
    document.addEventListener("mousemove", (e) => {
      const edgeThreshold = 20;
      const isNearEdge = e.clientX >= window.innerWidth - edgeThreshold;

      if (isNearEdge || isDragging) {
        clearTimeout(hideTimeout);
        customScrollbar.classList.add("visible");
      } else if (!isDragging) {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          customScrollbar.classList.remove("visible");
        }, 1500);
      }
    });

    // Handle thumb dragging
    customScrollbar.addEventListener("mousedown", (e) => {
      const thumbHeight = parseFloat(
        getComputedStyle(customScrollbar).getPropertyValue("--thumb-height")
      );
      const thumbTop = parseFloat(
        getComputedStyle(customScrollbar).getPropertyValue("--scroll-top")
      );

      // Check if the click is on the thumb
      if (e.clientY >= thumbTop && e.clientY <= thumbTop + thumbHeight) {
        isDragging = true;

        // Calculate the offset from the top of the thumb
        const clickOffset = e.clientY - thumbTop;

        const onMouseMove = (moveEvent) => {
          if (!isDragging) return;

          const newY = moveEvent.clientY - clickOffset;
          const trackHeight = customScrollbar.offsetHeight;

          // Clamp the new thumb position within the track bounds
          const newThumbTop = clamp(newY, 0, trackHeight - thumbHeight);
          customScrollbar.style.setProperty("--scroll-top", `${newThumbTop}px`);

          // Prevent division by zero if thumb fills the track
          if (trackHeight - thumbHeight <= 0) {
            return;
          }

          // Calculate the scroll position based on thumb position within the track
          const scrollableAreaHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercentage = newThumbTop / (trackHeight - thumbHeight);
          const scrollPosition = scrollPercentage * scrollableAreaHeight;

          window.scrollTo(0, scrollPosition);
        };

        const onMouseUp = (moveEvent) => {
          isDragging = false;
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);

          // Hide scrollbar after a delay if not near the edge
          const edgeThreshold = 20;
          if (moveEvent.clientX < window.innerWidth - edgeThreshold) {
            hideTimeout = setTimeout(() => {
              customScrollbar.classList.remove("visible");
            }, 1500);
          }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    });
  }
});

let isClicking = false;

function scrollTrigger(e) {
  let homePage = document.querySelector("#home");
  const aboutPage = document.querySelector("#aboutme");
  if (homePage.getBoundingClientRect().y < -10) {
    document.querySelector(".learn-about-me-button").style.transform =
      "translate(-50%,0)";
  } else {
    document.querySelector(".learn-about-me-button").style.transform =
      "translate(-50%,-100%)";
  }
  const scrollValue =
    1 - aboutPage.getBoundingClientRect().y / window.innerHeight;
  document.querySelector(".circle").style.top = `${9.28 * (1 - scrollValue)}vh`;
  document.querySelector(
    ".main-title"
  ).style.transform = `translate(-50%, -50%)scale(${1 - 0.1 * Math.min(scrollValue, 1)}
  )`;
  document.querySelector(
    ".bt-txt "
  ).style.transform = `translate(-50%, -100%)scale(${1 - 0.3 * Math.min(scrollValue, 1)}
  )`;
  let avatarHead = document.querySelector(".abt-avatar");
  avatarHead.style.transform = `rotate(${(1 - Math.min(scrollValue, 1)) * -90
    }deg)translateY(${300 * (1 - Math.min(scrollValue, 1))}px)`;
  avatarHead.style.opacity = Math.min(scrollValue, 1);
  document.querySelector(".stroke-fill-text").style.opacity =
    (Math.min(scrollValue, 1) - 0.3) / 0.7;
  let pathLength = document
    .querySelector(".stroke-fill-text")
    .getComputedTextLength();
  document.querySelector(".stroke-fill-text").style.strokeDasharray =
    pathLength;
  document.querySelector(".stroke-fill-text").style.strokeDashoffset =
    pathLength * (1 - Math.min(scrollValue, 1));
  document.querySelector(".my-vision-title").style.opacity =
    Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5;
  document.querySelector(".my-vision-title").style.transform = `
      translateY(${(1 - Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5) * 100
      }px)`;
  document.querySelector(".my-vision-content").style.opacity =
    Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5;
  document.querySelector(".my-vision-content").style.transform = `
      translateY(${(1 - Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5) * 150
      }px)`;
  document.querySelector(".my-mission-title").style.opacity =
    Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5;
  document.querySelector(".my-mission-title").style.transform = `
      translateY(${(1 - Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5) * 200
      }px)`;
  document.querySelector(".my-mission-content").style.opacity =
    Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5;
  document.querySelector(".my-mission-content").style.transform = `
      translateY(${(1 - Math.max(Math.min(scrollValue, 1) - 0.5, 0) / 0.5) * 250
      }px)`;

  if (scrollValue > 0.7) {
    document.querySelector(".fill-text-about").style.backgroundSize = `${Math.max(Math.min(Math.max(scrollValue - 0.7, 0), 0.2) / 0.2) * 100
      }% 100%`;
    document.querySelector(
      ".stroke-fill-text"
    ).style.fill = `rgba(255,255,255,${(scrollValue - 0.7) / 0.3})`;
  } else {
    document.querySelector(".stroke-fill-text").style.fill = "transparent";
    document.querySelector(".fill-text-about").style.backgroundSize = `0% 100%`;
  }

  if (!isClicking) {
    updateSliderBasedOnScroll();
  }

  let scrollValue2 =
    document.querySelector("#myskills").getBoundingClientRect().y /
    window.innerHeight;
  let skillTitle = document.querySelector("#myskills .my-skills-title");
  skillTitle.style.opacity = 1 - scrollValue2;
  skillTitle.style.transform = `translateY(${Math.max(scrollValue2, 0) * 100
    }px)`;
  if (scrollValue2 < 0.35) {
    // console.log("yes");
    document.querySelectorAll(".skill-card").forEach((item) => {
      item.classList.remove("hidden");
    });
  } else {
    document.querySelectorAll(".skill-card").forEach((item) => {
      item.classList.add("hidden");
    });
  }

  let scrollValue3 =
    document.querySelector("#myworks").getBoundingClientRect().y /
    window.innerHeight;
  let workTitle = document.querySelector("#myworks .my-skills-title");
  workTitle.style.opacity = 1 - scrollValue3;
  workTitle.style.transform = `translateY(${Math.max(scrollValue3, 0) * 100
    }px)`;
  if (scrollValue3 < 0.35) {
    document.querySelectorAll(".work-card").forEach((item) => {
      item.classList.remove("hidden");
    });
  } else {
    document.querySelectorAll(".work-card").forEach((item) => {
      item.classList.add("hidden");
    });
  }

  let scrollValue4 =
    document.querySelector("#contact").getBoundingClientRect().y /
    window.innerHeight;
  let contactTitle = document.querySelector("#contact .my-skills-title");
  contactTitle.style.opacity = 1 - scrollValue4;
  contactTitle.style.transform = `translateY(${Math.max(scrollValue4, 0) * 100
    }px)`;
  if (scrollValue4 < 0.35) {
    document
      .querySelectorAll(
        ".contact-form input, .contact-form textarea, .contact-form button"
      )
      .forEach((item) => {
        item.classList.remove("hidden");
      });
  } else {
    document
      .querySelectorAll(
        ".contact-form input, .contact-form textarea, .contact-form button"
      )
      .forEach((item) => {
        item.classList.add("hidden");
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const successModal = document.getElementById("success-modal");
    const errorModal = document.getElementById("error-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const closeErrorModalBtn = document.getElementById("close-error-modal-btn");

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          form.reset();
          successModal.classList.remove("modal-hidden");
          successModal.classList.add("modal-show");
        } else {
          errorModal.classList.remove("modal-hidden");
          errorModal.classList.add("modal-show");
        }
      })
      .catch((error) => {
        errorModal.classList.remove("modal-hidden");
      })
      .finally(() => {
        // Re-enable button and restore original text
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      });

    closeModalBtn.onclick = function () {
      successModal.classList.add("modal-hidden");
      successModal.classList.remove("modal-show");
    };

    closeErrorModalBtn.onclick = function () {
      errorModal.classList.add("modal-hidden");
      errorModal.classList.remove("modal-show");
    };

    window.onclick = function (event) {
      if (event.target == successModal) {
        successModal.classList.add("modal-hidden");
        successModal.classList.remove("modal-show");
      }
      if (event.target == errorModal) {
        errorModal.classList.add("modal-hidden");
        errorModal.classList.remove("modal-show");
      }
    };
  }

  function updateSlider(el) {
    if (window.innerWidth <= 768) return;
    isClicking = true;
    section = el.dataset.section;
    window.location.hash = section;
    const slider = document.querySelector(".slider");
    const linkLeft = el.offsetLeft;
    const linkWidth = el.offsetWidth;

    slider.style.left = `${linkLeft - 16}px`;
    slider.style.width = `${linkWidth + 32}px`;

    setTimeout(() => {
      isClicking = false;
    }, 500); // Reset after half a second
  }

  function updateSliderBasedOnScroll() {
    if (window.innerWidth <= 768) return;
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Adjusted for nav height
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const activeLink = document.querySelector(
          `.nav-link a[data-section="${sectionId}"]`
        );
        if (activeLink) {
          const slider = document.querySelector(".slider");
          const linkLeft = activeLink.offsetLeft;
          const linkWidth = activeLink.offsetWidth;

          slider.style.left = `${linkLeft - 16}px`;
          slider.style.width = `${linkWidth + 32}px`;

          // Update URL hash without adding to history
          history.replaceState(null, null, `#${sectionId}`);
        }
      }
    });
  }
}
document.addEventListener("scroll", scrollTrigger);