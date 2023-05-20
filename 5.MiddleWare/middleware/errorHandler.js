const {logEvents}=require('./logEvents')
const path=require('path')

const errorHandler=(err,req,res,next)=>{
    

    logEvents(`${err.name}: ${err.message}`, '../logs/errLog.txt')
    console.error(err.stack)
    res.status(500).send(err.message)
  }

  module.exports={errorHandler}