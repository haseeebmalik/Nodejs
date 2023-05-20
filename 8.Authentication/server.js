// common core modules start
const express=require('express')
const app=express()
const path=require('path')
const cors=require('cors')
const {logEvents,logger}=require('./middleware/logEvents')
const {errorHandler}=require('./middleware/errorHandler')
const {corsOptions}=require('./config/corsOptions')
// common core modules end
const PORT=process.env.PORT || 3500;

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded date
// in other words, from data:
// 'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}))

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/',express.static(path.join(__dirname,'/public')))

app.use('/subdir',express.static(path.join(__dirname,'/public')))

// Routes
// It will pick routes from routes folder if the request includes /subdir in its path
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))

// Routes for APIs
app.use('/register',require('./routes/api/register'))
app.use('/employees',require('./routes/api/employees'))
app.use('/auth',require('./routes/api/auth'))






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

