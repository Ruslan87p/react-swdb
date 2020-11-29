import React from 'react'
import './../planet-section/planet-section.css';
import SwapiService from '../../services/swapiService';
import ErrorIndicator from '../error-indicator/error-indicator';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PlanetList } from '../sw-components/item-lists';
import {PlanetDetails} from '../sw-components/planet-details';

export default class PlanetSection extends React.Component {

    swapiSvc = new SwapiService();

    state = {
        selectedPlanet: null,
        error: false
      };

    componentDidCatch(error, info) {
        this.setState({
            error: true
        })
    }

    onPlanetSelected = (id) => {
        this.setState({
          selectedPlanet: id
        })
      };


    render() {
        if (this.state.error) {
            return <ErrorIndicator />
        }

    const itemList = (
        <ErrorBoundry>
            <PlanetList onItemSelected={this.onPlanetSelected} />
        </ErrorBoundry>
        
    );
    const itemDetail = (
        <ErrorBoundry>
            <PlanetDetails itemId={this.state.selectedPlanet} />
        </ErrorBoundry>
    );


        return(
            <ErrorBoundry>
                < Row left={itemList} right={itemDetail} />
            </ErrorBoundry>
        );
    };
    

}