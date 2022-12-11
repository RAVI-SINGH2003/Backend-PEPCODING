const http = require("http");
const fs = require("fs");
const Port = 8000;
const server = http.createServer((req, res) => {
  console.log("request has been made from browser to server");
  //   console.log("this is request object :  "   req); //it is an object
  //   console.log(" this is response object : ", res);
  //   console.log(req.url);
  //   console.log(req.method);

  //   res.setHeader("Content-Type", "text/plain");
  //   res.write("Hello,Pepcoders! :)");
  //   res.end();

  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<h1> Hello Pepcoders! :)</h1>");
  //   res.write("<em> Coding karega India! :)</em>");
  //   res.end();

  //   res.setHeader("Content-Type", "text/html");
  //   fs.readFile("./index.html", (err, fileData) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       //   res.write(fileData);
  //       //   res.end();
  //       //or

  //       res.end(fileData);
  //     }
  //   });

  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      break;
    case "/about":
      path += "/about.html";
      break;
    default:
      path += "/404.html";
  }

  fs.readFile(path, (err, fileData) => {
    res.end(fileData);
  });
});

server.listen(Port, "127.0.0.1", () => {
  console.log(`Server is listening at port no  ${Port}`);
});
