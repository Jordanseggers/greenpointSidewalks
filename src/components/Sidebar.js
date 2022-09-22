import { Drawer, IconButton, Typography, Box, Button } from '@mui/material';
import {ChevronLeft} from '@mui/icons-material';
import TimeSlider from './TimeSlider.js';

const Sidebar = ({isOpen, setIsOpen, map}) => {
  return (
    <Drawer
    variant='persistent'
    hideBackdrop={true}
    open={isOpen}
    >
      <div>
        <Typography>Greenpoint Covid Sidewalk Density</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </div>
      <Box sx={{ width: 240, p: 3}}>
        <TimeSlider />
      </Box>
      <Box sx={{ width: 240, p: 3}}>
        <Button variant="contained" onClick={() => {map.current.setLayoutProperty('pharmacy_at_noon', 'visibility', 'none')}}>Pharmacy Queue</Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar