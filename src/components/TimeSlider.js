import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

const times = [
  { value: 9, label: '9 am' },
  { value: 12, label: 'noon' },
  { value: 19, label: '7 pm'},
];

const TimeSlider = () => {
const [selectedTime, setSelectedTime ] = useState(12);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Time of Day (Not Yet Functional)</Typography>
      <Slider
        min={9}
        max={19}
        defaultValue={12}
        valueLabelDisplay="auto"
        marks={times}
        value={selectedTime}
        onChange={(e, time) => {
            setSelectedTime(time);
          }
        }
      />
    </Box>
  )
}

export default TimeSlider;