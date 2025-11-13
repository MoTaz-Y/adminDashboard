import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Text } from '@/components/text';
import React from 'react';

interface iKanbanAddCardButtonProps {
  onClick: () => void;
}
export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<iKanbanAddCardButtonProps>) => {
  return (
    <Button
      size='large'
      type='text'
      icon={<PlusSquareOutlined />}
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        justifyContent: 'flex-start',
      }}
    >
      {children}
      <Text size='sm' type='secondary'>
        Add New Card
      </Text>
    </Button>
  );
};
