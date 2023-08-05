document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('postForm');
  const postList = document.getElementById('postList');

  // 서버에서 글 가져옴
  loadPostsFromServer();

  // 로컬 스토리지에서 글 가져옴
  loadPostsFromLocalStorage();

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

  function loadPostsFromServer() {
    fetch('/getPosts') // 서버의 '/getPosts' 경로로 GET 요청을 보냄
      .then((response) => response.json()) // 서버로부터 받은 응답을 JSON 형식으로 변환
      .then((posts) => {
        // 서버에서 받은 JSON 형식의 데이터를 순회하며 화면에 게시물을 표시
        posts.forEach((post) => {
          createPostElement(post);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  function loadPostsFromLocalStorage() {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]'); // 로컬 스토리지에서 'posts' 키에 저장된 데이터를 가져옴
    savedPosts.forEach((post) => { // 서버에서 받은 JSON 형식의 데이터를 순회하며 화면에 게시물을 표시
      createPostElement(post);
    });
  }

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 2자리 숫자로 월을 표시하는데, 한 자리 숫자일 경우 앞에 0을 붙임
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`; // "년도-월-일 시간:분" 형식의 문자열로 표시
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
      deletePostFromServer(post.id); // 서버에서 해당 게시물을 삭제하는 함수
      deletePostFromLocalStorage(post.id); // 로컬 스토리지에서 해당 게시물을 삭제하는 함수 호출
      li.remove();
    });
    li.appendChild(deleteButton);

    postList.appendChild(li);
  }

  function savePostToServer(post) {
    // 서버로 글 저장 요청 보내기
    fetch('/savePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 데이터가 JSON 형식임을 서버에 알림
      },
      body: JSON.stringify(post), // 서버에 보낼 데이터를 JSON 형식으로 변환하여 body에 설정
    })
      .then((response) => response.text()) // 서버의 응답을 텍스트 형식으로 읽음
      .then((data) => {
        // 저장 성공 시, 화면에 저장 성공 메시지 출력
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function savePostToLocalStorage(post) {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]'); // 로컬 스토리지에서 'posts' 키에 저장된 데이터를 가져옴
    savedPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(savedPosts)); // 새로운 데이터가 추가된 배열을 다시 JSON 형식으로 변환하여 'posts' 키에 저장
  }

  function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  }

  function deletePostFromServer(postId) {
    // 서버의 `/deletePost/${postId}` 경로로 DELETE 요청을 보냄
    fetch(`/deletePost/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => response.text()) // 서버로부터 받은 응답을 텍스트 형식으로 변환
      .then((data) => {
        console.log(data); // 서버에서 반환된 응답 데이터를 콘솔에 출력
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function deletePostFromLocalStorage(postId) {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]'); // 만약 'posts' 키에 저장된 데이터가 없으면 빈 배열로 초기화
    const updatedPosts = savedPosts.filter((post) => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // updatePosts 배열을 JSON 문자열로 변환한 뒤, 'posts' 키에 해당 문자열을 로컬 스토리지에 저장
  }
});

function deletePost() {
  document.getElementById('username').value = '';
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}

function goBack() {
  window.open('trip.html');
  window.close();
}
