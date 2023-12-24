const asyncHandler = require("express-async-handler");
const classModels = require("../models/classModels");

const cretaeClass = asyncHandler(async (req, res) => {
  const { className } =
    req.body;

  const classManagment = await classModels.create({
    className
  });
  res.status(200).json(classManagment);
});

const getClass = asyncHandler(async (req, res) => {
  const classManagment = await classModels.find();
  res.status(200).json(classManagment);
});

const deleteClass = asyncHandler(async (req, res) => {
  const classManagment = await classModels.findById(req.params.id);
  console.log(req.params.id);
  if (!classManagment) {
    res.status(404);
    throw new Error("class not found");
  }

  await classModels.deleteOne({ _id: req.params.id });
  res.status(200).json(classManagment);
});

module.exports = { cretaeClass , getClass , deleteClass };
