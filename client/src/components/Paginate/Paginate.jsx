import React from "react";
import styles from './Paginate.module.css'

export default function Paginated({ recipesForPage, allRecipes, actualPage }) {
    const numPage = []
    for (let i = 1; i <= Math.ceil(allRecipes / recipesForPage); i++) {
        numPage.push(i)
    }
    return (
        <nav>
            <ul className={styles.paginated}>
                {numPage && numPage.map(number => (
                    <li className={styles.nro} key={number}>
                        <button onClick={() => actualPage(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}