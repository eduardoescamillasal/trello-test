import React from "react";
import {Draggable} from "@hello-pangea/dnd";
import EditableWorkItem from "views/EditableWorkItem";
import Icon from "Components/Icon";

// Convert RGB to Hex
const rgbToHex = (r, g, b) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

// Function to calculate color based on time elapsed since creation and return hex
const getColorFromTime = (createdTime) => {
  const now = new Date();
  const createdDate = new Date(createdTime);
  const elapsedHours = (now - createdDate) / (1000 * 60 * 60); // Hours since creation

  // Map to a 6-hour interval for noticeable change
  const percentageOfInterval = Math.min(elapsedHours / 6, 1);

  // Transition from blue to red for visibility
  const red = Math.round(percentageOfInterval * 255);
  const green = Math.round((1 - percentageOfInterval) * 255);
  const blue = Math.round((1 - percentageOfInterval) * 128);

  const hexColor = rgbToHex(red, green, blue);
  console.log(`Generated color for task created at ${createdTime}: ${hexColor}`); // Debug log
  return hexColor;
};

// Function to get the time since task was created in a human-readable format
const getTimeSinceCreated = (createdTime) => {
  const now = new Date();
  const createdDate = new Date(createdTime);
  const elapsedSeconds = Math.floor((now - createdDate) / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `${elapsedHours}h`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays}d`;
};

// Style function for draggable item
const getItemStyle = (isDragging, draggableStyle, backgroundColor) => ({
  userSelect: "none",
  zIndex: 2,
  background: isDragging ? "#f8f9fa" : backgroundColor,
  backgroundColor: `${backgroundColor} !important`,
  ...draggableStyle,
});

function Stage({data, stage, removeWorkItem, updateWorkItem}) {
  return (
    <div className='p-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
      <div className='flex flex-col gap-2'>
        {data &&
          data.map((task, index) => {
            const backgroundColor = getColorFromTime(task.created);
            const timeSinceCreated = getTimeSinceCreated(task.created);

            return (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className='bg-kb_bg-card rounded-lg p-3 flex flex-col'
                    style={{
                      backgroundColor: `${backgroundColor} !important`,
                      ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
                      backgroundColor: `${backgroundColor} !important`,
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <EditableWorkItem
                          updateWorkItem={updateWorkItem}
                          removeWorkItem={removeWorkItem}
                          task={task}
                          stage={stage}
                        />
                      </div>
                      {task.text && (
                        <div className='flex items-center gap-2 ml-2'>
                          <div className='flex items-center gap-1'>
                            <Icon type='info' width='12' height='12' className='text-kb_txt' />
                            <span className='text-kb_txt text-xs text-zinc-400'>
                              {timeSinceCreated}
                            </span>
                          </div>
                          <div
                            className='cursor-pointer'
                            onClick={() => removeWorkItem({taskID: task.id, stage})}>
                            <Icon type='remove' width='16' height='16' className='text-kb_txt' />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
      </div>
    </div>
  );
}

export default Stage;
