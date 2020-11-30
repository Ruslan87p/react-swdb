import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import './starship-section.css';
import ErrorBoundry from '../error-boundry/error-boundry';
import { StarshipList } from '../sw-components/item-lists';
import { withRouter } from 'react-router-dom';


class StarshipSection extends Component {

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

    const {history} = this.props;
    return(
        <ErrorBoundry>
            <StarshipList onItemSelected={(itemId) => {
                history.push(itemId);
            }} />
        </ErrorBoundry>
    );
    };
}

// Теперь компонент высшего порядка withRouter передаст в StarshipSection те самые 3 объекта, что использует React Router (match, location, history)
export default withRouter(StarshipSection)