import React from 'react';
import { Button } from '@chakra-ui/react';

function Seat({ seat, onSeatSelect }) {
    return (
        <Button
            m={1}
            width="40px"
            height="40px"
            onClick={() => onSeatSelect(seat)}
            disabled={seat.status !== 'available'}
            colorScheme={
                seat.status === 'booked' ? 'red' :
                seat.status === 'locked' ? 'yellow' : 'green'
            }
        >
            {seat.position}
        </Button>
    );
}

export default Seat;
