import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // login inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      console.log(user);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setSuccessMessage('Login success!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      console.log(exception.response.data);
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    // event.preventDefault()
    console.log("Logging out user");
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('Issues with logout system')
      console.log(exception.response.data);
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
         id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (blogObject) => {
    console.log(`Creating new blog in with`, blogObject)
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)

      const result = await blogService.create(blogObject)
      console.log(result);

      setBlogs(blogs.concat(result))
      setSuccessMessage('Blog posted succesfully!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error in creating new blog')
      console.log(exception.response.data);
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const updateBlog = async (id, blogObject) => {
    //console.log(`Updating blog in with`, blogObject)
    try {
      // blogService.setToken(user.token)
      const result = await blogService.update(id, blogObject)
      console.log("Blog liked",result);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : result).sort((a, b) => b.likes - a.likes))
      setSuccessMessage('Blog liked succesfully!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error in liking blog')
      console.log(exception.response.data);
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      // blogService.setToken(user.token)
      const result = await blogService.remove(id)
      console.log("Blog removed",result);
      setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes))
      setSuccessMessage('Blog removed succesfully!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error in removing blog')
      console.log(exception.response.data);
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={successMessage} />

      {user === null ?
        loginForm() : <div>
          <div>
            <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
            {blogForm()}
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user.name}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
export default App