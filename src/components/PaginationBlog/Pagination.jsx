import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitArticles } from 'features/article/articleSlice';
import 'components/PaginationBlog/Pagination.scss';

const PaginationBlog = () => {
  const { limit, articlesCount, articlesPage } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const onChangePage = (page) => {
    const offset = (page - 1) * 5;
    dispatch(getLimitArticles({ limit, offset, page }));
  };
  return (
    <Pagination
      showSizeChanger={false}
      current={articlesPage}
      total={articlesCount}
      defaultPageSize={limit}
      onChange={onChangePage}
    ></Pagination>
  );
};

export default PaginationBlog;
