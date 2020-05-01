import React from 'react'

const Notification = ({ message, flag }) => {
  if (message === null) {
    return null
  } else {
    const style = flag === true ? 'success' : 'error'

    return <div className={style}>{message}</div>
  }
}

export default Notification
