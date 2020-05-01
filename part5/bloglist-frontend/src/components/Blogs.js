import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, handleLogOut, handleBlogDelete }) => {
  const blogDetails = blogs.map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      handleBlogDelete={handleBlogDelete}
      curUser={user.name}
    />
  ))

  return (
    <div>
      <h1>blogs</h1>
      <div>
        {`${user.name} Logged In`}
        <button onClick={handleLogOut}>logout</button>
      </div>
      <br />
      {blogDetails}
    </div>
  )
}

export default Blogs
