const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No workout with a matching id has been found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No workout has been found" });
  }
  res.status(200).json(workout);
};

// POST workouts
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Please, fill in all fields', emptyFields})
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ error: "No workout with a matching id has been found" });
    }
    const deletedWorkout = await Workout.findOneAndDelete({_id: id})
    
    if (!deletedWorkout) {
        return res.status(404).json({ error: "No workout has been found" });
    }
    res.status(200).json(deletedWorkout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ error: "No workout with a matching id has been found" });
    }
    
    const updatedWorkout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!updatedWorkout) {
        return res.status(404).json({ error: "No workout has been found" });
    }
    res.status(200).json(updatedWorkout)
}




module.exports = { createWorkout, getWorkout, getWorkouts, deleteWorkout , updateWorkout };
