import { useState, forwardRef, useImperativeHandle } from 'react';

import { Button } from './shared-styled';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideOnVisible = { display: visible ? 'none' : '' };
  const showOnVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { handleToggle };
  });

  return (
    <div>
      <div style={hideOnVisible}>
        <Button onClick={handleToggle}>{props.label}</Button>
      </div>
      <div style={showOnVisible}>
        {props.children}
        <Button onClick={handleToggle}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
