import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Blog = ({ blog }) => {
  return (
    <Entry>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}—{blog.author}
      </Link>
    </Entry>
  );
};

const Entry = styled.div`
  padding: 0.4em 0.4em;
  border-bottom: 1px dotted black;
  margin-bottom: 0.3em;
`;

export default Blog;
