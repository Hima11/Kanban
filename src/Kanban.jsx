import React from 'react';
import { Box, Card, CardActions, CardContent, TextField, Menu, MenuItem, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const Kanban = () => {
  const navigate = useNavigate()
  const localStorageItems = JSON.parse(localStorage.getItem('TaskItems') || '[]')
  const [cards, setCards] = React.useState(localStorageItems.length > 0 ? localStorageItems : [{ title: "To-Do", tasks: [] }])
  const [task, setTask] = React.useState('')
  const [isNewColumn, setIsNewColumn] = React.useState(false)
  const [newColumn, setNewColumn] = React.useState('')
  const [anchorEl, setanchorEl] = React.useState(null)
  const [selectedCardIndex, setSelectedCardIndex] = React.useState('')
  const [draggedTask, setDraggedTask] = React.useState({})

  React.useEffect(() => {
    localStorage.setItem('TaskItems', JSON.stringify(cards));
  }, [cards])

  // Adds task to the column
  const addTask = (cardIndex) => {
    if (task) {
      let cardsCopy = [...cards];
      // Push task to the task array
      cardsCopy[cardIndex].tasks.push(task);
      setCards(cardsCopy);
      setTask('');
      document.getElementById('taskInput' + cardIndex).value = '';
    }
  }

  const addColumn = () => {
    if (cards.length < 5 && newColumn)
      setCards([...cards, { title: newColumn, tasks: [] }]);
    else
      alert('Cannot add more than 5 columns');
    setIsNewColumn(false);
    setNewColumn('');
  }

  const handleClick = (event, index) => {
    setanchorEl(event.currentTarget);
    setSelectedCardIndex(index);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const handleDelete = () => {
    let cardsCopy = [...cards];
    // Delete the card
    if (cardsCopy.length > 1)
      cardsCopy.splice(selectedCardIndex, 1);
    setCards(cardsCopy);
    setanchorEl(null);
    setSelectedCardIndex('');
  }

  const handleClear = () => {
    let cardsCopy = [...cards];
    cardsCopy[selectedCardIndex].tasks.splice(0, cardsCopy[selectedCardIndex].tasks.length);
    setCards(cardsCopy);
    setanchorEl(null);
    setSelectedCardIndex('')
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
        {cards.length > 0 && cards.map((card, cardIndex) =>
          <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => onTaskDrop(event, cardIndex)} key={'div-' + cardIndex} style={{ maxWidth: '25%', marginTop: 10, marginLeft: 10 }}>
            <Card key={'card-' + cardIndex} style={{ backgroundColor: '#faf8f0' }} variant="outlined">
              <TextField variant="standard" defaultValue={card.title} size='large' onChange={(event) => renameColumnName(event.target.value, cardIndex)} style={{ width: '70%', paddingLeft: 20, paddingTop: 20 }} />
              <IconButton aria-label="settings" onClick={(event) => handleClick(event, cardIndex)} style={{ justifyContent: 'right' }}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClear}>Clear</MenuItem>
                {cards.length > 1 ? <MenuItem onClick={handleDelete}>Delete</MenuItem> : ''}
              </Menu>

              <CardContent key={'cardContent-' + cardIndex} style={{ overflow: 'auto', maxHeight: 200 }}>
                {card.tasks && card.tasks.length > 0 && card.tasks.map((task, index) =>
                    <div draggable="true" onDragStart={() => onTaskDrag(task, index, cardIndex)}>
                      <TextField key={'txt-' + index} style={{ paddingTop: 5 }} size='small' id={'item' + index} defaultValue={task} disabled />
                    </div>
                )}
              </CardContent>

              <CardActions key={'cardAction-' + cardIndex} style={{ backgroundColor: '#f5f0de' }}>
                <TextField id={'taskInput' + cardIndex} size='small' onChange={(event) => setTask(event.target.value)} />
                <Button size="small" color="primary" onClick={() => addTask(cardIndex)}>
                  Add Task
                </Button>
              </CardActions>
            </Card>
          </div>)}
        <Box sx={{ maxWidth: 300, paddingLeft: 2, paddingTop: 2 }}>
          {isNewColumn ?
            <div>
              <TextField size='small' label="Name" onChange={(event) => setNewColumn(event.target.value)} /><br />
              <Button size="small" color="primary" onClick={() => addColumn()} disabled={newColumn ? false : true}>Add</Button>
              <Button size="small" color="primary" onClick={() => setIsNewColumn(false)}>Cancel</Button>
            </div> :
            <div><Button size="small" color="primary" onClick={() => setIsNewColumn(true)}>
              Add Column
            </Button></div>}
        </Box>
      </div>
    </>)
}

export default Kanban;