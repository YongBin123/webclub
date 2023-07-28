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

    const newPost = {
      id: Date.now().toString(),
      username: username,
      title: title,
      content: content,
      date: getFormattedDate()
    };

    createPostElement(newPost);

    savePostToServer(newPost);
    savePostToLocalStorage(newPost);

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

  // 서버에 글 저장하기
  function savePostToServer(post) {
    fetch('/savePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // 서버에서 글 목록 가져와서 화면에 표시하기
  function loadPostsFromServer() {
    fetch('/getPosts')
      .then((response) => response.json())
      .then((posts) => {
        posts.forEach((post) => {
          createPostElement(post);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function createPostElement(post) {
    const li = document.createElement('li');
    const postInfo = document.createElement('span');
    postInfo.classList.add('post-info');
    postInfo.innerHTML = `<strong>${post.username}</strong> - ${post.date}`;
    li.appendChild(postInfo);

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    li.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.textContent = post.content;
    li.appendChild(postContent);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
      deletePostFromServer(post.id);
      deletePostFromLocalStorage(post.id);
      li.remove();
    });
    li.appendChild(deleteButton);

    postList.appendChild(li);
  }

  // 글 삭제하기
  function deletePostFromServer(postId) {
    fetch(`/deletePost/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // 로컬 스토리지에 글 저장하기
  function savePostToLocalStorage(post) {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    savedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
  }

  // 로컬 스토리지에서 글 불러오기
  function loadPostsFromLocalStorage() {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    savedPosts.forEach((post) => {
      createPostElement(post);
    });
  }

  function deletePostFromLocalStorage(postId) {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.filter((post) => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
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

  loadPostsFromServer();
  loadPostsFromLocalStorage();
  updatePagination();
});

function deleteMemo() {
  document.getElementById('username').value = '';
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}

function goBack() {
  window.open('trip.html');
  window.close();
}
