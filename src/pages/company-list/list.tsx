import CustomAvatar from '@/components/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { CompaniesListQuery } from '@/graphql/types';
import { SearchOutlined } from '@ant-design/icons';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
} from '@refinedev/antd';
import { getDefaultFilter, HttpError, useGo, useTable } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Input, Space, Table } from 'antd';
import { Text } from '@/components/text';
import { currencyNumber } from '@/utilities/currency-number';

const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const table = useTable<
    GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >({
    resource: 'companies',
    pagination: { pageSize: 12 },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });
  const { data: tableProps } = table.result;
  console.log(
    '+=+=++++====++++this is the result response from company list',
    table
  );

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: 'companies',
                  action: 'create',
                },
                options: {
                  keepQuery: true,
                },
                type: 'replace',
              });
            }}
          />
        )}
      >
        <Table dataSource={tableProps}>
          <Table.Column<Company>
            dataIndex='name'
            title='Company Title'
            defaultFilteredValue={getDefaultFilter('id', table.filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder='Search Company' />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <CustomAvatar
                  shape='square'
                  name={record.name}
                  src={record.avatarUrl}
                />
                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex='totalRevenue'
            title='Open deals amount'
            render={(value, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />
          <Table.Column<Company>
            dataIndex='id'
            title='Actions'
            fixed='right'
            render={(value) => (
              <Space>
                <EditButton hideText size='small' recordItemId={value} />
                <DeleteButton hideText size='small' recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};

export default CompanyList;
