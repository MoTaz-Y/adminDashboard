import { getNameInitials } from '@/utilities/get-name-initials';
import { Avatar as AntAvatar, AvatarProps } from 'antd';
type Props = AvatarProps & {
  name: string;
};
const customAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntAvatar
      alt={name}
      size={'small'}
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name)}
    </AntAvatar>
  );
};

export default customAvatar;
