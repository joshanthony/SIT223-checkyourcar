import React from 'react';

const issue = (props) => {
    return (
        <div className='result border-top mt-2 pt-3 pb-2'>
            <div className="">
                <h6 className="result-name card-title">{props.name}</h6>
                <p className="result-description card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default issue;