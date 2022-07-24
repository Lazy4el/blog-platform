import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitArticles } from 'features/article/articleSlice';

const PaginationBlog = () => {
  const { offset, limit, articlesCount } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const onChangePage = (offset) => {
    offset = offset - 1;
    dispatch(getLimitArticles({ limit, offset }));
  };
  return (
    <Pagination
      showSizeChanger={false}
      current={offset + 1}
      total={articlesCount * 10}
      onChange={onChangePage}
    ></Pagination>
  );
};

export default PaginationBlog;
