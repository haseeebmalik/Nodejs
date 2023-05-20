// This is for if we want to write from a large file

const fs=require('fs')

const rs= fs.createReadStream('./starter.txt',{encoding:'utf-8'})

const ws= fs.createWriteStream('./newStarter.txt')

// rs.on('data',(dataChunk)=>{
//     ws.write(dataChunk)
// })

// or

rs.pipe(ws)