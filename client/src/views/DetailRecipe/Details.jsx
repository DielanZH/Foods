import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getClean, getRecipeDetails } from "../../redux/actions";
import styles from "./Details.module.css"

export default function Details() {

    const dispatch = useDispatch()

    const { id } = useParams()

    const myRecipe = useSelector(state => state.detail)
    console.log(myRecipe)

    useEffect(() => {
        dispatch(getRecipeDetails(id))
        return () => {
            dispatch(getClean())
        }
        //eslint-disable-next-line
    }, [dispatch])

    return (
        <div className={styles.container}>

            <div className={styles.blockOne}>

                <h1>{myRecipe.name && myRecipe.name}</h1>

                <img src={myRecipe.image} alt="no se encontro imagen mi rey" />

                <h2>Health Score: {myRecipe.healthScore}</h2>

                <h2>Tipo de dietas:</h2>
                <h3> {myRecipe.diets && myRecipe.diets.map(el => el?.name ? el?.name + ', ' : el + ', ')} </h3>

            </div>

            <div className={styles.blockTwo}>


                <h2>Summary:</h2>
                <h3 dangerouslySetInnerHTML={{ __html: myRecipe.summary }} />

                <h2>Steps:</h2>
                <h3>{myRecipe.steps}</h3>

            </div>
            <Link to='/home'>
                <button className={styles.backBtn}>Volver</button>
            </Link>

        </div>
    )

}

/*
ID.
Nombre.
Resumen del plato.
Nivel de comida saludable (health score).
Paso a paso.
Imagen.
Tipos de dieta.*/