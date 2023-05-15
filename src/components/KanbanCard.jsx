import React from 'react';
import { Card, CardActions, CardContent, TextField, Menu, MenuItem, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const KanbanCard = (props) => {
  const taskRef = React.useRef();

  return (
    <>
          <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => props.onTaskDrop(event, props.cardIndex)} key={'div-' + props.cardIndex} style={{ maxWidth: '25%', marginTop: 10, marginLeft: 10 }}>
            <Card key={'card-' + props.cardIndex} style={{ backgroundColor: '#faf8f0' }} variant="outlined">
              <TextField variant="standard" defaultValue={props.item.title} size='large' onChange={(event) => props.renameColumnName(event.target.value, props.cardIndex)} style={{ width: '70%', paddingLeft: 20, paddingTop: 20 }} />
              <IconButton aria-label="settings" onClick={(event) => props.handleClick(event, props.cardIndex)} style={{ justifyContent: 'right' }}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={props.anchorEl}
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
              >
                <MenuItem onClick={props.handleClear}>Clear</MenuItem>
                {props.item.length > 1 ? <MenuItem onClick={props.handleDelete}>Delete</MenuItem> : ''}
              </Menu>

              <CardContent key={'cardContent-' + props.cardIndex} style={{ overflow: 'auto', maxHeight: 200 }}>
                {props.item.tasks && props.item.tasks.length > 0 && props.item.tasks.map((task, index) =>
                    <div  key={'contentDiv' + index} draggable="true" onDragStart={() => props.onTaskDrag(task, index, props.cardIndex)}>
                      <TextField key={'txt-' + index} style={{ paddingTop: 5 }} size='small' id={'item' + index} defaultValue={task} disabled />
                    </div>
                )}
              </CardContent>

              <CardActions key={'cardAction-' + props.cardIndex} style={{ backgroundColor: '#f5f0de' }}>
                <TextField inputRef={taskRef} id={'taskInput' + props.cardIndex} size='small' />
                <Button type="submit" size="small" color="primary" onClick={() => props.addTask(props.cardIndex, taskRef.current.value)}>
                  Add Task
                </Button>
              </CardActions>
            </Card>
          </div>
    </>)
}

export default KanbanCard;