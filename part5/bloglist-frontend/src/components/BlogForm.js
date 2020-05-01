import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event, title, author, url) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    handleBlogCreate(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={e => handleSubmit(e, title, author, url)}>
      <h1>create new</h1>
      <div>
        title:
        <input value={title} id="title" onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input value={author} id="author" onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input value={url} id="url" onChange={e => setUrl(e.target.value)} />
      </div>
      <button id="create">create</button>
    </form>
  )
}

export default BlogForm
