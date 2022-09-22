import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

const times = [
  { value: 9, label: '9 am' },
  { value: 12, label: 'noon' },
  { value: 19, label: '7 pm'},
];

const TimeSlider = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Time of Day</Typography>
      <Slider
        min={9}
        max={19}
        defaultValue={9}
        valueLabelDisplay="auto"
        marks={times}
        value={9}
        onChange={() =>
          console.log('something changed')
        }
      />
    </Box>
  )
}

export default TimeSlider;