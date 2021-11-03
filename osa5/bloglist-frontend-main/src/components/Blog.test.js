import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
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


    const component = render(
        <Blog key={blog.id} blog={blog} user={"Jest Test"} />
    )

    expect(component.container).toHaveTextContent(
        'Automated testing is fun Auto tester view'
    )
})

test('clicking the button shows more info', async () => {
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

    const mockHandler = jest.fn()

    const component = render(
        <Blog key={blog.id} blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={"Jest Test"} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const element = component.getByText(
        'empty.com'
    )
    
    expect(element).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
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

    const mockHandler = jest.fn()

    const component = render(
        <Blog key={blog.id} blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={"Jest Test"} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
  
    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })