const http = require('http');
const fs = require('fs');
const path = require('path');

/*
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
};
*/

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') { // 요청이 루트 경로 '/'에 대한 GET 메서드인 경우
    res.writeHead(200, { 'Content-Type': 'text/html' }); // 200 OK 상태와 'text/html' 콘텐츠 설정
    res.end('Hello, this is my web server!');
  } else if (req.url === '/getMemos' && req.method === 'GET') { // 요청이 '/getMemos' 경로에 대한 GET 메서드인 경우
    fs.readFile(path.join(__dirname, 'memos.json'), 'utf8', (err, data) => {  // 'memos.json' 파일을 읽어들이는 비동기 함수를 사용
    if (err) {
      res.writeHead(500); // 500 상태 코드를 설정
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' }); // 200 OK 상태와 'application/json' 콘텐츠 설정
    res.end(data); // 'data'에 저장된 JSON 데이터를 응답 본문에 작성하여 클라이언트에 전송
    });
  } else if (req.url === '/getReviews' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'reviews.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (req.url === '/saveMemo' && req.method === 'POST') {
    const chunks = []; // 요청 데이터를 읽어올 배열 생성

    req.on('data', (chunk) => {  // 요청 데이터를 chunk라는 조각으로 받아옴
      chunks.push(chunk); // 요청 데이터를 chunks 배열에 추가
    });

    // 요청 데이터 수신이 완료된 경우
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString(); // chunks 배열에 있는 데이터를 합쳐서 하나의 문자열로 만듦
      const memoData = JSON.parse(body); // 문자열로 된 요청 데이터를 JSON 형식으로 파싱하여 JavaScript 객체로 변환

      fs.readFile(path.join(__dirname, 'memos.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }

        let memos = [];
        if (data) {
          memos = JSON.parse(data); // 만약 'memos.json' 파일을 읽어온 데이터가 있다면, data를 JSON 형식으로 파싱하여 memos 배열에 저장
        }

        memos.push(memoData); // 새로운 메모 데이터를 memos 배열에 추가

        fs.writeFile(path.join(__dirname, 'memos.json'), JSON.stringify(memos), (err) => { // 새롭게 업데이트된 memos 배열을 'memos.json' 파일에 쓰기 위해 파일 쓰기 작업을 수행
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }

          res.writeHead(200);
          res.end('메모가 성공적으로 저장되었습니다!');
        });
      });
    });
  } else if (req.url === '/saveReview' && req.method === 'POST') {
    const chunks = []; // 요청 데이터를 읽어올 배열 생성
  
    req.on('data', (chunk) => {
      chunks.push(chunk); // 요청 데이터가 오는 경우 데이터를 chunks 배열에 추가
    });
  
    req.on('end', () => {
      // 요청 데이터 수신이 완료된 경우
      const body = Buffer.concat(chunks).toString(); // chunks 배열에 있는 데이터를 합쳐서 하나의 문자열로 만듦
      const reviewData = JSON.parse(body); // 문자열로 된 요청 데이터를 JSON 형식으로 파싱하여 JavaScript 객체로 변환
  
      fs.readFile(path.join(__dirname, 'reviews.json'), 'utf8', (err, data) => {
        let reviews = [];
  
        if (!err) {
          reviews = JSON.parse(data); // 에러가 없다면, data를 JSON 형식으로 파싱하여 reviews 배열에 저장
        }
  
        reviews.push(reviewData); // 새로운 리뷰 데이터를 reviews 배열에 추가
  
        fs.writeFile(path.join(__dirname, 'reviews.json'), JSON.stringify(reviews), (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }
          res.writeHead(200);
          res.end('리뷰가 성공적으로 저장되었습니다!');
        });
      });
    });
  } else if (req.url.startsWith('/deleteMemo/') && req.method === 'DELETE') { // 요청 URL이 '/deleteMemo/'로 시작하고 메서드가 DELETE인 경우
    const memoId = req.url.split('/deleteMemo/')[1]; // 요청 URL에서 메모 ID를 추출하기 위해 '/deleteMemo/'를 기준으로 문자열을 분할하고 ID 부분을 가져옴
    fs.readFile(path.join(__dirname, 'memos.json'), 'utf8', (err, data) => { // 'memos.json' 파일을 읽기 위해 fs.readFile을 사용하여 비동기적으로 파일 읽기 수행
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      let memos = JSON.parse(data); // 파일에서 읽은 데이터를 JSON 형식으로 파싱하여 메모 목록 배열을 가져옴
      memos = memos.filter(memo => memo.id !== memoId); // 메모 목록 배열에서 삭제 대상 메모를 필터링하여 해당 메모를 제외한 새로운 메모 목록 배열 생성
      fs.writeFile(path.join(__dirname, 'memos.json'), JSON.stringify(memos), (err) => { // 새로운 메모 목록 배열을 파일에 다시 씀
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200);
        res.end('메모가 성공적으로 삭제되었습니다!');
      });
    });
  } else if (req.url.startsWith('/deleteReview/') && req.method === 'DELETE') { // 요청 URL이 '/deleteReview/'로 시작하고 메서드가 DELETE인 경우
    const reviewId = req.url.split('/deleteReview/')[1]; // 요청 URL에서 리뷰 ID를 추출하기 위해 '/deleteReview/'를 기준으로 문자열을 분할하고 ID 부분을 가져옴
    fs.readFile(path.join(__dirname, 'reviews.json'), 'utf8', (err, data) => { // // 'reviews.json' 파일을 읽기 위해 fs.readFile을 사용하여 비동기적으로 파일 읽기 수행
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      let reviews = JSON.parse(data); // 파일에서 읽은 데이터를 JSON 형식으로 파싱하여 리뷰 목록 배열을 가져옴
      reviews = reviews.filter(review => review.id !== reviewId); // 리뷰 목록 배열에서 삭제 대상 리뷰를 필터링하여 해당 리뷰를 제외한 새로운 리뷰 목록 배열 생성
      fs.writeFile(path.join(__dirname, 'reviews.json'), JSON.stringify(reviews), (err) => { // 새로운 리뷰 목록 배열을 파일에 다시 씀
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200);
        res.end('리뷰가 성공적으로 삭제되었습니다!');
      });
    });
  } else if (req.url === '/getPosts' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'posts.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (req.url === '/savePost' && req.method === 'POST') {
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      const postData = JSON.parse(body);

      fs.readFile(path.join(__dirname, 'posts.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }

        let posts = [];
        if (data) {
          posts = JSON.parse(data);
        }

        posts.push(postData);

        fs.writeFile(path.join(__dirname, 'posts.json'), JSON.stringify(posts), (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }

          res.writeHead(200);
          res.end('글이 성공적으로 저장되었습니다!');
        });
      });
    });
  } else if (req.url.startsWith('/deletePost/') && req.method === 'DELETE') {
    const postId = req.url.split('/deletePost/')[1];
    fs.readFile(path.join(__dirname, 'posts.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      let posts = JSON.parse(data);
      posts = posts.filter(post => post.id !== postId);
      fs.writeFile(path.join(__dirname, 'posts.json'), JSON.stringify(posts), (err) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200);
        res.end('글이 성공적으로 삭제되었습니다!');
      });
    });
  } else if (req.url.startsWith('/public/') && req.method === 'GET') { // 요청 경로가 '/public/'로 시작하고 GET 메서드인 경우
    const filePath = path.join(__dirname, req.url); // 요청된 경로를 기반으로 실제 파일 경로를 생성
    fs.readFile(filePath, 'utf8', (err, data) => { // 파일을 읽어들이는 비동기 함수를 사용
      if (err) {
        res.writeHead(500); // 500 상태 코드 설정
        res.end('Server Error');
        return;
      }
      const contentType = getContentType(filePath); // 요청한 파일의 확장자를 기반으로 적절한 Content-Type을 결정
      res.writeHead(200, { 'Content-Type': contentType }); // 200 OK 상태 코드와 'Content-Type' 헤더를 설정하여 응답을 작성
      res.end(data); // 파일의 내용(data)을 응답 본문에 작성하여 클라이언트에 전송
    });
  } else if (req.url.endsWith('.html') && req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', req.url); // 현재 스크립트가 위치한 디렉토리 아래의 'public' 폴더와 요청된 경로를 합쳐서 실제 파일의 경로를 생성
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url.endsWith('.css') && req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.url.endsWith('.js') && req.method === 'GET') {
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(data);
    });
/*
  } else if (req.url.startsWith('/public/images/') && req.method === 'GET') {
    const imagePath = path.join(__dirname, req.url);
  
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('이미지 읽기 오류:', err);
        res.writeHead(500);
        res.end('서버 오류');
        return;
      }
  
    });
*/
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function getContentType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}

const PORT = 5500;
server.listen(PORT, () => console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`));