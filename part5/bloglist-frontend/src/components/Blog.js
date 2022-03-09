import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    updateBlog(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const handleRemove = () => {
    const result = window.confirm(`Remove blog ${blog.title}`)
    if (result) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title}
        <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      </div>
      {view && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>
            {user && user.id === blog.user && (
              <button onClick={handleRemove}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
