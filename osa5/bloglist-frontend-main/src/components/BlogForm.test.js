import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

/*
    <BlogForm createBlog={addBlog}


     const blog =
    {
        title: "Automated testing is fun",
        author: "Auto tester",
        url: "empty.com",
        likes: 10,
        user: {
            username: "JTest",
            name: "Jest Test",
            blogs: [],
            id: "617e37c448b72114b05923df"
        },
        id: "617e8dd150d655785ddaa382"
    }
*/

test('component calls function with correct information whne creating new blog', async () => {


    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
        target: { value: 'fancy jestester' }
    })
    fireEvent.change(title, {
        target: { value: 'Auto form submit test' }
    })
    fireEvent.change(url, {
        target: { value: 'test.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    //console.log(createBlog.mock.calls);
    expect(createBlog.mock.calls[0][0].title).toBe('Auto form submit test')
    expect(createBlog.mock.calls[0][0].author).toBe('fancy jestester')
    expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})
