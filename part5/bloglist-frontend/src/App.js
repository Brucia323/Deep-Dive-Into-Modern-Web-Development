import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    setBlogs(blogs.sort((a, b) => a.likes - b.likes))
  }, [blogs])

  const [user, setUser] = useState(null)
  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      loginFormRef.current.toggleVisibility()
      return true
    } catch (exception) {
      return false
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (newTitle, newAuthor, newUrl) => {
    try {
      const blog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updateBlog = async (id, newObject) => {
    try {
      const response = await blogService.update(id, newObject)
      if (response) {
        setBlogs(blogs.map(blog => (blog.id === response.id ? response : blog)))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async id => {
    const status = await blogService.remove(id)
    if (status === 204) {
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {user ? (
          <p>
            {user.name} logged-in<button onClick={handleLogout}>logout</button>
          </p>
        ) : (
          <Togglable buttonLabel='login' ref={loginFormRef}>
            <LoginForm login={handleLogin} />
          </Togglable>
        )}
        <Togglable buttonLabel='create' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
