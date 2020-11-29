import React, { Component } from 'react';
import SwapiService from '../../services/swapiService';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import './item-details.css'


const Characteristics = ({item, field, label}) => {
    return(
        <li className="list-group-item">
            <span>{label}</span>
            <span className="pl-2">{item[field].toUpperCase()}</span>
        </li>
    );
}
export {
    Characteristics
}


export default class ItemDetails extends Component {
    
    swapiSvc = new SwapiService();
    state = {
        item: null,
        image: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        // если придется менять стейт, то обязательно нужно обернуть все в условие
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
            this.transitionLoading();
        }
    }

    updateItem() {
        const {itemId, getData, getImgUrl} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
        .then((item) => {
            this.setState({
                item,
                image: getImgUrl(item),
                loading: false,
                error: false
            })
        })
        .catch(this.onError)
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    transitionLoading() {
        this.setState({
            loading: true
        })
    }



    render() {
        const {item, loading, error} = this.state;
        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const hasData = !(loading || error);
        const errMsg = error ? <ErrorIndicator /> : null;
        const spinner = loading ? < Spinner /> : null;

        if (hasData) {
            const {item, image} = this.state;
            const {name} = item;
            return(
                <div className="d-flex flex-row card">
                    <img className="item-image img-thumbnail rounded"
                        src={image} alt="Img"/>
            
                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            {/* React элементы нельзя менять после того как они были созданы, нужно создать новый елемент и присвоить его к полученному как в примере ниже */}
                            {
                                React.Children.map(this.props.children, (child, indx) => {
                                    // Клонируем чайлдс и вторым аргументом говорим реакту добавить новое свойство к уже созданным старым (field, label)
                                    return React.cloneElement(child, {item});
                                })
                            }
                        </ul>
                    </div>
                </div>
            )    
        }

        return (
        <div className="item-details card">
            {errMsg}
            {spinner}
        </div>
        )
    }
}
