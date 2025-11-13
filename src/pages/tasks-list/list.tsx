import { KanbanBoard, KanbanBoardContainer } from '@/components/kanban/board';
import { ProjectCardMemo } from '@/components/kanban/card';
import KanbanColumn from '@/components/kanban/comlumn';
import KanbanItem from '@/components/kanban/item';
import { TASK_STAGES_QUERY, TASKS_QUERY } from '@/graphql/queries';
import { TaskStage } from '@/graphql/schema.types';
import React from 'react';
import { useList, useNavigation, useUpdate } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { TasksQuery } from '@/graphql/types';
import { KanbanAddCardButton } from '@/components/kanban/add-card-button';
import { KanbanColumnSkeleton, ProjectCardSkeleton } from '@/components';
import { UPDATE_TASK_STAGE_MUTATION } from '@/graphql/mutations';
import { DragEndEvent } from '@dnd-kit/core';
// import { useNavigation } from 'react-router';

const List = ({ children }: React.PropsWithChildren) => {
  // getting the task stages
  const { result: stages, query: stagesQuery } = useList<TaskStage>({
    resource: 'taskStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
      },
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'asc',
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  // getting the tasks
  const { result: tasks, query: tasksQuery } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: 'tasks',
    sorters: [
      {
        field: 'dueDate',
        order: 'asc',
      },
    ],
    meta: {
      gqlQuery: TASKS_QUERY,
    },
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: 'off',
    },
  });

  const Nav = useNavigation();
  console.log('this is the navigate response', Nav);
  const { mutate: updateTask } = useUpdate();
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }
    const unassignedStage = tasks.data.filter((task) => task.stageId === null);
    const grouped = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));
    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === 'unassigned'
        ? '/tasks/new'
        : `/tasks/new?stageId=${args.stageId}`;

    // replace(path);
    // useNavigation to navigate to the create page with the stageId in the meta and path
    Nav.create('tasks', 'replace', {
      meta: {
        stageId: path,
      },
    });
  };
  const isLoading = tasksQuery.isLoading || stagesQuery.isLoading;

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === 'unassigned') {
      stageId = null;
    }

    updateTask({
      resource: 'tasks',
      id: taskId,
      values: {
        stageId: stageId,
      },
      successNotification: false,
      mutationMode: 'optimistic', // this will update the UI immediately and then update the database
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  };
  if (isLoading) return <PageSkeleton />;
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id='unassigned'
            title={'unassigned'}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
          >
            {taskStages.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: 'unassigned' }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: 'unassigned' })}
              />
            )}
          </KanbanColumn>
          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {!isLoading &&
                column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
              {isLoading && <ProjectCardSkeleton />}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default List;

export const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
          <ProjectCardSkeleton />
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
