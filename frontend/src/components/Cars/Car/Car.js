import React from 'react';
import Issues from '../../../components/Issues/Issues';

const car = (props) => {
    return (
        <div className='result card mt-2 mb-2'>
            <div className="card-body">
                <h5 className="result-name card-title pb-1">Issues for your {props.make} {props.model} ({props.year}) <a className="result-btn btn btn-outline-danger btn-sm btn-tiny ml-2" onClick={props.click}>Delete</a></h5>
                <div>
                <Issues results={props.issues} />
                </div>
            </div>
        </div>
    )
}

export default car;