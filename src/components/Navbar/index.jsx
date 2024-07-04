import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { addTodo, setTheme } from '@containers/App/actions';

import classes from './style.module.scss';
import { TextField } from '@mui/material';

const Navbar = ({ theme }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState();

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleAddTodo = (e) => {
    setValues(e.target.value);
  };

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(
        addTodo({
          id: uuidv4(),
          todoName: values,
          status: false,
        })
      );
    }
  };

  const iconStyle = {
    width: '1.5rem',
    height: '1.5rem',
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage}>
          <h1>TODO</h1>
        </div>
        <Stack direction="row">
          <IconButton onClick={handleTheme}>
            {theme === 'light' ? (
              <NightsStayIcon sx={iconStyle} />
            ) : (
              <LightModeIcon sx={iconStyle} htmlColor="#fae6be" />
            )}
          </IconButton>
        </Stack>
      </div>
      <div className={classes.inputButton}>
        <TextField
          id="myInput"
          variant="outlined"
          className={classes.fieldText}
          onChange={handleAddTodo}
          onKeyDown={handleOnEnter}
        />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  todo: PropTypes.array,
};

export default Navbar;
