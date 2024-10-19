import React from 'react';
import classes from "../assets/styles/card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLocation, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const PropertyCard = ({ property }) => {
    const categoryClasseName = ()=> {
        switch(property.category){
            case 'Maison' : return `${classes.tag} ${classes['tag-red']}`; break;
            case 'Appartement' : return `${classes.tag} ${classes['tag-brown']}`; break;
            case 'Véhicule' : return `${classes.tag} ${classes['tag-blue']}`; break;
        }
    }
  return (

<div className={`${classes.container_card} container`}>
<div className={`${classes.card}`}>
  <div >
    <img src="https://source.unsplash.com/600x400/?computer" alt="card__image"  width="600"/>
  </div>
  <div className={`${classes.card__body}`}>
    <span className={categoryClasseName()}>{property.category}</span>
    <h4>{property.title}</h4>
    <p>{property.description}</p>
  </div>
  <div className={`${classes.card__footer}`}>
    <div className={`${classes.user}`}>
      <div className={`${classes.user__info}`}>
        <div className={`${classes.icon}`}>
            <FontAwesomeIcon icon={faMoneyBill} />
            <p><strong>Price per Day:</strong> ${property.price_per_day}</p>
        </div>
      <div className={`${classes.icon}`}>
        <FontAwesomeIcon icon={faLocation} />
        <p>{property.location}</p>
      </div>
      
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default PropertyCard;