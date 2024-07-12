import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { CSS } from '@dnd-kit/utilities';

import { addTodo, deleteAllTodo, deleteTodo, setTheme, setTodo } from '@containers/App/actions';
import { selectData, selectTheme, selectTodo } from '@containers/App/selectors';
import { FixedSizeList } from 'react-window';

// icon and css
import classes from './style.module.scss';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckedIcons from './CheckedIcons';
import ClearIcon from '@mui/icons-material/Clear';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useMemo, useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
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

  const [task, setTask] = useState(visibleTodos);
  const getTaskPos = (id) => task.findIndex((task) => task.id === id);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id === over.id) return;

    setTask((task) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(task, originalPos, newPos);
    });
  };

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
        <List>
          <ListItem alignItems="center" className={classes.listItemInput}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckedIcons />}
              edge="start"
              tabIndex={-1}
              disableRipple
            />
            <TextField
              sx={{
                width: '500px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '10px',
                },
              }}
              onChange={handleAddTodo}
              onKeyDown={handleOnEnter}
            />
          </ListItem>
        </List>
      </div>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <List
          sx={{ maxWidth: 500, bgcolor: 'background.paper', borderRadius: '5px' }}
          className={classes.itemList}
          hidden={listOn}
        >
          <SortableContext items={visibleTodos} strategy={verticalListSortingStrategy}>
            <FixedSizeList height={200} width={500} itemSize={46} itemCount={visibleTodos.length} overscanCount={5}>
              {({ index, style }) => (
                <ListItem key={visibleTodos[index]?.id} style={style}>
                  <ListTodo
                    status={visibleTodos[index]?.status}
                    text={visibleTodos[index]?.todoName}
                    id={visibleTodos[index]?.id}
                  />
                </ListItem>
              )}
            </FixedSizeList>
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
