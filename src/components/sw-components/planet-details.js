import React from 'react';
import ItemDetails, {Characteristics} from './../item-details/item-details';
import {SwapiServiceConsumer} from './../swapi-service-context/swapi-service-context';



const PlanetDetails = ({itemId}) => {
    return(
        <SwapiServiceConsumer>
        {
            ({getPlanet, getPlanetImg}) => {
                return(
                    <ItemDetails itemId={itemId}
                    getData={getPlanet}
                    getImgUrl={getPlanetImg}>
                            <Characteristics field="population" label="Population"/>
                            <Characteristics field="rotationPeriod" label="Rotation Period"/>
                            <Characteristics field="diameter" label="Diameter"/>
                    </ItemDetails> 
                )
            }
        }
    </SwapiServiceConsumer>
    )
};

export {
    PlanetDetails
}