import { Task } from '@/graphql/schema.types';
import { getDateColor } from '@/utilities/date';
import { MarkdownField } from '@refinedev/antd';
import { Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { Text } from '../text';
import { UserTag } from '../tags/user-tags';

type iDescriptionHeaderProps = {
  description?: Task['description'];
};

type iDueDateHeaderPRops = {
  dueDate?: Task['dueDate'];
};

type iUserHeaderProps = {
  users?: Task['users'];
};

export const DescriptionHeader = ({ description }: iDescriptionHeaderProps) => {
  if (description) {
    return (
      <Typography.Paragraph ellipsis={{ rows: 8 }}>
        <MarkdownField value={description} />
      </Typography.Paragraph>
    );
  }
  return <Typography.Link>Add task description</Typography.Link>;
};

export const DueDateHeader = ({ dueDate }: iDueDateHeaderPRops) => {
  if (dueDate) {
    const color = getDateColor({
      date: dueDate,
      defaultColor: 'processing',
    });
    const getTagText = () => {
      switch (color) {
        case 'error':
          return 'Overdue';
        case 'warning':
          return 'Due soon';
        default:
          return 'Processing';
      }
    };
    return (
      <Space size={[0, 8]}>
        <Tag color={color}>{getTagText()}</Tag>
        <Text> {dayjs(dueDate).format('MMMM D, YYYY - h:ma')}</Text>
      </Space>
    );
  }

  return <Typography.Link>Add due date</Typography.Link>;
};

export const UsersHeader = ({ users = [] }: iUserHeaderProps) => {
  if (users.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Space>
    );
  }

  return <Typography.Link>Assign to users</Typography.Link>;
};
