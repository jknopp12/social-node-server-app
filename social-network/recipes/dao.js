import model from "./model.js";
export const createRecipe = (recipe) => {
    delete recipe._id
    return model.create(recipe);
  }  
export const findAllRecipes = () => model.find();
export const findRecipesById = (recipeId) => model.findById(recipeId);
export const updateRecipe = (recipeId, recipe) =>  model.updateOne({ _id: recipeId }, { $set: recipe });
export const deleteRecipe = (recipeId) => model.deleteOne({ _id: recipeId });
export const findRecipeByUser = (userId) => model.find({user: userId});