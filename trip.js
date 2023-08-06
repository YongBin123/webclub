function login() {
  event.preventDefault();
  var loginForm = document.querySelector('.login-form');
  var id = document.getElementById('id');
  var password = document.getElementById('password');
  
  alert("로그인이 완료되었습니다!");
  id.value = "";
  password.value = "";
}

function join() {
  window.location.href = "join.html"; 
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

document.addEventListener('DOMContentLoaded', function() {
  const photoContainers = document.querySelectorAll('.photo-container');

  photoContainers.forEach(function(photoContainer) {
    const text = photoContainer.querySelector('p');

    photoContainer.addEventListener('mouseenter', function() {
      text.style.visibility = 'visible';
    });

    photoContainer.addEventListener('mouseleave', function() {
      text.style.visibility = 'hidden';
    });
  });
});

function toggleNav() {
  var article1 = document.querySelector('.article1');
  var photosContainer = document.querySelector('.photos-container');

  if (article1.style.display === "none") {
    article1.style.display = "block";
    photosContainer.style.position = "absolute";
    photosContainer.style.top = "100px";
    photosContainer.style.left = "21%";
    photosContainer.style.transform = "translateX(-50%)";
  } else {
    article1.style.display = "none";
    photosContainer.style.position = "relative";
    photosContainer.style.top = "0";
    photosContainer.style.left = "0";
    photosContainer.style.transform = "none";
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
  
function trip() {
  location.href = "seoul.html";
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

function community() {
  location.href = "community.html";
}