import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideOnVisible = { display: visible ? 'none' : '' }
  const showOnVisible = { display: visible ? '' : 'none' }

  const handleToggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { handleToggle }
  })

  return (
    <div>
      <div style={hideOnVisible}>
        <button onClick={handleToggle}>{props.label}</button>
      </div>
      <div style={showOnVisible}>
        {props.children}
        <button onClick={handleToggle}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
