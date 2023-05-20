// common core modules start
const express=require('express')
const app=express()
const path=require('path')
const cors=require('cors')
const {logEvents,logger}=require('./middleware/logEvents')
const {errorHandler}=require('./middleware/errorHandler')
// common core modules end
const PORT=process.env.PORT || 3500;

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 ||!origin ) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded date
// in other words, from data:
// 'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}))

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname,'/public')))

app.get('^/$|index(.html)?',(req,res)=>{
  // res.send('Hello world!')

  // to serve file
  // res.sendFile('./views/index.html',{root:__dirname});
                  //OR
  res.sendFile(path.join(__dirname,'views','index.html'))
  })
  app.get('/new-page(.html)?',(req,res)=>{
    // res.send('Hello world!')
  
    // to serve file
    // res.sendFile('./views/index.html',{root:__dirname});
                    //OR
    res.sendFile(path.join(__dirname,'views','new-page.html'))
    })
    app.get('/old-page(.html)?',(req,res)=>{
      // res.send('Hello world!')
    
      // to serve file
      // res.sendFile('./views/index.html',{root:__dirname});
                      //OR
    res.redirect(301,'/new-page.html') // 302 by default
      })

    // Route handler
     app.get('/hello(.html)?',(req,res,next)=>{
      console.log('attempted to load hello.html')
      next()
      console.log('after next')

     },(req,res)=>{
      console.log("here i am")
      res.send('Hello World');
     })

     //chaining route hadler
     const one =(req,res,next)=>{
       console.log('one')
       next();
     }

     const two=(req,res,next)=>{
      console.log('two')
       next();
     }

     const three=(req,res,next)=>{
      console.log('three')
       res.send('Finished')
     }

     app.get('/chain(.html)?',[one,two,three])
    

    app.all('*',(req,res)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
    })
// For error handling in express
app.use(errorHandler)
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))

