document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // 기본 제출 동작을 막음.
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const fullname = document.getElementById('fullname').value;
      const phone = document.getElementById('phone').value;
  
      const userData = {
        username,
        email,
        password,
        fullname,
        phone,
      };
  
      // 서버로 데이터를 전송하는 부분
      fetch('/join', {
        method: 'POST', // 서버에서 POST 메서드를 지원하므로 POST로 변경
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.text())
        .then((message) => {
          // 알림 창으로 성공 메시지를 표시
          alert(message);
  
          form.reset();
        })
        .catch((error) => console.error('Error:', error));
    });
  });
  
function goBack() {
    window.open("trip.html");
    window.close();
}