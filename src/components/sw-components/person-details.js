import React from 'react';
import ItemDetails, {Characteristics} from './../item-details/item-details';
import {SwapiServiceConsumer} from './../swapi-service-context/swapi-service-context';


const PersonDetails = ({itemId}) => {
    // SwapiServiceConsumer принммает в качестве тела - функцию и эта функция принимает SwapiService, именно тот, что мы установили в app.js
    // обернув все необходимые компоненты в SwapiServiceProvider и передали SwapiService
    return (
        <SwapiServiceConsumer>
            {
                // достаем методы SwapiService
                ({getPerson, getPersonImg}) => {
                    return(
                        <ItemDetails itemId={itemId}
                        getData={getPerson}
                        getImgUrl={getPersonImg}>
                                 <Characteristics field="gender" label="Gender"/>
                                 <Characteristics field="eyeColor" label="Eye Color"/>
                                 <Characteristics field="birthYear" label="Birth Year"/>
                
                                 <Characteristics field="skinColor" label="Skin Color"/>
                                 <Characteristics field="mass" label="Mass"/>
                                 <Characteristics field="height" label="Height"/>
                
                                 <Characteristics field="hairColor" label="Hair Color"/>
                                 {/* <Characteristics field="films" label="Films"/> */}
                                 <Characteristics field="created" label="Created"/>
                                 <Characteristics field="edited" label="Edited"/>
                        </ItemDetails> 
                    )
                }
            }
        </SwapiServiceConsumer>
    )
};

export {
    PersonDetails
}