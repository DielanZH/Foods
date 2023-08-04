import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../IMAGES/FONDO_PI_1.jpg';
import styles from './Landing.module.css'

export default function Landing() {

    return (
        <div className={styles.landingImg}>
            <img src={image} alt="" />
            <div className={styles.landingText}>
                <h1>#HenryFood</h1>
                <Link to={'/home'} className={styles.landingBtn}>
                    <button>BON APETIT</button>
                </Link>
            </div>
        </div>
    )
}

