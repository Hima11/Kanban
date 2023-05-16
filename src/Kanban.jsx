import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KanbanCard from './components/KanbanCard';

const Kanban = () => {
  const navigate = useNavigate()
  const localStorageItems = JSON.parse(localStorage.getItem('TaskItems') || '[]')
  const [cards, setCards] = React.useState(localStorageItems.length > 0 ? localStorageItems : [{ title: "To-Do", tasks: [] }])
  const [isNewColumn, setIsNewColumn] = React.useState(false)
  const [draggedTask, setDraggedTask] = React.useState({})
  const [anchorEl, setanchorEl] = React.useState('')
  const columnRef = React.useRef();
  const selectedCardIndex = React.useRef();

  React.useEffect(() => {
    localStorage.setItem('TaskItems', JSON.stringify(cards));
  }, [cards])

  // Adds task to the column
  const addTask = (cardIndex, task) => {
    if (task) {
      let cardsCopy = [...cards];
      // Push task to the task array
      cardsCopy[cardIndex].tasks.push(task);
      setCards(cardsCopy);
      document.getElementById('taskInput' + cardIndex).value = '';
    }
  }

  const addColumn = () => {
    if (cards.length < 5 && columnRef.current.value)
      setCards([...cards, { title: columnRef.current.value, tasks: [] }]);
    else
      alert('Cannot add more than 5 columns');
    setIsNewColumn(false);
  }

  const handleClick = (event, index) => {
    setanchorEl(event.currentTarget);
    selectedCardIndex.current = index;
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const handleDelete = () => {
    let cardsCopy = [...cards];
    // Delete the card
    if (cardsCopy.length > 0)
      cardsCopy.splice(selectedCardIndex.current, 1);
    setCards(cardsCopy);
    setanchorEl(null);
    selectedCardIndex.current = '';
  }

  const handleClear = () => {
    let cardsCopy = [...cards];
    cardsCopy[selectedCardIndex.current].tasks.splice(0, cardsCopy[selectedCardIndex.current].tasks.length);
    setCards(cardsCopy);
    setanchorEl(null);
    selectedCardIndex.current = '';
  }

  const renameColumnName = (value, index) => {
    let cardsCopy = [...cards];
    cardsCopy[index].title = value;
    setCards(cardsCopy);
  }

  const onTaskDrag = (task, taskIndex, cardIndex) => {
    setDraggedTask({task: task, taskIndex: taskIndex, cardIndex: cardIndex});
  }

  const onTaskDrop = (event, cardIndex) => {
    event.preventDefault();
    if(Object.keys(draggedTask).length !== 0 ) {
      let cardsCopy = [...cards];
      cardsCopy[draggedTask.cardIndex].tasks.splice(draggedTask.taskIndex, 1);
      cardsCopy[cardIndex].tasks.push(draggedTask.task);
      setCards(cardsCopy);
      setDraggedTask({});
    }
  }

  return (
    <>
      <Button type="link" onClick={() => navigate("/")}>Home</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.length > 0 && cards.map((item, cardIndex) =>
          <KanbanCard key={cardIndex} 
                item={item} 
                cardIndex={cardIndex}
                anchorEl={anchorEl}
                addTask={addTask}
                handleClick={handleClick}
                handleDelete={handleDelete}
                handleClear={handleClear}
                renameColumnName={renameColumnName}
                onTaskDrag={onTaskDrag}
                onTaskDrop={onTaskDrop}
                handleClose={handleClose}
          />
        )}
        {(cards.length < 5) && <Box sx={{ maxWidth: 300, paddingLeft: 2, paddingTop: 2 }}>
          {isNewColumn ?
            <div>
              <TextField inputRef={columnRef} size='small'/><br />
              <Button size="small" color="primary" onClick={() => addColumn()}>Add</Button>
              <Button size="small" color="primary" onClick={() => setIsNewColumn(false)}>Cancel</Button>
            </div> :
            <div><Button type="submit" size="small" color="primary" onClick={() => setIsNewColumn(true)}>
              Add Column
            </Button></div>}
        </Box>}
      </div>
    </>)
}

export default Kanban;