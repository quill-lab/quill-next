import { SxProps, Theme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const Skel = ({ sx }: { sx: SxProps<Theme> }) => (
  <Skeleton animation="wave" sx={{ transform: 'none', ...sx }} />
);
export default Skel;
