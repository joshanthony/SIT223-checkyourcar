import React from 'react';
import Issue from './Issue/Issue';

const issues = (props) => (
    props.results.map((result, index) => {
        return <Issue
            key={result.id}
            name={result.name}
            description={result.description} />
    })
);

export default issues;