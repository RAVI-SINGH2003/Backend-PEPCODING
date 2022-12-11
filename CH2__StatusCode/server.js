const http= require('http')
const fs = require("fs");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;

      //redirect about-me to about page

    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
       res.end();
      break;
  //error
    default:
      path += "/404.html";
      res.statusCode = 404;
  }
  fs.readFile(path, (err, fileData) => {
    res.end(fileData);
  });
});
server.listen(5000, "localhost", () => {
  console.log("Server is running at port 5000");
});
