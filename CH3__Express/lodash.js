const http= require('http')
const fs = require("fs");
const _ = require('lodash')
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let path = "./views";
  //lodash- provides many functions
  console.log(_.random(0,20))

  const greet = _.once(() =>{
    console.log("Happy day!!")
  })
  greet();
  greet();
  

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
