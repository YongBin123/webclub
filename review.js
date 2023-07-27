document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  let selectedRating = 0;

  reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const placeInput = document.getElementById('place');
    const reviewInput = document.getElementById('review');
    const place = placeInput.value;
    const review = reviewInput.value;

    if (place === '' || review === '') {
      return;
    }

    const li = document.createElement('li');

    const reviewInfo = document.createElement('span');
    reviewInfo.textContent = place + ': ' + review;
    li.appendChild(reviewInfo);

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('star-rating');
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.textContent = '★';

      if (i <= selectedRating) {
        star.classList.add('active');
      }

      ratingContainer.appendChild(star);
    }
    li.appendChild(ratingContainer);

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', function() {
      li.remove();
    });
    li.appendChild(deleteBtn);

    reviewList.appendChild(li);

    resetForm();
  });

  function resetForm() {
    document.getElementById('place').value = '';
    document.getElementById('review').value = '';
    selectedRating = 0;
  }

  const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = this.dataset.value;
      const parent = this.parentElement;
      const starElements = parent.querySelectorAll('.star');

      starElements.forEach(starElement => {
        if (starElement.dataset.value <= selectedRating) {
          starElement.classList.add('active');
        } else {
          starElement.classList.remove('active');
        }
      });
    });
  });
});

function deleteMemo() {
  document.getElementById("place").value = "";
  document.getElementById('review').value = "";
  document.getElementById('rating').value = "1";
}

function goBack() {
  window.open("trip.html");
  window.close();
}
