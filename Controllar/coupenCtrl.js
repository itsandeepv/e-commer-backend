
const Coupen = require("../models/copanModal")


const createCoupen = async (req,res)=>{
    try {
        const coupen = await Coupen.create(req.body)
        res.status(500).json({
           message:"Coupen Created Succesfully",
           coupen
        })
        
    } catch (error) {
        res.status(500).json({
            error : "there is some error " +error
        })
    }
}

const getCoupen = async (req,res)=>{
    try {
        const coupen = await Coupen.find()
        res.status(500).json({
           coupen
        })
        
    } catch (error) {
        res.status(500).json({
            error : "there is some error " +error
        })
    }
}

const updateCoupen = async (req,res)=>{
    const {id} = req.params
    try {
        const updatecoupen = await Coupen.findByIdAndUpdate(id,req.body,{new :true})
        res.status(500).json({
            message :"Coupen Udated succesfully",
            updatecoupen
        })
        
    } catch (error) {
        res.status(500).json({
            error : "there is some error " +error
        })
    }
}

const deleteCoupen = async (req,res)=>{
    const {id} = req.params
    try {
       
        const updatecoupen = await Coupen.findByIdAndDelete(id)
        res.status(500).json({
            message :"Coupen delated succesfully",
            updatecoupen
        })
    } catch (error) {
        res.status(500).json({
            error : "there is some error " +error
        })
    }
}

module.exports = {createCoupen ,getCoupen ,deleteCoupen,updateCoupen}