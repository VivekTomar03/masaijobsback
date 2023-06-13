const express = require("express")
const { JobModal } = require("../Modal/jobModal")

const jobRouter = express.Router()

jobRouter.post("/add" , async(req,res) => {
    console.log(req.body)
  
    try {
       const data = new JobModal(req.body)
       await data.save()
       res.send({
        msg:"Job Created Successfully"
       }) 
    } catch (error) {
        res.send({
            msg : "job not created",
            err:error.message
        })
    }
})

jobRouter.get("/" , async(req,res)=> {
    try {
       const data = await JobModal.find()
       res.send(data) 
    } catch (error) {
        res.send({
            msg : "job not fetched",
            err:error.message
        })
    }
})

jobRouter.get("/sort" , async(req,res) => {
    const query = req.query.sortby
    try {
        
        if(query=="asc"){
            const data = await JobModal.find().sort({"year":1})
            res.send(data)
        }
        else {
            const data = await JobModal.find().sort({"year":-1})
            res.send(data) 
        }
    } catch (error) {
        res.send({
            msg : "not able to sort",
            err:error.message
        })  
    }
})

jobRouter.get("/pagination" , async(req,res) => {
    const perPage = Number(req.query.limit)
    const page = Number(req.query.page)
    try {
       const jobs= await JobModal.find()
        .skip((perPage*page)-perPage)
        .limit(perPage)
        const count = await JobModal.countDocuments()
        res.send({
           jobs,
           currentPage:page,
           totalPage:Math.ceil(count/perPage)
        })
    } catch (error) {
        res.send({
            msg : "not able to paginate",
            err:error.message
        })  
    }
})

 jobRouter.get("/search", async(req,res) => {
    const query = req.query.q
    if(!query){
      const data = await JobModal.find()
       res.send(data) 
    }
   
    try {
       const jobs = await JobModal.find({Language: {$regex:query}}) 
       if(jobs.length<=0){
        res.send("data not found")
       }
       res.send(jobs)
    } catch (error) { 
        res.send({
            msg : "not able to find data",
            err:error.message
        })  
    }
 })

 jobRouter.get("/filter" , async(req,res) => {
    const query = req.query.role
    console.log(query)
    const data = await JobModal.find({Role:query})
    res.send(data)
 })
module.exports = {
    jobRouter
}