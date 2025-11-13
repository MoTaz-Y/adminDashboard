import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: 'calc(100% + 64px)',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'column',
        margin: '-32px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          overflow: 'scroll',
        }}
      >
        {children}
      </div>
    </div>
  );
};

type Props = {
  onDragEnd: (event: DragEndEvent) => void;
};

export const KanbanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 5 pixels before activating
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    //  Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      distance: 5,
      delay: 250,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
};
