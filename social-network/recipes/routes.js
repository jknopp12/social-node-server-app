import * as dao from "./dao.js";
export default function RecipeRoutes(app) {
    const createRecipe = async (req, res) => {
        const recipe = await dao.createRecipe(req.body);
        res.json(recipe);
    };
    app.post("/api/recipes", createRecipe);
    const findAllRecipes = async (req, res) => {
        const recipes = await dao.findAllRecipes();
        res.json(recipes);
    }
    app.get("/api/recipes", findAllRecipes);
    const findRecipeById = async (req, res) => {
        const recipe = await dao.findRecipeById(req.params.recipeId);
        res.json(recipe);
    };
    app.get("/api/recipes/:recipeId", findRecipeById);
    const updateRecipe = async (req, res) => {
        const { recipeId } = req.params;
        const status = await dao.updateRecipe(recipeId, req.body);
        res.json(status);
    };
    app.put("/api/recipes/:recipeId", updateRecipe);
    const deleteRecipe = async (req, res) => {
        const status = await dao.deleteRecipe(req.params.recipeId);
        res.json(status);
    };
    app.delete("/api/recipes/:recipeId", deleteRecipe);
    const findRecipeByUser = async (req, res) => {
        const { userId } = req.params;
        const recipes = await dao.findRecipeByUser(userId);
        res.json(recipes);
      };
      app.get("/api/users/:userId/recipes", findRecipeByUser);
}