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

function toggleAccordion(accordionContent) {
  var accordionContents = document.querySelectorAll('.accordion-content');

  accordionContents.forEach(function (content) {
    if (content === accordionContent) {
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    } else {
      content.style.display = 'none';
    }
  });
}
  
function region1() {
  location.href = "seoul.html";
}

function region2() {
  location.href = "gyeonggi_incheon.html";
}

function region3() {
  location.href = "daejeon_sejong_chungcheong.html";
}

function region4() {
  location.href = "busan_ulsan.html";
}

function region5() {
  location.href = "daegu_gyeongsang.html";
}

function region6() {
  location.href = "gwangju_jeolla.html";
}

function region7() {
  location.href = "gangwon.html";
}

function region8() {
  location.href = "jeju.html";
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