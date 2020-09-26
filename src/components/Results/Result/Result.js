import React from 'react';

const result = (props) => {
    return (
        <div className={props.selected ? 'result card mt-2 border-success': 'result card mt-2'}>
            <div className="card-body">
                <h5 className="result-name card-title">{props.name}</h5>
                <p className="result-description card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default result;