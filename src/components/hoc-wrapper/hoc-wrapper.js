import React from 'react';
import Spinner from './../spinner/spinner';
import ErrorIndicator from './../error-indicator/error-indicator';

// Компоненты высшего порядка (higher order components)
// Можно передать сам класс return ItemList внутри функции
// Создает безымянный класс который может наследовать компонент
// Создает пустой компонет обертку который вызывает основной компонент и передает ему все свойства которые он получил сам
// в функции передаем аргумент и в этот аргумент можно передать копонент что мы хотим использовать внутри
const wrapper = (View, getData) => {
    return class extends React.Component {
        state = {
            data: null,
            loading: true,
            error: false
        }
        componentDidMount() {
            getData().then( (data) => {
                this.setState({
                    data,
                    loading: false
                })
            })
            .catch( (err) => {
                this.setState({
                    error: true,
                    loading: false
                })
                console.log(err, 'error');
            })
        }

        update() {
            this.setState({
                loading: true,
                error: false
            })
        }

        render() {
            const {data, loading, error} = this.state;
            if (loading) {
                return <Spinner />
            }
            if (error) {
                return < ErrorIndicator />
            }
            return <View {...this.props} data={data} />
        }
    };
}

export {
    wrapper
};