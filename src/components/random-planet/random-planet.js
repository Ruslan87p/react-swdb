import React, { Component } from 'react'
import './random-planet.css'
import SwapiSvc from './../../services/swapiService'
import Spinner from './../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator';
import PropTypes from 'prop-types';




export default class RandomPlanet extends Component {

// дефолтное значение для обновления планет
// defaultProps Сработает если свойств нет совсем или передано undefined
    static defaultProps = {
        updateInterval: 10000
    }

    static propTypes = {
        // PropTypes библиотека работающая с тайпами
        updateInterval: PropTypes.number
    }


    swapiSvc = new SwapiSvc();
    state = {
        loading: true,
        planet : {},
        error: false
    }

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false})
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25 ) + 3;
        this.swapiSvc
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError) //если есть асинхронная функция, мы делать кэтч
    }


    render() {

        const {planet, loading, error} = this.state;

        const hasData = !(loading || error);

        const errMsg = error ? <ErrorIndicator /> : null;
        const spinner = loading ? < Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errMsg}
                {spinner}
                {content}
            </div>
        )
    }

}



    const PlanetView = ({planet}) => {
        const {id, name, population, rotationPeriod, diameter} = planet;
        return (
            // нужен чтобы сгрупировать элементы потому что из рендер можно вернуть один елемент, 
            // позволяет обернуть несколько компонентов JSX, не создавай при этом новых ДОМ элементов
            <React.Fragment>
                    <img className="planet-image"
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Img"/>
                    <div>
                        <h4> {name} </h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Population</span>
                                <span> {population} </span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Rotation Period</span>
                                <span> {rotationPeriod} </span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Diameter</span>
                                <span> {diameter} </span>
                            </li>
                        </ul>
                    </div>
            </React.Fragment>
        )
    }