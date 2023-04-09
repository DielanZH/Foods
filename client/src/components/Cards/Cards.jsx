import React from "react";
import styles from './Cards.module.css';

export default function Card({ id, name, image, diets }) {
    return (
        <div className={styles.card}>

                <img src={image} alt='not found'></img>
                <h2>{name}</h2>

                <h3>Diets:</h3>
                <p>{diets && diets.map(el => { return el + " - " })}</p>

        </div>
    )
}