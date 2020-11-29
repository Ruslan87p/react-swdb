import React from 'react';
import Row from '../row/row';
import {PersonList} from '../sw-components/item-lists';
import {PersonalDetails} from '../sw-components/person-details';

export default class PeoplePage extends Component {

    state = {
      selectedItem: null  
    };

    onItemSelected = (selectedItem) => {
        this.setState({
            selectedItem
        })
    }

    render() {
        const {selectedItem} = this.state;
        return(
            <Row 
                left={<PersonList onItemSelected={this.onItemSelected}/>}
                right={<PersonalDetails itemId={selectedItem} />}
            />
        )
    }
}