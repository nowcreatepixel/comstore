
function classToggle() {
  this.classList.toggle('active');
  document.querySelector('#search-box').classList.toggle('active');
}
document.querySelector('#search-cta').addEventListener('click', classToggle);




$(document).ready(function(){
// slider//
$('.slide-holder').slick({
  arrows: true,
  dots:true,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000
});
});
