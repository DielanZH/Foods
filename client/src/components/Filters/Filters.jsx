import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, filterDiets, getDiets, orderBy } from "../../redux/actions";
import styles from './Filters.module.css';

export default function Filters() {

    const dispatch = useDispatch()

    const allDiets = useSelector((state) => state.diets)

    function handleName(e) {
        e.preventDefault()
        dispatch(orderBy(e.target.value))
    }

    function handleFilterDiet(e) {
        e.preventDefault()
        console.log(e.target.value)
        dispatch(filterDiets(e.target.value))
    }

    function handleFilterCreatedOrApi(e) {
        e.preventDefault()
        dispatch(filterBy(e.target.value))
    }

    const handleReload = () => {
        window.location.reload();
    }
    useEffect(() => {
        if (!allDiets[0])
            dispatch(getDiets())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <select className={styles.filterOrder} onChange={e => { handleName(e) }}>
                <option value='All'>Ordenar ⇅</option>
                <option value='A-Z'>A - Z</option>
                <option value='Z-A'>Z - A</option>
                <option value='asc'>HealthScore ↑</option>
                <option value='desc'>HealthScore ↓</option>
            </select>

            <select className={styles.filterDiets} onChange={e => handleFilterDiet(e)}>
                <option value='All'>Todos</option>
                {allDiets && allDiets.map(el => {
                    return (<option value={el.name} key={el.id}> {el.name}</option>)
                })
                }
            </select>

            <select className={styles.apiOrDB} onChange={e => handleFilterCreatedOrApi(e)}>
                <option value="default">Database o API</option>
                <option value="DB">DB</option>
                <option value="API">API</option>
            </select>

            <button onClick={e => { handleReload() }}>⟳</button>
        </div>
    )
}
