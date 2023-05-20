const fs=require('fs')

// This if will check if there is already any dir with same name
if(!fs.existsSync('./new')){
fs.mkdir('./new',(err)=>{
  if(err) throw err;
  console.log('Directory created')
})
}

// This will delete the dir if it exists
if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
      if(err) throw err;
      console.log('Directory deleted.')
    })
    }

// exit on uncaught errors
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1);
})