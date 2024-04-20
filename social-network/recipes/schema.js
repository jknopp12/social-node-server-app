import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String},
    user: String,
    instructions: String,
    ingredients: String,
    // image: string
  },
  { collection: "recipes" });
export default recipeSchema;