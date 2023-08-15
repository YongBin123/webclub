window.onload = function() {
  showNavList1();
}

function showNavList1() {
  var navList1 = document.querySelector('.nav_list1');
  navList1.style.display = "block"; // 'nav_list1'을 나타나게 설정
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

function toggleNav() {
  var navList1 = document.querySelector('.nav_list1');

  if (navList1.style.display === "none") {
      navList1.style.display = "block";
  } else {
      navList1.style.display = "none";
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

function showNavList1() {
  var navList1 = document.querySelector('.nav_list1');
  navList1.style.display = "block"; // 'nav_list1'을 나타나게 설정
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

function guide() {
  location.href = "guide.html";
}
  