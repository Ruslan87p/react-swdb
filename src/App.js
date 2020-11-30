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

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { StarshipDetails } from './components/sw-components/starship-details';
import LoginPage from './components/pages/login-page';
import SecretPage from './components/pages/secret-page';


export default class App extends Component {

  swapiSvc = new SwapiService();


  constructor() {
    super();
    this.state = {
        selectedPerson: null,
        error: false,
        isLoggedIn: false
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


  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }


  render() {

    // const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {isLoggedIn, error} = this.state;
    if (error) {
      return (
        <ErrorIndicator />
      )
    }

    return (
      <div className="App">

        <Router>
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
 
              {/* если сработает один из роутов, то Switch отрисует только его и не будет трогать остальные */}
              <Switch>
                  <Route path="/" exact={true} render={() => <h2>Welcome to StarDB</h2>} />

                  {/* ? указывает, что роутер АЙДИ может быть опциональным */}
                  <Route path="/people/:id?" component={PeopleSection} />

                  <Route path="/planets" component={PlanetSection} />

                  <Route path="/starships" exact={true} component={StarshipSection} />

                  {/* В рендер функцию Router передаст функцию с тремя объектами (параметрами) */}
                  <Route path="/starships/:id" render={ ({match, location, history}) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id}/>
                  }} />


                  <Route path="/login" render={ () => (
                    <LoginPage isLoggedIn={isLoggedIn}
                              onLogin={this.onLogin}/>
                  )} />
                  <Route path="/secret" render={ () => (
                    <SecretPage isLoggedIn={isLoggedIn} />
                  )} />
                  
                  {/* <Redirect to="/"/> */}
                  <Route render={() => <h1>Page not found</h1>}/>
              </Switch>

            </SwapiServiceProvider>
          </div>
        </Router>

      </div>
    );
  }
}
