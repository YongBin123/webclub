function hideText() {
    var welcomeHeading = document.getElementById("welcomeHeading");
    var infoText = document.getElementById("infoText");
    var hideButton = document.getElementById("hideButton");
    var hideButton1 = document.getElementById("hideButton1");
    var loginForm = document.querySelector('.login-form');
    var navList = document.querySelector('.nav');
    var searchElement = document.querySelector('.search');
    var searchResultElement = document.getElementById('searchResult');
    var pElement = document.getElementById('p');
    var photos = document.querySelector('.photos');
  
    welcomeHeading.innerHTML = "";
    infoText.style.display = "none";
    hideButton.style.display = "none";
    hideButton1.style.display = "inline-block";
    loginForm.style.display = "inline-block";
    searchElement.style.display = "inline-block";
    searchResultElement.style.display = "block";
    pElement.style.display = "block";
    photos.style.display = "block";
  
    navList.style.display = "block";
    navList.style.position = "absolute";
    navList.style.left = "50%"; // 초기 위치
    navList.style.top = "-100%"; // 초기 위치
    navList.style.transform = "translate(-50%, -100%)"; // 화면 위 (숨겨짐)
    navList.style.transition = "top 1s, transform 1s"; // 속성 변경 1초동안 천천히


    loginForm.style.opacity = "0"; // 초기 투명도
    loginForm.style.transform = "translateX(-100%)"; // 왼쪽으로 숨김
    loginForm.style.transition = "opacity 1s, transform 1s"; // 속성 변경 1초동안 천천히
  
    hideButton.style.transform = "translateY(100%)"; // 화면 아래 (숨겨짐)
    hideButton.style.opacity = "0";
    hideButton.style.transition = "transform 1s, opacity 1s";
  
    hideButton1.style.transform = "translateY(100%)";
    hideButton1.style.opacity = "0";
    hideButton1.style.transition = "transform 1s, opacity 1s";

    searchElement.style.transition = "opacity 1s, transform 1s";
    searchElement.style.opacity = "0";
    searchElement.style.transform = "translateY(-100%)";

    searchResultElement.style.transition = "opacity 1s, transform 1s";
    searchResultElement.style.opacity = "0";
    searchResultElement.style.transform = "translateY(-100%)";

    photos.style.transition = "opacity 1s, transform 1s";
    photos.style.opacity = "0";
    photos.style.transform = "translateY(-100%)";

    // 일정 시간이 지난 후에 실행
    setTimeout(function () {
        loginForm.style.top = "25%";
        loginForm.style.opacity = "1"; // 로그인 폼 표시
        loginForm.style.transform = "translateX(0)"; // 오른쪽으로 이동하여 나타남
    }, 100);
  
    setTimeout(function () {
        navList.style.top = "10%"; 
        navList.style.opacity = "1"; 
        navList.style.transform = "translate(-40%, -50%)";
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
      searchElement.style.opacity = "1";
      searchElement.style.transform = "translateY(0)";
      searchResultElement.style.opacity = "1";
      searchResultElement.style.transform = "translateY(0)";
      pElement.style.opacity = "1";
      pElement.style.transform = "translateY(20%, 40%)";
      photos.style.opacity = "1";
      photos.style.transform = "translateY(0)";
    }, 300);
  }
  
function login() {
  event.preventDefault();
  var loginForm = document.querySelector('.login-form');
  var id = document.getElementById('id');
  var password = document.getElementById('password');
  
  alert("로그인이 완료되었습니다!");
  id.value = "";
  password.value = "";
}
  
function goBack() {
  var welcomeHeading = document.getElementById("welcomeHeading");
  var infoText = document.getElementById("infoText");
  var hideButton = document.getElementById("hideButton");
  var hideButton1 = document.getElementById("hideButton1");
  var loginForm = document.querySelector('.login-form');
  var navList = document.querySelector('.nav'); 
  var searchElement = document.querySelector('.search');
  var searchResultElement = document.getElementById('searchResult');
  var pElement = document.getElementById('p');
  var photos = document.querySelector('.photos');
  
  welcomeHeading.innerHTML = "여행 정보 홈페이지에 오신 것을 환영합니다!";
  infoText.style.display = "block";
  hideButton.style.display = "block";
  hideButton1.style.display = "none";
  loginForm.style.display = "none";
  navList.style.display = "none";
  searchElement.style.display = "";
  searchResultElement.style.display = "";
  pElement.style.display = "";
  photos.style.display = "none";

}
  
function search() {
  var searchTerm = document.getElementById("searchTerm");
  var searchResult = document.getElementById("searchResult");
      
  var files = ["seoul.html", "gyeonggi_incheon.html", "daejeon_sejong_chungcheong.html", "busan_ulsan.html", "daegu_gyeongsang.html", "gwangju_jeolla.html", "gangwon.html", "jeju.html"]; // 검색 대상 파일들의 배열
      
  var found = false;
      
  var searchPromises = files.map(function (file) {
    return fetch(file)
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var paragraphs = doc.getElementsByTagName("p");
      
        for (var i = 0; i < paragraphs.length; i++) {
          var text = paragraphs[i].innerHTML.replace(/<br>/g, " ");
      
          if (text.includes(searchTerm.value)) {
            searchResult.value = text;
            found = true;
            return; // 검색 결과를 찾으면 함수 종료
          }
        }
      })
      .catch(function (error) {
        console.error("파일을 가져오는 도중 오류가 발생했습니다.", error);
      });
  });
      
  Promise.all(searchPromises)
    .then(function () {
      if (!found) {
        searchResult.value = "일치하는 정보가 없습니다.";
      }
    });
      
  searchTerm.addEventListener("click", function() {
    searchTerm.value = "";
    searchResult.value = "";
  });
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