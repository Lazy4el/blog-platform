import { Tag } from 'antd';
import { v4 } from 'uuid';

const TagList = ({ tags }) => {
  const tegsArr = tags.filter(Boolean);
  return (
    <div className="TagList">
      {tegsArr?.map((tag) => (
        <Tag key={v4()}>{tag}</Tag>
      ))}
    </div>
  );
};

export default TagList;
