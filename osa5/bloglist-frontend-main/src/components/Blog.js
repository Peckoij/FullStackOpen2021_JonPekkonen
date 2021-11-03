import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [viewState, setViewState] = useState(false)


  const toggleVisibility = () => {
    setViewState(!viewState)
  }

  const likeBlog = async () => {
    let blogOwner = ''
    if (blog.user && blog.user.name) {
      blogOwner = blog.user.name
    }

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blogOwner
    }
    updateBlog(blog.id, blogObject)
  }
  const deleteBlog = async () => {
    if(window.confirm(`Do you really want to delete blog: ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
    }
    
  }


  if (viewState) {
    let blogOwner = ''
    if (blog.user && blog.user.name) {
      blogOwner = blog.user.name
    }
    return (
      <div className="blogStyle">
        <div > {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={likeBlog}>like</button></div>
        <div>{blogOwner}</div>
        {user === blogOwner ? (<button onClick={deleteBlog}>delete</button>) : null}
      </div>
    )
  } else {
    return (
      <div className="blogStyle" >
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }
}

export default Blog