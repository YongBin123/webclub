document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('postForm');
  const postList = document.getElementById('postList');
  const postsPerPage = 5; // 페이지당 표시되는 글 개수
  let currentPage = 1;

  postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const username = usernameInput.value;
    const title = titleInput.value;
    const content = contentInput.value;

    if (username === '' || title === '' || content === '') {
      return;
    }

    const li = document.createElement('li');
    const postInfo = document.createElement('span');
    postInfo.classList.add('post-info');
    postInfo.innerHTML = `<strong>${username}</strong> - ${getFormattedDate()}`
    li.appendChild(postInfo);

    const postTitle = document.createElement('h3');
    postTitle.textContent = title;
    li.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.textContent = content;
    li.appendChild(postContent);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
      li.remove();
    });
    li.appendChild(deleteButton);

    postList.appendChild(li);

    resetForm();
  });

  function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  }

  // 현재 날짜와 시간을 가져오는 함수
  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // Pagination 기능
  function showPage(page) {
    const posts = postList.children;
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    for (let i = 0; i < posts.length; i++) {
      if (i >= startIndex && i < endIndex) {
        posts[i].style.display = 'block';
      } else {
        posts[i].style.display = 'none';
      }
    }
  }

  function updatePagination() {
    const posts = postList.children;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', function() {
        currentPage = i;
        showPage(currentPage);
      });
      pagination.appendChild(pageButton);
    }

    postList.appendChild(pagination);

    showPage(currentPage);
  }

  updatePagination();
});

function deleteMemo() {
  document.getElementById("username").value = "";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function goBack() {
  window.open("trip.html");
  window.close();
}