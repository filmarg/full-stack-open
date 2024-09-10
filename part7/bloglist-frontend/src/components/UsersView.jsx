import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const UsersView = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h3>Users</h3>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;

  tr {
    border-bottom: 1px solid black;
  }

  th,
  td {
    padding: 0.4em 1.2em;
  }

  tbody > tr:nth-of-type(even) {
    background-color: #ededed;
  }
`;

export default UsersView;
