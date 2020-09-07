import React from 'react';
import Result from './Result/Result';

const results = (props) => (
    props.results.map((result, index) => {
        return <Result
            key={result.id}
            click={() => props.clicked(result.id)}
            name={result.name}
            description={result.description}
            selected={result.selected} />
    })
);

export default results;