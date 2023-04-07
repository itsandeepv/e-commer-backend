const { Add_category, Get_category, update_category, delete_category } = require("../Controllar/categoryCrl");

const router = require("express").Router();

const categoryRoute= router.post("/add-category" ,Add_category)
const getAllcategoryRoute= router.get("/get-category/all" ,Get_category)
const updatecategoryRoute= router.put("/update-category/:id" ,update_category)
const deletecategoryRoute= router.delete("/delete-category/:id" ,delete_category)



module.exports = {categoryRoute ,getAllcategoryRoute ,updatecategoryRoute ,deletecategoryRoute}

