import React from 'react';

const Spinner = (props) => (
    <div>
    <i className="fa fa-spin fa-spinner" /> {props.text}
    </div>
);

export default Spinner;