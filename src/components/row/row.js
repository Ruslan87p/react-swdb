import React from 'react';
import PropTypes from 'prop-types';


const Row = ({left, right}) => {
    return(
        <div className="row mb-2">
            <div className="col-lg-6">
                {left}
            </div>
            <div className="col-lg-6">
               {right}
            </div>
        </div>
    );
}

Row.propTypes = {
    // node проверяет что это, что-то, что можно отрендорить в JSX
    left: PropTypes.node,
    right: PropTypes.node
}

export default Row;