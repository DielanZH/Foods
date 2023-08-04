import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getDiets } from "../../redux/actions";
import styles from "./CreateRecipe.module.css"

export default function CreateRecipe() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    const diets = useSelector((state) => state.diets)

    const handleChange = e => {

        if (e.target.parentNode.parentNode.id === 'diets') {
            if (e.target.checked) {
                setInput(prev => ({
                    ...prev,
                    diets: [...input.diets, e.target.value]
                }))
            } else {
                setInput(prev => ({
                    ...prev,
                    diets: input.diets.filter(x => e.target.value !== x)
                }))
            }
        }

        if (e.target.type !== 'checkbox') {
            setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    function handleSubmit(e) {

        if (!input.name || input.name.length <= 2 || input.name.length > 50) {
            e.preventDefault();
            return alert("Debe ingresar un nombre que contenga entre 2 y 50 caracteres")
        } else if (!input.diets.length) {
            e.preventDefault();
            return alert('Selecciona al menos un tipo de dieta')
        } else if (!input.healthScore || input.healthScore.length <= 0 || input.healthScore.length >= 100) {
            e.preventDefault();
            return alert('Debes asignar un nivel de Health Score entre 1 y 100!')
        } else if (!input.summary || input.summary.length <= 0 || input.summary.length < 20) {
            e.preventDefault();
            return alert('El resumen del plato debe contener al menos 20 caracteres!')
        } else if (!input.steps || input.steps.length <= 0 || input.steps.length < 20) {
            e.preventDefault();
            return alert('El campo del paso a paso debe contener al menos 20 caracteres!')
        }
        console.log(input)
        dispatch(createRecipe(input))
        alert("Tu receta ha sido creada con éxito!")
    }

    return (
        <div className={styles.container}>
            <div className={styles.title} >
                <Link to='/home' style={{ textDecoration: 'none' }}>
                    <h1>#HenryFood</h1>
                </Link>
                <h2>CREA TU RECETA</h2>
            </div>
            <form className={styles.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.blockOneCreate}>
                    <label>Nombre:</label>
                    <input type='text' name='name' placeholder="Nombre de tu receta" value={input.name} onChange={(e) => handleChange(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }} />


                    <div className={styles.image}>
                        <label>Imagen:</label>
                        <input type="url" value={input.image} name="image" placeholder='Ingresá el URL de una imagen...' onChange={(e) => handleChange(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }} />
                    </div>

                    <div className={styles.healthScore}>
                        <label>Nivel de salubridad</label>
                        <input type='range' name='healthScore' onChange={(e) => handleChange(e)} min='1' max='100' />
                    </div>
                </div>

                <br />

                <div className={styles.blockTwoCreate}>
                    <div className={styles.summary}>
                        <label>Resumen del plato:</label>
                        <input type='text' name='summary' cols="30" rows="10" onChange={handleChange} style={{ width: '300px', height: '100px', fontSize: '15px', textAlign: 'left' }} />
                    </div>

                    <br />

                    <div className={styles.steps}>
                        <label>Paso a paso:</label>
                        <input type="text" name="steps" onChange={handleChange} style={{ width: '300px', height: '150px', fontSize: '15px' }} min="20" max="500" />
                    </div>

                    <div className={styles.dietsTypes} id='diets'>
                        {diets && diets.map(el => {
                            return (
                                <div className={el.name} key={el.id}>
                                    <input name={el} type='checkbox' value={el.name} key={el.id} onChange={(e) => handleChange(e)}></input>
                                    <label name={el.name}>{el.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </form >
            <div className={styles.submitButton}>
                <button type="submit" onClick={(e) => handleSubmit(e)}>CREAR</button>
            </div>
        </div >
    )
}

/*
Nombre.
Resumen del plato.
Nivel de comida saludable (health score).
Paso a paso.
Imagen.
Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo.
Botón para crear la receta
*/