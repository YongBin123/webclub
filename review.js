document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');
  
    reviewForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const placeInput = document.getElementById('place');
      const reviewInput = document.getElementById('review');
      const ratingSelect = document.getElementById('rating');
  
      const place = placeInput.value;
      const review = reviewInput.value;
      const rating = ratingSelect.value;
  
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

        // 선택한 별점 숫자보다 i가 작거나 같을 때 별 표시
        if (i <= rating) {
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
      document.getElementById('rating').value = '1';
    }
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