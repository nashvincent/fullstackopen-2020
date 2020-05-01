import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogsAPI'
import loginService from './services/loginAPI'
import './App.css'

// TODO -> 5.10 - implement DELETE in blogController and add a button to delete blogs
// Havent done -> 5.15, 5.12, 5.22
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [flag, setFlag] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogList => {
      sortBlogs(blogList)
      setBlogs(blogList)
    })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    // This fn allows login of unauthorised users - FIX
    event.preventDefault()
    const user = await loginService.login({ username, password })

    setUsername('')
    setPassword('')

    // how even
    if (user === 401) {
      setMessage('wrong username or password')
      setFlag(false)
      setTimeout(() => {
        setMessage(null)
        setFlag(null)
      }, 5000)
    } else {
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleBlogCreate = async blogFormData => {
    try {
      const newBlog = await blogService.create(blogFormData)
      setBlogs(blogs.concat(newBlog))

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setFlag(true)
      setTimeout(() => {
        setMessage(null)
        setFlag(null)
      }, 5000)
    } catch (error) {
      setMessage('Failed to add blog')
      setFlag(false)
      setTimeout(() => {
        setMessage(null)
        setFlag(null)
      }, 5000)
    }
  }

  const sortBlogs = blogs => {
    return blogs.sort((a, b) => {
      return a.likes - b.likes
    })
  }

  const handleBlogDelete = async (event, blog) => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)

    if (result === true) {
      await blogService.remove(blog.id)
      const newList = blogs.filter(item => item.id !== blog.id)

      setBlogs(newList)
    }
  }

  return (
    <div>
      <Notification message={message} flag={flag} />
      {!user ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <Blogs
            blogs={blogs}
            user={user}
            handleLogOut={handleLogOut}
            handleBlogDelete={handleBlogDelete}
          />
          <Togglable buttonLabel={'new blog'}>
            <BlogForm handleBlogCreate={handleBlogCreate} />
          </Togglable>
        </>
      )}
    </div>
  )
}

export default App
