import React from 'react'
import './../spinner/spinner.css'

// LIFECICLE HOOKS

// MOUNTING 
// constructor() => render() => componentDidMount()

// UPDATES
// методы для обновдения пропс или стэйта если нужно обновить чтото в компоненте
// new props    => render => componentDidUpdate(prevProps, prevState) принимает 2 аргумента
// setState({}) => render => componentDidUpdate(prevProps, prevState) принимает 2 аргумента

// UNMOUNTING
// componentWillUnmount()

// ERROR
// componentDidCatch()

const Spinner = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100">

            <p>Loading...</p>
            <div className="loadingio-spinner-ripple-yy2jqihk3dd">
                <div className="ldio-5zyzhia9g7f">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner