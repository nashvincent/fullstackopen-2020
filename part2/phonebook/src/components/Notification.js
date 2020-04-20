import React from 'react'

const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }

    else {
        const style = success === true ? "success" : "error"

        return (
            <div className={style}>
                {message}
            </div>
        )
    }
}

export default Notification