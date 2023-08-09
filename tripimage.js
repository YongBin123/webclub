document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(function(cell) {
      const text = cell.querySelector('p');

      cell.addEventListener('mouseenter', function() {
        text.style.visibility = 'visible';
      });

      cell.addEventListener('mouseleave', function() {
        text.style.visibility = 'hidden';
      });
    });
  });
  
  function goBefore() {
    window.location.href = "trip.html";
  }