document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  let selectedRating = 0;

  // 서버에서 리뷰 목록을 가져옴 (로컬 스토리지와 동기화)
  loadReviewsFromServer();
  loadReviewsFromLocalStorage();

  const starsContainers = document.querySelectorAll('.star-rating');
  starsContainers.forEach((container, index) => {
  const stars = container.querySelectorAll('.star');
  stars.forEach((star, starIndex) => {
    star.addEventListener('click', () => {
      selectedRating = starIndex + 1;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < selectedRating);
      });
    });
  });
});

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const placeInput = document.getElementById('place');
    const reviewInput = document.getElementById('review');
    const place = placeInput.value;
    const review = reviewInput.value;

    if (place === '' || review === '' || selectedRating === 0) {
      return;
    }

    const formData = {
      id: Date.now(), // 간단히 현재 시간을 사용하여 고유한 ID를 생성합니다.
      place: place,
      review: review,
      rating: selectedRating,
    };

    createReviewElement(formData);
    saveReviewToServer(formData);
    saveReviewToLocalStorage(formData);
    resetForm();
  });
});

function loadReviewsFromServer() {
  fetch('/getReviews', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('reviews', JSON.stringify(data));

      data.forEach(reviewData => {
        createReviewElement(reviewData);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function loadReviewsFromLocalStorage() {
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  savedReviews.forEach(reviewData => {
    createReviewElement(reviewData);
  });
}

function createReviewElement(formData) {
  const li = document.createElement('li');

  const reviewInfo = document.createElement('span');
  reviewInfo.textContent = formData.place + ': ' + formData.review;
  li.appendChild(reviewInfo);

  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('star-rating');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = '★';

    if (i <= formData.rating) {
      star.classList.add('active');
    }

    ratingContainer.appendChild(star);
  }
  li.appendChild(ratingContainer);

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '삭제';
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function () {
    const reviewId = formData.id;

    fetch('/deleteReview/' + reviewId, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);

        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const updatedReviews = savedReviews.filter(review => review.id !== reviewId);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));

        li.remove();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  reviewList.appendChild(li);
}

function saveReviewToServer(formData) {
  fetch('/saveReview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('오류:', error);
    });
}

function saveReviewToLocalStorage(formData) {
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  savedReviews.push(formData);
  localStorage.setItem('reviews', JSON.stringify(savedReviews));
}

function resetForm() {
  const placeInput = document.getElementById('place');
  const reviewInput = document.getElementById('review');

  placeInput.value = '';
  reviewInput.value = '';

  const stars = document.querySelectorAll('.star-rating');
  stars.forEach(star => {
    star.classList.remove('active');
  });

  selectedRating = 0;
}

function deleteReview() {
  document.getElementById('place').value = '';
  document.getElementById('review').value = '';
  selectedRating = 0;

  const stars = document.querySelectorAll('.star-rating');
  stars.forEach(star => {
    star.classList.remove('active');
  });
}

function goBack() {
  window.open('trip.html');
  window.close();
}