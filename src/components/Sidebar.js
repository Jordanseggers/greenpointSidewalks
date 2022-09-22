import { Drawer, IconButton, Typography, Box } from '@mui/material';
import {ChevronLeft} from '@mui/icons-material';

const Sidebar = ({isOpen, setIsOpen}) => {
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
      <Box sx={{ width: 240, p: 3}}></Box>
    </Drawer>
  )
}

export default Sidebar