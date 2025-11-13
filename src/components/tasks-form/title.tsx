import { UPDATE_TASK_MUTATION } from '@/graphql/mutations';
import { Task } from '@/graphql/schema.types';
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@/graphql/types';
import { useForm } from '@refinedev/antd';
import { HttpError, useInvalidate } from '@refinedev/core';
import { GetFields, GetVariables } from '@refinedev/nestjs-query';
import { Form, Skeleton } from 'antd';
import { useEffect } from 'react';
import { Text } from '../text';

type iTitleFormProps = {
  initialValues: {
    title?: Task['title'];
  };
  isLoading?: boolean;
};

export const TitleForm = ({ initialValues, isLoading }: iTitleFormProps) => {
  const invalidate = useInvalidate();
  const { formProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, 'title'>
  >({
    queryOptions: {
      enabled: false,
    },
    redirect: false,
    warnWhenUnsavedChanges: false,
    autoSave: {
      enabled: true,
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ['list'], resource: 'tasks' });
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  useEffect(() => {
    formProps.form?.setFieldsValue(initialValues);
  });
  if (isLoading) {
    return (
      <Skeleton.Input
        size='small'
        style={{ width: '95%', height: '22px' }}
        block
      />
    );
  }
  return (
    <Form {...formProps} initialValues={initialValues}>
      <Form.Item noStyle name='title'>
        <TitleInput />
      </Form.Item>
    </Form>
  );
};

const TitleInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const onTitleChange = (newTitle: string) => {
    onChange?.(newTitle);
  };

  return (
    <Text
      editable={{
        onChange: onTitleChange,
      }}
      style={{ width: '98%' }}
    >
      {value}
    </Text>
  );
};
