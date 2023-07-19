function saveMemo() {
    var memoText = document.getElementById("memoText").value;
  
    if (memoText !== "") {
      var memoDiv = document.createElement("div");
      memoDiv.classList.add("memo-item");
  
      var memoContent = document.createElement("p");
      memoContent.textContent = memoText;
  
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.onclick = function() {
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
    }
  }  

function deleteMemo() {
  document.getElementById("memoText").value = "";
}

function goBack() {
    window.open("trip.html");
    window.close();
}