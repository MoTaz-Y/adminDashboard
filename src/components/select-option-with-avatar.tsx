import CustomAvatar from './custom-avatar';
import { Text } from './text';

type iSelectOptionWithAvatarProps = {
  name: string;
  avatarUrl?: string;
  shape?: 'circle' | 'square';
};

const SelectOptionWithAvatar = ({
  name,
  avatarUrl,
  shape,
}: iSelectOptionWithAvatarProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <CustomAvatar name={name} src={avatarUrl} shape={shape} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
