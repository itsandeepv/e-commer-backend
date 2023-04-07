const { Add_brand, get_brand, update_brand } = require("../Controllar/brandCtrl");

const router = require("express").Router();

const createbrandRoute= router.post("/add-brand" ,Add_brand)
const getAllbrandRoute= router.get("/get-brand/all" ,get_brand)
const updatebrandRoute= router.put("/update-brand/:id" ,update_brand)
// const deletebrandRoute= router.delete("/delete-brand/:id" ,delete_brand)



module.exports = {createbrandRoute ,getAllbrandRoute ,updatebrandRoute }

