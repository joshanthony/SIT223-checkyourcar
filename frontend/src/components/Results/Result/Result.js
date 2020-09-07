import React from 'react';

const result = (props) => {
    return (
        <div className={props.selected ? 'result card mt-2 border-success': 'result card mt-2'}>
            <div className="card-body">
                <h5 className="result-name card-title" onClick={props.click}>{props.name}</h5>
                <p className="result-description card-text" onClick={props.click}>{props.description}</p>
                <a className="result-btn btn btn-dark" onClick={props.click}>Select</a>
            </div>
        </div>
    )
}

export default result;