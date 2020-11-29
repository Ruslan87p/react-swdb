import React, {Component} from 'react';
import './people-section.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapiService';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PersonList } from '../sw-components/item-lists';
import {PersonDetails } from '../sw-components/person-details';

export default class PeopleSection extends Component {

    swapiSvc = new SwapiService();

    state = {
        selectedPerson: null,
        error: false
      };

    componentDidCatch(error, info) {
        this.setState({
            error: true
        })
    }

    onPersonSelected = (id) => {
        this.setState({
          selectedPerson: id
        })
      };


    render() {
        if (this.state.error) {
            return <ErrorIndicator />
        }

    const itemList = (
        <ErrorBoundry>
            <PersonList onItemSelected={this.onPersonSelected} />
        </ErrorBoundry>
    );

    const itemDetail = (
        <ErrorBoundry>
            < PersonDetails itemId={this.state.selectedPerson}/>
        </ErrorBoundry>
    );


        return(
            <ErrorBoundry>
                < Row left={itemList} right={itemDetail} />
                {/* // < Row left={<p>Hello</p>} right={<span>WORLD </span>} /> */}
            </ErrorBoundry>
        );
    };
}