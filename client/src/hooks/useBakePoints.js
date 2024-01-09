import { useMediaQuery, useTheme } from '@mui/material';

const useBrakePoints = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return {
    xs,
    sm,
    md,
  };
};

export default useBrakePoints;
