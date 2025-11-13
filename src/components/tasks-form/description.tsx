import { UPDATE_TASK_MUTATION } from '@/graphql/mutations';
import { Task } from '@/graphql/schema.types';
import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@/graphql/types';
import { useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { GetFields, GetVariables } from '@refinedev/nestjs-query';
import { Button, Form, Space } from 'antd';
import MDEditor from '@uiw/react-md-editor';

type iDescriptionProps = {
  initialValues: {
    description?: Task['description'];
  };
  cancelForm: () => void;
};

export const DescriptionForm = ({
  initialValues,
  cancelForm,
}: iDescriptionProps) => {
  const { formProps, saveButtonProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, 'description'>
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

  // const form = (formProps as any).form as ReturnType<typeof Form.useForm>[0];
  const form = (formProps as { form?: ReturnType<typeof Form.useForm>[0] })
    .form;

  return (
    <>
      <Form {...formProps} initialValues={initialValues}>
        <Form.Item noStyle name='description'>
          <MDEditor
            preview='edit'
            data-color-mode='light'
            height={250}
            value={form?.getFieldValue('description')}
            onChange={(val) => form?.setFieldValue('description', val)}
          />
        </Form.Item>
      </Form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          marginTop: '12px',
        }}
      >
        <Space>
          <Button type='default' onClick={cancelForm}>
            Cancel
          </Button>
          <Button {...saveButtonProps} type='primary'>
            Save
          </Button>
        </Space>
      </div>
    </>
  );
};
