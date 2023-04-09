require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const API_KEY = process.env.API_KEY;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET ALL RECIPES OR BY NAME
router.get('/', async (req, res) => {
    const { name } = req.query

    if (name) {
        const recipeInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name.toLowerCase()}&&apiKey=${API_KEY}&addRecipeInformation=true`)).data
        const recipeResponse = await recipeInfo.results.map(r => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                diets: r.diets,
                healthScore: r.healthScore
            }
        })
        try {
            (recipeResponse.length > 1) ? res.status(200).send(recipeResponse) : res.status(404).send('No se encontró resultado');
        } catch (error) {
            res.send(error)
        }
    }
    else {
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&&apiKey=${API_KEY}&addRecipeInformation=true`)).data
        const apiResponse = apiInfo.results.map(r => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                diets: r.diets,
                healthScore: r.healthScore
            }
        });

        const dbInfo = await Recipe.findAll();
        const dbApiResponse = [...dbInfo, ...apiResponse]
        try {
            res.status(200).send(dbApiResponse)
        } catch (error) {
            res.send(error)
        }
    }
});


//GET RECIPES BY ID

router.get('/:idRecipe', async (req, res) => {

    const { idRecipe } = req.params;

    if (idRecipe) {
        if (idRecipe.length < 13) {
            try {
                const apiID = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
                let { id, image, title, diets, summary, healthScore, analyzedInstructions } = apiID.data;
                return res.status(200).json({
                    id: id,
                    image: image,
                    name: title,
                    diets: diets,
                    summary: summary,
                    healthScore: healthScore,
                    steps: analyzedInstructions
                        .map((e) => {
                            return e.steps.map((el) => {
                                return el.step;
                            });
                        })
                        .flat(),
                })
            }
            catch (error) {
                console.log(error)
            }
        } else {
            try {
                const datosDB = await Recipe.findByPk(idRecipe, {
                    include: {
                        model: Diet,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }
                });
                return res.status(200).json(datosDB);
            } catch (error) {
                res.status(404).send("No se encontró resultado")
            }
        }
    }
})


//POST RECIPE

router.post('/', async (req, res) => {
    let { name, image, summary, healthScore, steps, diets } = req.body;
    try {
        const createdRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps
        });

        let dbDiets = await Diet.findAll({
            where: { name: diets },
        });
        createdRecipe.addDiet(dbDiets);
        console.log(createdRecipe)
        res.status(201).send(createdRecipe);
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }

})

module.exports = router;
