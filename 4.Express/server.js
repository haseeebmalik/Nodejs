// common core modules start
const express=require('express')
const app=express()
const path=require('path')

// common core modules end
const PORT=process.env.PORT || 3500;

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
    

    app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
      
    })
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))

