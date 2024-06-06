import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '../../../../components/Logo';


const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center" padding="0">
        <Logo />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
