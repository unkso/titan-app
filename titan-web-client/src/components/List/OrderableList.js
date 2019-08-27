import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RootRef from '@material-ui/core/RootRef';
import PropTypes from 'prop-types';

export function OrderableList (props) {
  return (
    <DragDropContext>
      <Droppable droppableId="ranked-coc">
        {(provided) => (
          <RootRef rootRef={provided.innerRef}>
            <List component="div">
              {props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      ContainerComponent="div"
                      ContainerProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      {props.itemRenderer(item, snapshot, index)}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
}

OrderableList.propTypes = {
  itemRenderer: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  }))
};
