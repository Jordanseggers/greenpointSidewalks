import { Drawer, Typography, Box, Button } from '@mui/material';
import TimeSlider from './TimeSlider.js';

const Sidebar = ({map}) => {
  
  const handleClick = (layerName) => {
    let visibility = map.current.getLayoutProperty(layerName, 'visibility');

    if (visibility === 'visible') {
      map.current.setLayoutProperty(layerName, 'visibility', 'none');
    } else {
      map.current.setLayoutProperty(layerName, 'visibility', 'visible');
    }
  }

  return (
    <Drawer
    variant='permanent'
    hideBackdrop={true}
    >
      <div>
        <Typography>Greenpoint Covid Sidewalk Density At Noon</Typography>
      </div>
      <Box sx={{ width: 240, p: 3}}>
        <TimeSlider />
      </Box>
      <Box sx={{ width: 240, p: 3}}>
        <Button variant="contained" onClick={ () => {handleClick('pharmacy_at_noon')}}>Pharmacy Queue</Button> 
      </Box>
      <Box sx={{ width: 240, p: 3}}>
        <Button variant="contained" onClick={ () => {handleClick('restaurant_at_noon')}}>Restaurant Queue</Button>
      </Box>
      <Box sx={{ width: 240, p: 3}}>
        <Button variant="contained" onClick={ () => {handleClick('subway_at_noon')}}>Subway Queue</Button>
      </Box>
      <Box sx={{ width: 240, p: 3}}>
        <Button variant="contained" onClick={ () => {handleClick('office_at_noon')}}>Office Queue</Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar