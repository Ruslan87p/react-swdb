import React from 'react'
import './item-list.css'
import PropTypes from 'prop-types';

const ItemList = (props) => {

    const {data, onItemSelected, children: renderLabel} = props;

    const items = data.map( (item) => {
        const {id} = item;
        const label = renderLabel(item);
        return (
            <li key={id}
                className="list-group-item"
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        )
    })
    return (
        <ul className="item-list list-group"> 
            {items}
        </ul>
    )
}

// Значение по умолчанию
ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.defaultProps = {
    // не указываем isRequired потому что есть значение по дефолту
    onItemSelected: () => PropTypes.func,
    // дата - это массив объектов
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    // свойство children которое обязательно должно быть функцией
    children: PropTypes.func.isRequired
}


export default ItemList;