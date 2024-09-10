import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return null;
  }

  const color = notification.type === 'error' ? 'red' : 'green';

  return <Alert $variant={color}>{notification.message}</Alert>;
};

const Alert = styled.div`
  color: ${(props) => props.$variant || '#c70'};
  background: white;
  font-size: 1.2em;
  border: 1px solid;
  padding: 0.6em;
  margin-bottom: 0.6em;
`;

export default Notification;
