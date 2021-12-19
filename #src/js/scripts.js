$(document).ready(function() {
  var header = document.querySelector(".header"),
      start_point = 0;
  
  if (header) {
    window.addEventListener("scroll", function() {
      var cur_scroll_position = window.pageYOffset || document.documentElement.scrollTop;
      start_point < cur_scroll_position ? header.classList.add("header_fill") : header.classList.remove("header_fill")
    }, false)
  }
});