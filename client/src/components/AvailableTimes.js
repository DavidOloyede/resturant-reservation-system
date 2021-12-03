import React from 'react';
const AvailableTimes = ({aatimes}) => {
    return (
        <>
            {aatimes.map((times)=>(
                <h2 key={aatimes.key}>{aatimes.value} </h2>
            ))}

            
        </>
    )
}

export default AvailableTimes
