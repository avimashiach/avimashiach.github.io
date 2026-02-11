document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
     FILTER
  ================================ */

  const filterButtons = document.querySelectorAll(".gallery-filters button");
  const galleryItems = document.querySelectorAll(".gallery figure");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === category) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    });
  });

  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");

  // פתיחה וסגירה של התפריט בלחיצה
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // סגירת התפריט באופן אוטומטי כשלוחצים על קישור (כדי שלא יפריע)
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });
  /* ===============================
     LIGHTBOX
  ================================ */

  const images = document.querySelectorAll(".gallery figure img");

  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <button class="lightbox-btn lightbox-prev">&#10094;</button>
      <img src="">
      <button class="lightbox-btn lightbox-next">&#10095;</button>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;
  const imageArray = Array.from(images);

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = imageArray[currentIndex].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => showImage(index));
  });

  function nextImage() {
    currentIndex = (currentIndex + 1) % imageArray.length;
    lightboxImg.src = imageArray[currentIndex].src;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    lightboxImg.src = imageArray[currentIndex].src;
  }

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  /* ===============================
     SWIPE MOBILE
  ================================ */

  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
  });
});

// חזור למעלה בלחיצה
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// הצגת כפתור חזור למעלה רק אחרי גלילה
const topButton = document.querySelector(".float-btn.top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.style.opacity = "1";
    topButton.style.pointerEvents = "auto";
  } else {
    topButton.style.opacity = "0";
    topButton.style.pointerEvents = "none";
  }
});

function calcPrice() {
  const typePrice = parseFloat(document.getElementById("type").value);
  const meters = parseFloat(document.getElementById("meters").value);
  const resultElement = document.getElementById("result");

  // בדיקה אם הוזן ערך תקין
  if (!meters || meters <= 0) {
    resultElement.textContent = "אנא הזן מספר מטרים תקין.";
    return;
  }

  // חישוב מחיר
  const total = typePrice * meters;

  // הצגת תוצאה עם פסיקים
  resultElement.textContent = `מחיר משוער: ${total.toLocaleString()} ₪`;
}
