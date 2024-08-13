const Logout = ({ name, onClick }) => (
  <div>
    <i>[{name} logged in] </i>
    <button onClick={onClick}>Log out</button>
  </div>
)

export default Logout
