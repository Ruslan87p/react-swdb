import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import RandomPlanet from './components/random-planet/random-planet';
import ErrorIndicator from './components/error-indicator/error-indicator';
import PeopleSection from './components/people-section/people-section';
import SwapiService from './services/swapiService';
import PlanetSection from './components/planet-section/planet-section';
import StarshipSection from './components/starship-section/starship-section';
import {SwapiServiceProvider} from './components/swapi-service-context/swapi-service-context';

export default class App extends Component {

  swapiSvc = new SwapiService();


  constructor() {
    super();
    this.state = {
        selectedPerson: null,
        error: false
    }
}


  // отлавливание ошибок если компонет не отработает, кинуть ошибку и загрузить индикатор ошибок
  // работает для ошибок рендеринга и ошибок в жизненном цикле реакт компонента и НЕ распростроняется на асинхронные функции запроса даты или евент листенеры 
  componentDidCatch(error, info) {
    console.log(info);
    this.setState({
      error: true
    })
  }


  render() {

    // const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    if (this.state.error) {
      return (
        <ErrorIndicator />
      )
    }

    return (
      <div className="App">

        <div className="container">
          <header className="App-header">
            < Header />
          </header>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <RandomPlanet/>
            </div>
          </div>

          {/* теперь можно обернуть приложение в провайдер, чтобы любой компонент приложения имел доступ к сервису который мы передаем*/}
          <SwapiServiceProvider value={this.swapiSvc} >
              <PeopleSection />
            <br/>
              <PlanetSection />
            <br/>
              <StarshipSection />
          </SwapiServiceProvider>
        </div>
      </div>
    );
  }
}
