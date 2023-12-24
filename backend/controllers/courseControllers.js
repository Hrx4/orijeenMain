const asyncHandler = require("express-async-handler");
const courseModels = require("../models/courseModels");

const cretaeCCourse = asyncHandler(async (req, res) => {
  const { courseName } =
    req.body;

  const courseManagment = await courseModels.create({
    courseName
  });
  res.status(200).json(courseManagment);
});

const getCourse = asyncHandler(async (req, res) => {
  const classManagment = await courseModels.find();
  res.status(200).json(classManagment);
});

const deleteCourse = asyncHandler(async (req, res) => {
  const classManagment = await courseModels.findById(req.params.id);
  console.log(req.params.id);
  if (!classManagment) {
    res.status(404);
    throw new Error("class not found");
  }

  await courseModels.deleteOne({ _id: req.params.id });
  res.status(200).json(classManagment);
});

module.exports = { cretaeCCourse , getCourse , deleteCourse};
