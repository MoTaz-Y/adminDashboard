import { UnorderedListOutlined } from '@ant-design/icons';
import { Card, List, Space } from 'antd';
import { Text } from '../text';
import LatestActivitiesSkeleton from '../skeleton/latest-activities';
import { useList } from '@refinedev/core';
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from '@/graphql/queries';
import CustomAvatar from '../custom-avatar';
import dayjs from 'dayjs';

const LatestActivities = () => {
  const { result: audit, query: auditQuery } = useList({
    resource: 'audits',
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: 'createdAt',
        order: 'desc',
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });
  console.log('this is the audit response', audit?.data);
  console.log('this is the audit query==============', auditQuery.isLoading);
  console.log('this is the audit Error==============', auditQuery.error);
  const dealIds = audit?.data?.map((audit: any) => audit?.targetId);
  console.log('this is the dealIds', dealIds);
  const { result: deals, query: dealsQuery } = useList({
    resource: 'deals',
    pagination: { mode: 'off' },
    queryOptions: {
      enabled: !!dealIds?.length,
    },
    filters: [
      {
        field: 'id',
        operator: 'in',
        value: dealIds,
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });
  console.log(
    'this is the deals ids response+++++++++++',
    deals?.data.find((deal: any) => deal.id === '152')
  );
  if (auditQuery.error) {
    console.log('this is the audit error', auditQuery.error);
    return <div>Something went wrong</div>;
  }
  const isLoading = dealsQuery.isLoading || auditQuery.isLoading;
  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '0 1rem' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UnorderedListOutlined />
          <Text size='sm' style={{ marginLeft: '0.5rem' }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout='horizontal'
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout='horizontal'
          dataSource={audit?.data}
          renderItem={(item) => {
            const deal =
              deals?.data?.find((deal) => deal.id == item.targetId) ||
              undefined;
            console.log('this is the deal', deal);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <CustomAvatar
                      name={item.user?.name}
                      shape='square'
                      src={deal?.company.avatarUrl}
                      size={48}
                    />
                  }
                  title={
                    <Text size='xs'>
                      {dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}
                    </Text>
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text>
                        {item?.action === 'CREATE' ? 'created' : 'moved'}
                      </Text>
                      <Text ellipsis={{ tooltip: true }} strong>
                        {deal?.title}
                      </Text>
                      <Text>deal</Text>
                      <Text>
                        {item?.action && deal?.stage?.title
                          ? item.action === 'CREATE'
                            ? 'in'
                            : 'to'
                          : null}
                      </Text>
                      <Text strong>{deal?.stage?.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default LatestActivities;
