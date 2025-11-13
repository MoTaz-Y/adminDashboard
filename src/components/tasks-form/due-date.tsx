import { UPDATE_TASK_MUTATION } from '@/graphql/mutations';
import { Task } from '@/graphql/schema.types';
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@/graphql/types';
import { useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { GetFields, GetVariables } from '@refinedev/nestjs-query';
import { Button, DatePicker, Form, Space } from 'antd';
import dayjs from 'dayjs';

type iDueDateFormProps = {
  initialValues: {
    dueDate?: Task['dueDate'];
  };
  cancelForm: () => void;
};

export const DueDateForm = ({
  initialValues,
  cancelForm,
}: iDueDateFormProps) => {
  const { formProps, saveButtonProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, 'dueDate'>
  >({
    queryOptions: {
      enabled: false,
    },
    redirect: false,
    onMutationSuccess: () => {
      cancelForm();
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Form {...formProps} initialValues={initialValues}>
        <Form.Item
          noStyle
          name='dueDate'
          getValueProps={(val) => {
            if (!val) return { val: undefined };
            return { val: dayjs(val) };
          }}
        >
          <DatePicker
            format='YYY-MM-DD HH:mm'
            showTime={{
              showSecond: false,
              format: 'HH:mm',
            }}
            style={{ backgroundColor: '#fff' }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Button type='default' onClick={cancelForm}>
          Cancel
        </Button>
        <Button {...saveButtonProps} type='primary'>
          Save
        </Button>
      </Space>
    </div>
  );
};
