const { Router } = require('express');
const { Diet } = require('../db');
const API_KEY = process.env.API_KEY;
const axios = require('axios');

const router = Router();

const getDiet = async () => {
    try {
        const dietas = [];

        const response = await axios(`https://api.spoonacular.com/recipes/complexSearch?&&apiKey=${API_KEY}&addRecipeInformation=true`)

        const diets = response.data.results.map(recipe => recipe.diets);
        for (let i = 0; i < diets.length; i++) {
            for (let j = 0; j < diets[i].length; j++) {
                if (!dietas.includes(diets[i][j])) {
                    dietas.push(diets[i][j])
                }
            }
        }
        await Diet.bulkCreate(dietas.map(diet => {
            return {
                name: diet
            }
        }), { ignoreDuplicates: true })
        const dbRes = await Diet.findAll()
        return dbRes;
    } catch (error) {
        return (error.message)
    }
}

router.get('/', async (req, res) => {
    try {
        let dbRes = await getDiet()
        res.status(200).json(dbRes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
