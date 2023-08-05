document.addEventListener('DOMContentLoaded', function () {
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  let selectedRating = 0;

  // 서버에서 리뷰 목록을 가져옴 (로컬 스토리지와 동기화)
  loadReviewsFromServer();

  // 로컬 스토리지에서 리뷰 목록을 가져옴
  displayReviewsFromLocalStorage();

  // 리뷰 목록을 가져와서 화면에 표시하는 함수
  function displayReview(reviewData) {
    const li = document.createElement('li');

    const reviewInfo = document.createElement('span');
    reviewInfo.textContent = reviewData.place + ': ' + reviewData.review;
    li.appendChild(reviewInfo);

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('star-rating');
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.textContent = '★';

      if (i <= reviewData.rating) {
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
      const reviewId = reviewData.id;

      fetch('/deleteReview/' + reviewId, {
        method: 'DELETE',
      })
        .then(response => response.text()) // 서버로부터 받은 응답을 텍스트 형식으로 변환
        .then(data => {
          console.log(data); // 서버에서 반환된 응답 데이터를 콘솔에 출력

          const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]'); // 로컬 스토리지에서 'reviews' 키에 저장된 데이터를 가져옴
          const updatedReviews = savedReviews.filter(review => review.id !== reviewId); // 해당 리뷰 ID를 가진 리뷰를 로컬 스토리지에서 삭제한 새로운 리뷰 목록을 생성
          localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // 새로운 리뷰 목록을 다시 로컬 스토리지에 저장

          li.remove();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

    reviewList.appendChild(li);
  }

  // 리뷰를 서버에 저장하는 함수
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
        console.log(data); // 서버에서 반환된 응답 데이터를 콘솔에 출력
        displayReview(formData);
        resetForm();
      })
      .catch(error => {
        console.error('오류:', error);
      });
  }

  // 리뷰를 로컬 스토리지에 저장하는 함수
  function saveReviewToLocalStorage(formData) {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]'); // 로컬 스토리지에서 'reviews' 키에 저장된 데이터를 가져옴
    savedReviews.push(formData); // 새로운 리뷰 데이터를 로컬 스토리지에 있는 리뷰 목록 배열에 추가
    localStorage.setItem('reviews', JSON.stringify(savedReviews)); // 새로운 리뷰 목록을 다시 로컬 스토리지에 'reviews' 키로 저장
  }

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

    // 리뷰를 서버에 저장
    saveReviewToServer(formData);

    // 리뷰를 로컬 스토리지에 저장
    saveReviewToLocalStorage(formData);
  });

  // 별점 선택 기능
  const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach(star => {
    star.addEventListener('click', function () {
      selectedRating = this.dataset.value; // 클릭된 별의 값을 가져와서 현재 선택된 별점으로 설정
      const parent = this.parentElement; // 클릭된 별의 부모 요소(.star-rating)에서 모든 별 요소들을 선택
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

// 서버로부터 리뷰 목록을 가져와서 화면에 표시하는 함수
function loadReviewsFromServer() {
  fetch('/getReviews', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('reviews', JSON.stringify(data));

      data.forEach(reviewData => {
        displayReview(reviewData);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// 로컬 스토리지에서 리뷰 목록을 가져와서 화면에 표시하는 함수
function displayReviewsFromLocalStorage() {
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  savedReviews.forEach(reviewData => {
    displayReview(reviewData);
  });
}
});

// 리뷰 입력 폼을 초기화하는 함수
function resetForm() {
  const placeInput = document.getElementById('place');
  const reviewInput = document.getElementById('review');

  placeInput.value = '';
  reviewInput.value = '';
}

function deleteMemo() {
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