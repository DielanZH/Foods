import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {

    const dispatch = useDispatch();

    const [input, setInput] = useState("");

    function handleInputChange(e) {
        e.preventDefault()
        setInput(e.target.value)
    }

    function handleOnClick(e) {
        e.preventDefault()
        dispatch(searchByName(input))
        setInput("")
    }

    return (

        <form className={styles.SearchBar}>
            <input
                type="text"
                placeholder="Buscar una receta..."
                onChange={(e) => handleInputChange(e)}
            />
            <input className={styles.button} type="submit" onClick={(e) => handleOnClick(e)} value='🔍︎' />
        </form>
    )
}