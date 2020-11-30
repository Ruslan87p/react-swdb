import React, {Component} from 'react';
import './people-section.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PersonList } from '../sw-components/item-lists';
import { PersonDetails } from './../sw-components/person-details';
import { withRouter } from 'react-router-dom';
import Row from './../row/row';


class PeopleSection extends Component {

    state = {
        error: false
      };

    componentDidCatch(error, info) {
        this.setState({
            error: true
        })
    }



    render() {
        if (this.state.error) {
            return <ErrorIndicator />
        }

        const {history, match} = this.props;
        const { id } = match.params;
        return(
        <ErrorBoundry>
            < Row left={<PersonList onItemSelected={ (id) => history.push(id)} />}
                right={<PersonDetails itemId={id}/>} />
        </ErrorBoundry>
        );
    };
}

export default withRouter(PeopleSection);