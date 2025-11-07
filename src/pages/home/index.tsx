import {
  DealsChart,
  UpcomingEvents,
  DashboardTotalCountCard,
  LatestActivities,
} from '@/components';
import { Col, Row } from 'antd';
import { useCustom } from '@refinedev/core';
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/queries';
import { DashboardTotalCountsQuery } from '@/graphql/types';

const Home = () => {
  const { result, query } = useCustom<DashboardTotalCountsQuery>({
    url: '',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });
  console.log('this is the result response', result?.data?.companies);
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource='companies'
            isLoading={query.isLoading}
            totalCount={result?.data?.companies?.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource='contacts'
            isLoading={query.isLoading}
            totalCount={result?.data?.contacts?.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource='deals'
            isLoading={query.isLoading}
            totalCount={result?.data?.deals?.totalCount}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px',
          }}
        >
          <UpcomingEvents />
          {/* UpcomingEvents */}
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: '460px',
          }}
        >
          <DealsChart />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col xs={24}>
          <LatestActivities />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
