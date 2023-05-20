const fs=require('fs')
const path=require('path')

// Read file
fs.readFile(path.join(__dirname,'starter.txt'),'utf-8',(err,data)=>{
    if(err) throw err;
    else console.log(data)
})

// Write file
fs.writeFile(path.join(__dirname,'reply.txt'),'Nice to meet you.',(err)=>{
    if(err) throw err;
    else console.log('Write Complete.')
})

// Update file
fs.appendFile(path.join(__dirname,'reply.txt'),'\n\n ok',(err)=>{
    if(err) throw err;
    else console.log('update complete.')
})

// Rename file
fs.rename(path.join(__dirname,'reply.txt'),path.join(__dirname,'newReply.txt'),(err)=>{
    if(err) throw err;
    else console.log('rename complete.')
})

// Delete file
fs.unlink(path.join(__dirname,'newReply.txt'),(err)=>{
    if(err) throw err;
    else console.log('delete complete.')
})


// exit on uncaught errors
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1);
})