import React from 'react';

import './CountMetric.css';

const CountMetric = (props) => {

    let styles = {
        backgroundColor: props.backgroundColor
    };

    return (
        <div className="count-metric">
            <div className="count-metric-row1">
                <div className="count-metric-title">
                    { props.title }
                </div>
                <div className="count-metric-bubble-container">
                    <div className="count-metric-bubble" style= { styles }>
                    </div>
                </div>
            </div>
            <div className="count-metric-row2">
                <div className="count-metric-value">
                    { props.value }
                </div>
            </div>
        </div>
    )
}

export default CountMetric;
