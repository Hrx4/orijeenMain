const asyncHandler = require("express-async-handler");
const subjectModels = require("../models/subjectModels");

const createSubject = asyncHandler(async (req, res) => {
  const { subjectName } =
    req.body;

  const classManagment = await subjectModels.create({
    subjectName
  });
  res.status(200).json(classManagment);
});

const getSubject = asyncHandler(async (req, res) => {
  const classManagment = await subjectModels.find();
  res.status(200).json(classManagment);
});

const deleteSubject = asyncHandler(async (req, res) => {
  const classManagment = await subjectModels.findById(req.params.id);
  console.log(req.params.id);
  if (!classManagment) {
    res.status(404);
    throw new Error("class not found");
  }

  await subjectModels.deleteOne({ _id: req.params.id });
  res.status(200).json(classManagment);
});

module.exports = { createSubject , getSubject , deleteSubject };
