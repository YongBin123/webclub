function hideText() {
  var welcomeHeading = document.getElementById("welcomeHeading");
  var infoText = document.getElementById("infoText");
  var hideButton = document.getElementById("hideButton");
  var hideButton1 = document.getElementById("hideButton1");
  var quizButton = document.getElementById("quiz");
  var packingList = document.getElementById("packing");
  var memoList = document.getElementById("memo");
  var planner = document.getElementById("plan");
  var tripreview = document.getElementById("review");
  var navList = document.querySelector('.nav');
  var searchTerm = document.getElementById("searchTerm");
  var searchResult = document.getElementById("searchResult");

  welcomeHeading.innerHTML = "";
  infoText.style.display = "none";
  hideButton.style.display = "none";
  hideButton1.style.display = "inline-block";
  quizButton.style.display = "inline-block";
  packingList.style.display = "inline-block";
  memoList.style.display = "inline-block";
  planner.style.display = "inline-block";
  tripreview.style.display = "inline-block";
  navList.style.display = "block";
  navList.style.position = "absolute";
  navList.style.left = "50%"; // 초기 위치
  navList.style.top = "-100%"; // 초기 위치
  navList.style.transform = "translate(-50%, -100%)";  // 화면 위 (숨겨짐)
  navList.style.transition = "top 1s, transform 1s"; // 속성 변경 1초동안 천천히

  hideButton.style.transform = "translateY(100%)"; // 화면 아래 (숨겨짐)
  hideButton.style.opacity = "0";
  hideButton.style.transition = "transform 1s, opacity 1s";

  hideButton1.style.transform = "translateY(100%)";
  hideButton1.style.opacity = "0";
  hideButton1.style.transition = "transform 1s, opacity 1s";

  quizButton.style.transform = "translateY(100%)";
  quizButton.style.opacity = "0";
  quizButton.style.transition = "transform 1s, opacity 1s";

  packingList.style.transform = "translateY(100%)";
  packingList.style.opacity = "0";
  packingList.style.transition = "transform 1s, opacity 1s";

  memoList.style.transform = "translateY(100%)";
  memoList.style.opacity = "0";
  memoList.style.transition = "transform 1s, opacity 1s";

  planner.style.transform = "translateY(100%)";
  planner.style.opacity = "0";
  planner.style.transition = "transform 1s, opacity 1s";

  tripreview.style.transform = "translateY(100%)";
  tripreview.style.opacity = "0";
  tripreview.style.transition = "transform 1s, opacity 1s";
  
  // 일정 시간이 지난 후에 실행
  setTimeout(function () {
      navList.style.top = "30%"; 
      navList.style.opacity = "1"; 
      navList.style.transform = "translate(-50%, -50%)";
  }, 200);

  setTimeout(function () {
      hideButton.style.transform = "translateY(0)"; // 수직 이동하지 않고 원래 위치 유지
      hideButton.style.opacity = "1";
  }, 100);
  
  setTimeout(function () {
      hideButton1.style.transform = "translateY(0)";
      hideButton1.style.opacity = "1";
  }, 200);
  
  setTimeout(function () {
      quizButton.style.transform = "translateY(0)";
      quizButton.style.opacity = "1";
  }, 300);
  
  setTimeout(function () {
      packingList.style.transform = "translateY(0)";
      packingList.style.opacity = "1";
  }, 400);
  
  setTimeout(function () {
      memoList.style.transform = "translateY(0)";
      memoList.style.opacity = "1";
  }, 500);
  
  setTimeout(function () {
      planner.style.transform = "translateY(0)";
      planner.style.opacity = "1";
  }, 600);

  setTimeout(function () {
      tripreview.style.transform = "translateY(0)";
      tripreview.style.opacity = "1";
  }, 700);
}

function goBack() {
      var welcomeHeading = document.getElementById("welcomeHeading");
      var infoText = document.getElementById("infoText");
      var hideButton = document.getElementById("hideButton");
      var hideButton1 = document.getElementById("hideButton1");
      var quizButton = document.getElementById("quiz");
      var packingList = document.getElementById("packing");
      var memoList = document.getElementById("memo");
      var planner = document.getElementById("plan");
      var tripreview = document.getElementById("review");
      var navList = document.querySelector('.nav');
      var searchTerm = document.getElementById("searchTerm");
      var searchResult = document.getElementById("searchResult");

      welcomeHeading.innerHTML = "여행 정보 홈페이지에 오신 것을 환영합니다!";
      infoText.style.display = "block";
      hideButton.style.display = "block";
      hideButton1.style.display = "none";
      quizButton.style.display = "none";
      packingList.style.display = "none";
      memoList.style.display = "none";
      planner.style.display = "none";
      tripreview.style.display = "none";
      navList.style.display = "none";
      searchTerm.value = "";
      searchResult.value = "";
}


function search() {
  var searchTerm = document.getElementById("searchTerm").value;
  var searchResult = document.getElementById("searchResult");
  var seoulHTML = window.open("seoul.html", "_blank");

  if (seoulHTML) {
    seoulHTML.onload = function () {
      var paragraphs = seoulHTML.document.getElementsByTagName("p");
      var found = false;

      for (var i = 0; i < paragraphs.length; i++) {
        var text = paragraphs[i].innerHTML.replace(/<br>/g, " "); // <br> 태그 제거
        if (text.includes(searchTerm)) {
          searchResult.value = text;
          found = true;
          break;
        }
      }

      if (!found) {
        searchResult.value = "일치하는 정보가 없습니다.";
      }

      seoulHTML.close();
    };
  }
}

function openNewWindow(region) {
  var url;
  if (region === "서울") {
      url = "seoul.html";
  } else if (region === "경기/인천") {
      url = "gyeonggi_incheon.html";
  } else if (region === "대전/세종/충청") {
      url = "daejeon_sejong_chungcheong.html";
  } else if (region === "부산/울산") {
      url = "busan_ulsan.html";
  } else if (region === "대구/경상") {
      url = "daegu_gyeongsang.html";
  } else if (region === "광주/전라") {
      url = "gwangju_jeolla.html";
  } else if (region === "강원") {
      url = "gangwon.html";
  } else if (region === "제주") {
      url = "jeju.html";
  }
  window.open(url);
}

function memo() {
  location.href = "memo.html";
}

function quiz() {
  location.href = "quiz.html";
}

function packing() {
  location.href = "packing.html";
}

function plan() {
  location.href = "plan.html";
}

function review() {
  location.href = "review.html";
}


