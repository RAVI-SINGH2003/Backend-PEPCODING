//benifits : 
// 1.syntax easy and simple
//2 easy routing 

const express = require('express')
const app = express()

//res.send set the headers automatically 
//when you make request to unknown route then 404 statusCode set automatically
// where as in case of node server when we hit any unknown route then route does not changed 
// and same page was visible BUT in express server error page opens which says cannot GET /..

app.get('/',(req,res)=>{
    console.log(req.url,req.method);
    // res.send('<h1>HOME</h1>')
    res.sendFile(`${__dirname}/views/index.html`);
})

app.get('/about',(req,res)=>{
    console.log(req.url,req.method);
    res.sendFile(`${__dirname}/views/about.html`);
})

//redirects
//here the status code for redirect i.e. 301 will be automaticaly set
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})
app.listen(5000,'localhost',()=>{
    console.log('server is listening at port 5000')
})

//404 page 
//use is a middleware
//upar ke sare routes agar match nahi hue to ye function chalega hi chalega
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

