
  // Wait for the DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.getElementById("preloader");
    var content = document.getElementById("content");

    // After 3 seconds, fade out the preloader and fade in the content
    setTimeout(function() {
      preloader.style.opacity = "0"; /* Zmniejszamy przezroczystość na 0 */
      preloader.style.pointerEvents = "none"; /* Wyłączamy interakcję z preloaderem */

      content.style.opacity = "1"; /* Pokazujemy zawartość strony z przezroczystością 1 */
    },2000);
  //⬆️2000

    setTimeout(function() {
      preloader.style.display = "none"; /* Ukrywamy preloader */
    },3000);
  //⬆️3000 
  });