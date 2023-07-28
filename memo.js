function saveMemo() {
  var memoText = document.getElementById("memoText").value;

  if (memoText !== "") {
    // 새 메모 객체 생성
    const newMemo = { content: memoText };

    // 서버로 메모 저장 요청 보내기
    fetch('/saveMemo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMemo),
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

window.addEventListener('DOMContentLoaded', () => {
  // 페이지가 로드될 때 서버에서 메모 가져오기
  fetch('/getMemos')
    .then((response) => response.json())
    .then((memos) => {
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
  loadMemosFromLocalStorage();
});

function saveMemoToLocalStorage(memo) {
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]');
  savedMemos.push(memo);
  localStorage.setItem('memos', JSON.stringify(savedMemos));
}

function loadMemosFromLocalStorage() {
  const savedMemos = JSON.parse(localStorage.getItem('memos') || '[]');
  savedMemos.forEach((memo) => {
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
    var savedMemos = JSON.parse(localStorage.getItem('memos') || '[]');
    var index = savedMemos.findIndex((item) => item.content === memo.content);
    if (index !== -1) {
      savedMemos.splice(index, 1);
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

function deleteMemo() {
  document.getElementById("memoText").value = "";
}

function goBack() {
  window.open("trip.html");
  window.close();
}
