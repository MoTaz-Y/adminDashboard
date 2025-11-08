import React from 'react';
import CompanyList from './list';
import { Form, Input, Modal, Select } from 'antd';
import { useModalForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { useSelect } from '@refinedev/antd';
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { UsersSelectQuery } from '@/graphql/types';

const Create = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: {
        resource: 'companies',
        action: 'list',
      },
      options: {
        keepQuery: true,
      },
      type: 'replace',
    });
  };
  const { formProps, modalProps } = useModalForm({
    resource: 'companies',
    action: 'create',
    redirect: false,
    defaultVisible: true,
    mutationMode: 'optimistic',
    onMutationSuccess: () => {
      goToListPage();
    },
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });
  const { selectProps, query } = useSelect<GetFieldsFromList<UsersSelectQuery>>(
    {
      resource: 'users',
      pagination: { pageSize: 100 },
      optionLabel: 'name',
      meta: {
        gqlQuery: USERS_SELECT_QUERY,
      },
    }
  );
  return (
    <CompanyList>
      <Modal
        {...modalProps}
        onCancel={goToListPage}
        title='Create Company'
        mask={true}
        width={512}
      >
        <Form {...formProps} layout='vertical'>
          <Form.Item
            label='Company Name'
            name='name'
            rules={[{ required: true }]}
          >
            <Input placeholder='Please enter the company name' />
          </Form.Item>
          <Form.Item
            label='Sales Owner'
            name='salesOwnerId'
            rules={[{ required: true }]}
          >
            <Select
              placeholder='Please select the sales owner'
              {...selectProps}
              options={
                query.data?.data.map((user) => ({
                  label: (
                    <SelectOptionWithAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                  value: user.id,
                })) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};

export default Create;
