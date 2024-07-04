import React from 'react';
import { Button, Checkbox, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckedIcons from './CheckedIcons';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { deleteTodo, setTodo } from '@containers/App/actions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const ListTodo = ({ status, text, id }) => {
  const dispatch = useDispatch();

  // DnD Kit hook for sortable list item
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 5,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(setTodo(id));
  };

  return (
    <ListItemButton dense>
      <ListItemIcon>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckedIcons />}
          edge="start"
          tabIndex={-1}
          checked={status}
          onClick={() => handleToggle(id)}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={text} sx={{ textDecoration: status ? 'line-through' : 'none' }} />
      <Button
        onClick={() => handleDelete(id)}
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        <ClearIcon />
      </Button>
    </ListItemButton>
  );
};

export default ListTodo;
