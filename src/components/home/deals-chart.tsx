import { Card } from 'antd';
import { Area, AreaConfig } from '@ant-design/plots';
import { Text } from '../text';
import { DollarOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { mapDealsData } from '@/utilities/helper';
import { useList } from '@refinedev/core';
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { DashboardDealsChartQuery } from '@/graphql/types';

const COLORS = {
  WON: ['#2fa6ddff', '#1a5f91ff', '#0f3c66ff'],
  LOST: ['#fff1f0', '#ffa39e', '#ff4d4f'],
  lineWon: '#1890ff',
  lineLost: '#ff4d4f',
};
const DealsChart: React.FC<{ colors?: typeof COLORS }> = ({
  colors = COLORS,
}) => {
  // useList hook to get the data we need
  const { result } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['WON', 'LOST'],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });
  console.log('this is the result response', result?.data);
  // putting the data in useMemo to avoid re-rendering and performance issues
  const dealData = useMemo(() => {
    return mapDealsData(result?.data);
  }, [result?.data]);
  //now use the are config
  // const config: AreaConfig = {
  //   data: dealData,
  //   xField: 'timeText',
  //   yField: 'value',
  //   stack: { orderBy: 'value', reverse: true },
  //   seriesField: 'state',
  //   // animation: { appear: { duration: 500 } },
  //   // startOnZero: false,
  //   shapeField: 'state',
  //   legend: {
  //     offsetY: -6,
  //   },
  //   axis: {
  //     y: { labelFormatter: '~s' },
  //   },
  //   tooltip: { channel: 'y', valueFormatter: '.2f' },
  //   line: {
  //     stack: {
  //       orderBy: 'maxIndex',
  //       reverse: true,
  //       y: 'y1',
  //     },
  //     style: {
  //       stroke: '#c2b3f8ff',
  //     },
  //   },
  // };
  const config = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    seriesField: 'state',
    stack: { orderBy: 'value', reverse: true },

    smooth: true,
    area: {
      shape: 'smooth',
      style: (datum: any) => {
        if (datum.state === 'WON') {
          return {
            fill: `l(270) 0:${colors.WON[0]} 0.5:${colors.WON[1]} 1:${colors.WON[2]}`,
            fillOpacity: 0.95,
          };
        }
        if (datum.state === 'LOST') {
          return {
            fill: `l(270) 0:${colors.LOST[0]} 0.5:${colors.LOST[1]} 1:${colors.LOST[2]}`,
            fillOpacity: 0.95,
          };
        }
        return {};
      },
    },

    line: {
      smooth: true,
      style: (datum: any) => ({
        stroke: datum?.state === 'WON' ? colors.lineWon : colors.lineLost,
        strokeWidth: 2,
      }),
    },

    colorField: 'state',
    color: (v: any) => {
      const state = typeof v === 'string' ? v : (v?.state ?? v?.value);
      if (state === 'WON') return colors.lineWon;
      if (state === 'LOST') return colors.lineLost;
      return colors.lineWon;
    },

    axis: {
      y: { labelFormatter: '~s' },
    },

    legend: { position: 'top-left', offsetY: -10 },
    tooltip: { shared: true },

    padding: [16, 16, 40, 16],
    animation: {
      appear: { animation: 'path-in', duration: 800 },
      update: { animation: 'path-in', duration: 600 },
    },

    interactions: [{ type: 'element-highlight' }, { type: 'active-region' }],
  } as unknown as AreaConfig;

  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '24px 24px 0 24px' }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <DollarOutlined />
          <Text size='sm' style={{ marginLeft: '0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
