window.addEventListener('DOMContentLoaded', () => {
  // 페이지가 로드될 때 서버에서 메모 가져오기
  fetch('/getMemos') // 서버에 '/getMemos' 경로로 요청을 보내서 메모를 가져옴
    .then((response) => response.json()) // 서버 응답은 json 형식으로
    .then((memos) => { // json 데이터 처리
      memos.forEach((memo) => {
        var memoDiv = document.createElement("div");
        memoDiv.classList.add("memo-item");

        var memoContent = document.createElement("p");
        memoContent.textContent = memo.content;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.onclick = function () {
          memoDiv.remove();
        };

        var buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");
        buttonGroup.appendChild(memoContent);
        buttonGroup.appendChild(deleteButton);

        memoDiv.appendChild(buttonGroup);

        var savedMemos = document.getElementById("savedMemos");

        savedMemos.appendChild(memoDiv);
      });
    });

  // 로컬 스토리지에서 메모 불러오기
  loadMemosFromLocalStorage();  // 로컬 스토리지에 저장된 메모를 가져와서 화면에 표시하는 함수
});

function loadMemosFromLocalStorage() {
  // 'memos'라는 키로 저장된 데이터를 로컬 스토리지에서 가져옴
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]');   // 만약 'memos' 키에 저장된 데이터가 없으면 빈 배열로 초기화
  savedMemos.forEach((memo) => { // 가져온 메모들을 순회하면서 각각의 메모를 화면에 표시하는 함수
    createMemoElement(memo);
  });
}

function createMemoElement(memo) {
  var memoDiv = document.createElement("div");
  memoDiv.classList.add("memo-item");

  var memoContent = document.createElement("p");
  memoContent.textContent = memo.content;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.onclick = function () {
    // 삭제 버튼 클릭 시 메모를 삭제하고 로컬 스토리지에 반영
    var savedMemos = JSON.parse(localStorage.getItem('memos') || '[]'); // 로컬 스토리지에서 'memos' 키에 저장된 데이터를 가져옴
    // 삭제할 메모의 인덱스를 찾기 위해 배열 내에서 해당 메모의 인덱스를 찾음
    var index = savedMemos.findIndex((item) => item.content === memo.content);
    // 인덱스가 유효한 경우 (메모가 존재하는 경우) 해당 메모를 배열에서 제거
    if (index !== -1) {
      savedMemos.splice(index, 1); // 해당 인덱스에 위치한 메모 하나를 배열에서 제거
      // 변경된 메모 배열을 다시 로컬 스토리지에 'memos' 키로 저장하여 변경 내용 반영
      localStorage.setItem('memos', JSON.stringify(savedMemos));
    }

    // 메모 요소를 화면에서도 삭제
    memoDiv.remove();
  };

  var buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");
  buttonGroup.appendChild(memoContent);
  buttonGroup.appendChild(deleteButton);

  memoDiv.appendChild(buttonGroup);

  var savedMemos = document.getElementById("savedMemos");

  savedMemos.appendChild(memoDiv);
}

function saveMemo() {
  var memoText = document.getElementById("memoText").value;

  if (memoText !== "") {
    // 새 메모 객체 생성
    const newMemo = { content: memoText }; // newMemo 객체에 content라는 키로 memoText 저장

    // 서버로 메모 저장 요청 보내기
    fetch('/saveMemo', {
      method: 'POST', // 서버에 데이터를 제출
      headers: {
        'Content-Type': 'application/json',  // 요청 본문의 데이터가 JSON 형식임을 서버에 알림
      },
      body: JSON.stringify(newMemo), // 요청 본문에 새 메모 객체 newMemo를 JSON 문자열로 변환하여 포함시킴
    })
      .then((response) => response.text())
      .then(() => {
        // 저장 성공 시, 화면에 메모 표시
        var memoDiv = document.createElement("div");
        memoDiv.classList.add("memo-item");

        var memoContent = document.createElement("p");
        memoContent.textContent = memoText;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.onclick = function () {
          memoDiv.remove();
        };

        var buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");
        buttonGroup.appendChild(memoContent);
        buttonGroup.appendChild(deleteButton);

        memoDiv.appendChild(buttonGroup);

        var savedMemos = document.getElementById("savedMemos");

        savedMemos.appendChild(memoDiv);

        document.getElementById("memoText").value = "";

        // 로컬 스토리지에 메모 저장
        saveMemoToLocalStorage(newMemo);
      });
  }
}

function saveMemoToLocalStorage(memo) {
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]');  // 만약 'memos' 키에 저장된 데이터가 없으면 빈 배열로 초기화
  savedMemos.push(memo);
  localStorage.setItem('memos', JSON.stringify(savedMemos)); // savedMemos 배열을 JSON 문자열로 변환한 뒤, 'memos' 키에 해당 문자열을 로컬 스토리지에 저장
}

function deleteMemo() {
  document.getElementById("memoText").value = "";
}

function goBack() {
  window.open("trip.html");
  window.close();
}
