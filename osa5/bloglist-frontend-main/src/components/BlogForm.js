import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    // New blog inputs
    const [newTitle, setTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newUrl, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        console.log(`Creating new blog in with ${newTitle}${newAuthor}${newUrl}`)
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={addBlog}>
                <div>title<input id='title' value={newTitle} onChange={({ target }) => setTitle(target.value)} /></div>
                <div>author<input id='author' value={newAuthor} onChange={({ target }) => setAuthor(target.value)} /></div>
                <div>url<input id='url' value={newUrl} onChange={({ target }) => setUrl(target.value)} /></div>
                <button id='submitBlog' type="submit">create</button>
            </form>
        </div>
    )


}
export default BlogForm