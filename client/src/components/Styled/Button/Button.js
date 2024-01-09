import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const Button = styled(MuiButton)(() => ({
  height: '100%',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 0px 3px #ccc',
  },
}));
