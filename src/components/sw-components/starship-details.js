import React from 'react';
import ItemDetails, {Characteristics} from './../item-details/item-details';
import {SwapiServiceConsumer} from './../swapi-service-context/swapi-service-context';


const StarshipDetails = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {
                ({getStarShip, getStarshipImg}) => {
                    return(
                        <ItemDetails itemId={itemId}
                        getData={getStarShip}
                        getImgUrl={getStarshipImg}>
                            <Characteristics field="model" label="Model"/>
                            <Characteristics field="manufacturer" label="Manufacturer"/>
                            <Characteristics field="costInCredits" label="Cost"/>
                            
                            <Characteristics field="length" label="Length"/>
                            <Characteristics field="crew" label="Crew"/>
                            <Characteristics field="passengers" label="Passengers"/>
                            
                            <Characteristics field="cargoCapacity" label="Cargo Capacity"/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>
    )
};

export {
    StarshipDetails
}