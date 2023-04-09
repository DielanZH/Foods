import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Paginate from "../../components/Paginate/Paginate";
import { getRecipes } from "../../redux/actions";
import styles from "./Home.module.css";
import Filters from "../../components/Filters/Filters";

export default function Home() {

    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.recipes)

    const [currentPage, setCurrentPage] = useState(1)

    const [cardPerPage] = useState(9)

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    const currentCards = allRecipes.slice(indexOfFirstCard, indexOfLastCard);

    if (currentPage > Math.ceil(allRecipes.length / cardPerPage) &&
        currentPage !== 1
    ) {
        setCurrentPage(1)
    }

    const actualPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        if (!allRecipes[0])
            dispatch(getRecipes())
    }, [dispatch])



    return (
        <div className={styles.home}>
            <NavBar />
            <hr></hr>
            <div>
                <Filters />
                <Paginate
                    recipesForPage={cardPerPage}
                    allRecipes={allRecipes.length}
                    actualPage={actualPage}
                />

                <div className={styles.cards} >
                    {currentCards?.map(el => {
                        return (
                            <div key={el.id}>
                                <Link to={"/recipes/" + el.id} style={{ textDecoration: 'none' }}>
                                    <Cards
                                        key={el.id}
                                        id={el.id}
                                        name={el.name}
                                        image={el.image}
                                        diets={el.diets}
                                    />
                                </Link>
                            </div>
                        )
                    })
                    }
                </div>
                <Paginate
                    recipesForPage={cardPerPage}
                    allRecipes={allRecipes.length}
                    actualPage={actualPage}
                />

            </div>
        </div>
    )
}