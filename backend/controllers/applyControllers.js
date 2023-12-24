const asyncHandler = require("express-async-handler");
const applyModels = require("../models/applyModels");

const createApply = asyncHandler(async (req, res) => {
  const { applyName, applyEmail, applyPhone, applyClass, applyCourse } =
    req.body;

  const apply = await applyModels.create({
    applyName,
    applyEmail,
    applyPhone,
    applyClass,
    applyCourse,
  });
  res.status(200).json(apply);
});

const getApply = asyncHandler(async (req, res) => {
  const applies = await applyModels.find();
  res.status(200).json(applies);
});

const deleteApply = asyncHandler(async (req, res) => {
  const apply = await applyModels.findById(req.params.id);
  console.log(req.params.id);
  if (!apply) {
    res.status(404);
    throw new Error("Apply not found");
  }

  await applyModels.deleteOne({ _id: req.params.id });
  res.status(200).json(apply);
});

module.exports = { createApply, getApply, deleteApply };
