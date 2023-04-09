import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../IMAGES/landing.jpg';

export default function Landing() {

    const [mostrar, setMostrar] = useState(false)

    const loading = () => {
        setMostrar(!mostrar);
    }
    return (
        <div className="landingImg">
            <img onLoad={loading} src={image} className={`${mostrar ? "showLanding" : "hideLanding"}`} alt="" />
            <div className="landingText">
                <h1>HENRY FOOD</h1>
                <Link to={'/home'} className={'Landing-btn'}>
                    <button>BON APETIT</button>
                </Link>
            </div>
        </div>
    )
}

