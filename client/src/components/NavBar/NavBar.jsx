import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav>
            <div className={styles.navBar}>
                <h1>#HenryFood</h1>
                <div>
                    <ul>
                        <Link to='/createRecipe'>
                            <li>Crear receta</li>
                        </Link>
                    </ul>
                </div>
                <SearchBar />
            </div>
        </nav>
    )
}
