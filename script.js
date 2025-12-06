// קבלת האלמנטים
const popup = document.getElementById("welcome-popup");
const closeBtn = document.getElementById("close-popup");

// סגירת החלונית בלחיצה על כפתור האיקס
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// סגירת החלונית בלחיצה מחוץ לחלונית
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

// אפשרות: החלונית תופיע אוטומטית אחרי טעינת הדף
window.addEventListener("load", () => {
  popup.style.display = "flex";
});
