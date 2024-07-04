import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { CSS } from '@dnd-kit/utilities';

import { addTodo, deleteAllTodo, deleteTodo, setTheme, setTodo } from '@containers/App/actions';
import { selectData, selectTheme, selectTodo } from '@containers/App/selectors';

// icon and css
import classes from './style.module.scss';
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckedIcons from './CheckedIcons';
import ClearIcon from '@mui/icons-material/Clear';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useMemo, useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ListTodo from './ListTodo';

const iconStyle = {
  width: '1.5rem',
  height: '1.5rem',
};

const Home = ({ todo, theme }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('all');
  const [values, setValues] = useState();

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleAddTodo = (e) => {
    setValues(e.target.value);
  };

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      if (values.length === 0) {
        return false;
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            todoName: values,
            status: false,
          })
        );
      }

      setValues('');
    }
  };

  const visibleTodos = useMemo(() => filterTodos(todo, tab));
  const listOn = visibleTodos.length === 0;

  function filterTodos(todo, tab) {
    return todo.filter((t) => {
      if (tab === 'all') {
        return true;
      } else if (tab === 'active') {
        return !t?.status;
      } else if (tab === 'completed') {
        return t?.status;
      }
    });
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.frontName}>
        <h1>TODO</h1>
        <Stack direction="row">
          <IconButton onClick={handleTheme}>
            {theme === 'light' ? (
              <NightsStayIcon sx={iconStyle} htmlColor="#fae6be" />
            ) : (
              <LightModeIcon sx={iconStyle} />
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
          sx={{ borderRadius: '5px' }}
          value={values}
        />
      </div>
      <DndContext collisionDetection={closestCorners}>
        <List
          sx={{ maxWidth: 500, bgcolor: 'background.paper', borderRadius: '5px' }}
          className={classes.itemList}
          hidden={listOn}
        >
          <SortableContext items={visibleTodos} strategy={verticalListSortingStrategy}>
            {visibleTodos.map((list, i) => (
              <ListItem key={list?.id}>
                <ListTodo status={list?.status} text={list?.todoName} id={list?.id} />
              </ListItem>
            ))}
          </SortableContext>
        </List>
      </DndContext>
      <div className={classes.filterButton}>
        <div className={classes.textItem}>
          <Typography sx={{ fontSize: 'small' }}> {visibleTodos?.length} items left</Typography>
        </div>
        <div>
          <Button
            onClick={() => {
              setTab('all');
            }}
            sx={{
              textTransform: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              setTab('active');
            }}
            sx={{
              textTransform: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            Active
          </Button>
          <Button
            onClick={() => {
              setTab('completed');
            }}
            sx={{
              textTransform: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            Filter Completed
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteAllTodo());
            }}
            sx={{
              textTransform: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            Clear Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  data: PropTypes.array,
  todo: PropTypes.array,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: selectData,
  todo: selectTodo,
  theme: selectTheme,
});

export default connect(mapStateToProps)(Home);
