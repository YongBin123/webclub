const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // 메모 페이지 요청 시 memo.html 제공
    fs.readFile(path.join(__dirname, 'memo.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/community' && req.method === 'GET') {
    // 커뮤니티 페이지 요청 시 community.html 제공
    fs.readFile(path.join(__dirname, 'community.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/getMemos' && req.method === 'GET') {
    // 저장된 메모 가져오기
    fs.readFile(path.join(__dirname, 'memos.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } else if (req.url === '/saveMemo' && req.method === 'POST') {
    // 메모 저장하기
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.readFile(path.join(__dirname, 'memos.json'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        const memos = JSON.parse(data);
        const newMemo = JSON.parse(body);
        memos.push(newMemo);
        fs.writeFile(path.join(__dirname, 'memos.json'), JSON.stringify(memos), (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }
          res.writeHead(200);
          res.end('Memo Saved');
        });
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
