import React from 'react'
import './../error-indicator/error-indicator.css'
import icon from './../error-indicator/space-station.png'

const ErrorIndicator = () => {
    return (
        <div className="error-indicator d-flex flex-column align-items-center w-100">
            <img src={icon} className="icon" alt="Error icon"/>
            <div>
                <span className="boom">BOOM!</span>
                <p>
                    something has gone terribly wrong ( but we already sent droids to fix it )
                </p>
            </div>
        </div>
    )
}

export default ErrorIndicator;