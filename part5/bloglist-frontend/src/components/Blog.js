import React, { useState } from 'react'
import blogService from '../services/blogsAPI'

const Blog = ({ blog, handleBlogDelete, curUser }) => {
  const [detailed, setDetailed] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  let blogStyle = {
    display: '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonText = () => (detailed === true ? 'hide' : 'view')

  const allDetails = { display: detailed ? '' : 'none' }

  const handleClickLike = async event => {
    event.preventDefault()
    const modifiedBlog = { ...blog }
    modifiedBlog.user = blog.user.id
    modifiedBlog.likes = likes + 1
    setLikes(likes + 1)
    //console.log(modifiedBlog)
    await blogService.update(modifiedBlog.id, modifiedBlog)
  }

  return (
    <div style={blogStyle}>
      <div className="blogTitle">
        {blog.title} {blog.author}
        <button id="view" onClick={() => setDetailed(!detailed)}>
          {buttonText()}
        </button>
      </div>
      <div style={allDetails} className="allDetails">
        <div>{blog.url}</div>
        <div>
          likes {likes}
          <button id="like" onClick={e => handleClickLike(e)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {curUser === blog.user.name ? (
          <button id="delete" onClick={e => handleBlogDelete(e, blog)}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
