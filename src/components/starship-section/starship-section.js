import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapiService';
import './starship-section.css';

import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';
import { StarshipList } from '../sw-components/item-lists';
import {StarshipDetails} from '../sw-components/starship-details';




export default class StarshipSection extends Component {

    swapiSvc = new SwapiService();

    state = {
        selectedStarship: null,
        error: false
      };

    componentDidCatch(error, info) {
        this.setState({
            error: true
        })
    }

    onStarshipSelected = (id) => {
        this.setState({
            selectedStarship: id
        })
      };


    render() {
        if (this.state.error) {
            return <ErrorIndicator />
        }

    const itemList = (
        <ErrorBoundry>
            <StarshipList onItemSelected={this.onStarshipSelected} />
        </ErrorBoundry>
    );

    const itemDetail = (
        <ErrorBoundry>
            < StarshipDetails itemId={this.state.selectedStarship}/>
        </ErrorBoundry>
    );


        return(
            <ErrorBoundry>
                < Row left={itemList} right={itemDetail} />
            </ErrorBoundry>
        );
    };
}