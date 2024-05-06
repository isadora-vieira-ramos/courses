
const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error == false? "notification": "error"}>
      {message}
    </div>
  )
}

export default Notification