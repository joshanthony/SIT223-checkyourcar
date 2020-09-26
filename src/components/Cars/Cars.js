import React from 'react';
import Car from './Car/Car';

const cars = (props) => (
    props.results.map((result, index) => {
        return <Car
            key={result.id}
            click={() => props.clicked(index, result.id)}
            make={result.make}
            model={result.model}
            year={result.year}
            issues={result.issues} />
    })
);

export default cars;