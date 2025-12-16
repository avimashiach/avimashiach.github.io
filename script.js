document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      // תוודא שהתפריט מוצג במובייל
      mobileNav.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    // סגירת התפריט בלחיצה על כל קישור
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  // --------------------
  // כפתור התקשרות מהירה
  // --------------------
  const callButton = document.querySelector(".call-now-badge");
  if (callButton) {
    callButton.addEventListener("click", () => {
      window.location.href = "tel:0507527335";
    });
  }
});
