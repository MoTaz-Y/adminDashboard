import { totalCountVariants } from '@/constants';
import { Card, Skeleton } from 'antd';
import { Text } from '../text';
import { Area, AreaConfig } from '@ant-design/plots';

interface iProps {
  resource: 'companies' | 'contacts' | 'deals';
  isLoading: boolean;
  totalCount: number;
}
const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: iProps) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];
  // putting the data in useMemo to avoid re-rendering and performance issues
  //now use the are config
  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: 'index',
    yField: 'value',
    // @ts-ignore
    appendPadding: [1, 0, 0, 0],

    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    // stack: { orderBy: 'value', reverse: true },
    // seriesField: 'state',
    // // animation: { appear: { duration: 500 } },
    // // startOnZero: false,
    // shapeField: 'state',
    // legend: {
    //   offsetY: -6,
    // },
    axis: {
      y: {
        tickCount: 12,
        label: {
          style: {
            stroke: 'transparent',
          },
        },
        grid: {
          line: {
            style: {
              stroke: 'transparent',
            },
          },
        },
      },
      x: false,
    },
    smooth: true,
    tooltip: false,
    line: {
      colorField: primaryColor,
      stack: {
        orderBy: 'maxIndex',
        reverse: true,
        y: 'y1',
      },
      style: {
        stroke: 'transparent',
      },
    },
    area: {
      style: () => ({
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
      }),
    },
  };
  return (
    <Card
      style={{ height: '96px', padding: 0 }}
      bodyStyle={{ padding: '8px 8px 8 12px' }}
      size='small'
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        {icon}
        <Text size='sm' style={{ marginLeft: '0.5rem' }}>
          {title}
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text
          strong
          size='xxxl'
          style={{
            flex: 1,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            textAlign: 'start',
            marginLeft: '48px',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              size='small'
              style={{ width: '74px', marginTop: '8px' }}
            />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: '50%' }} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
