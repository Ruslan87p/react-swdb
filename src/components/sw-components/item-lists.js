import React from 'react';
import ItemList from './../item-list/item-list';
import {wrapper} from './../hoc-wrapper/hoc-wrapper';
import SwapiService from './../../services/swapiService';

const swapiService = new SwapiService();
const { getAllPeople, getAllPlanets, getAllStarShips } = swapiService;

// компонент высшего порядка работает над другими компонентами
// первый аргумент это то, что функция будет оборачивать
// второй аргумент функция которую мы будем передавать в качестве props -> children в любой компонент который нам передадут
const withChildFunction = (Wrapped, fn) => {
    // возвращаем новый компонент функицию (принимает props и возвращает компонет который передали в функцию)
    return (props) => {
        return (
            // передаем все свойства что получил компонент
            <Wrapped {...props}>
                {/* В качестве children передаем функцию компонент */}
                {fn}
            </Wrapped>
        )
    }
};

const renderPlanetName = ({name, population,rotationPeriod,diameter}) => {
    return (
        <div>
            <span>{name}</span>
            <span style={{paddingLeft: "20px"}}>{`(${population}, ${rotationPeriod}, ${diameter})`}</span>
        </div>
    )
};

const renderPeopleName = ({name, gender, birthYear}) => {
    return (
        <div>
            <span>{name}</span>
            <span style={{paddingLeft: "20px"}}>{`(${gender}, ${birthYear})`}</span>
        </div>
    )
}

const renderStarshipName = ({name,model,manufacturer,costInCredits,length,crew,passengers,cargoCapacity}) => {
    return (
        <div>
        <span>{name}</span>
            <span style={{paddingLeft: "20px"}}>
            {`(${model}, ${manufacturer}, ${costInCredits}, ${length}, ${crew}, ${passengers}, ${cargoCapacity})`}
            </span>
        </div>
    )
};

const PersonList = wrapper(
    withChildFunction(ItemList, renderPeopleName),
    getAllPeople);

const PlanetList = wrapper(
    withChildFunction(ItemList, renderPlanetName),
    getAllPlanets);
const StarshipList = wrapper(
    withChildFunction(ItemList, renderStarshipName),
    getAllStarShips);


export {
    PersonList,
    PlanetList,
    StarshipList
}