window.addEventListener('DOMContentLoaded', () => {
  // 페이지가 로드될 때 서버에서 메모 가져오기
  fetch('/getMemos')
    .then((response) => response.json())
    .then((memos) => {
      memos.forEach((memo) => {
        createMemoElement(memo);
      });
    });

  loadMemosFromLocalStorage();
});

function createMemoElement(memo) {
  var memoDiv = document.createElement('div');
  memoDiv.classList.add('memo-item');
  memoDiv.id = memo.id; // 메모의 id를 요소의 id로 설정

  var memoContent = document.createElement('p');
  memoContent.textContent = memo.content;

  var deleteButton = document.createElement('span'); // 버튼을 span으로 변경
  deleteButton.classList.add('delete-btn'); // delete-btn 클래스 추가
  deleteButton.textContent = '삭제';
  deleteButton.onclick = function () {
    deleteMemoOnServer(memo.id); // 서버에서 메모 삭제 요청
  };

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  buttonGroup.appendChild(memoContent);
  buttonGroup.appendChild(deleteButton);

  memoDiv.appendChild(buttonGroup);

  var savedMemos = document.getElementById('savedMemos');

  savedMemos.appendChild(memoDiv);
}

function loadMemosFromLocalStorage() {
  // 'memos'라는 키로 저장된 데이터를 로컬 스토리지에서 가져옴
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]'); // 만약 'memos' 키에 저장된 데이터가 없으면 빈 배열로 초기화
  savedMemos.forEach((memo) => {
    // 가져온 메모들을 순회하면서 각각의 메모를 화면에 표시하는 함수
    createMemoElement(memo);
  });
}

function deleteMemoOnServer(memoId) {
  fetch(`/deleteMemo/${memoId}`, {
    method: 'DELETE',
  })
    .then((response) => response.text())
    .then(() => {
      // 서버에서 메모 삭제 성공 시, 화면에서도 메모 삭제
      var memoDiv = document.getElementById(memoId);
      if (memoDiv) {
        memoDiv.remove();
        deleteMemoFromLocalStorage(memoId); // 로컬 스토리지에서도 메모 삭제
      }
    })
    .catch((error) => {
      console.error('서버와의 통신 중 오류가 발생했습니다:', error);
    });
}

function deleteMemoFromLocalStorage(memoId) {
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]'); // 로컬 스토리지에서 메모를 가져옴
  const updatedMemos = savedMemos.filter((memo) => memo.id !== memoId); // 해당 메모를 제외한 나머지 메모들로 새로운 배열을 생성
  localStorage.setItem('memos', JSON.stringify(updatedMemos)); // 새로운 배열을 다시 로컬 스토리지에 저장
}

function saveMemo() {
  var memoText = document.getElementById('memoText').value;

  if (memoText !== '') {
    // 새 메모 객체 생성
    const newMemo = { id: Date.now().toString(), content: memoText }; // newMemo 객체에 id와 content 저장

    // 서버로 메모 저장 요청 보내기
    fetch('/saveMemo', {
      method: 'POST', // 서버에 데이터를 제출
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 데이터가 JSON 형식임을 서버에 알림
      },
      body: JSON.stringify(newMemo), // 요청 본문에 새 메모 객체 newMemo를 JSON 문자열로 변환하여 포함시킴
    })
      .then((response) => response.text())
      .then(() => {
        // 저장 성공 시, 화면에 메모 표시
        createMemoElement(newMemo);

        document.getElementById('memoText').value = '';

        // 로컬 스토리지에 메모 저장
        saveMemoToLocalStorage(newMemo);
      });
  }
}

function saveMemoToLocalStorage(memo) {
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]'); // 만약 'memos' 키에 저장된 데이터가 없으면 빈 배열로 초기화
  savedMemos.push(memo);
  localStorage.setItem('memos', JSON.stringify(savedMemos)); // savedMemos 배열을 JSON 문자열로 변환한 뒤, 'memos' 키에 해당 문자열을 로컬 스토리지에 저장
}

function deleteMemo() {
  document.getElementById('memoText').value = '';
}

function goBack() {
  window.open('trip.html');
  window.close();
}

