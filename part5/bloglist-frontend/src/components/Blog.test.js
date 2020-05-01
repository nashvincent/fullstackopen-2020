import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('only title and author are rendered', () => {
  const testData = {
    title: 'Test',
    author: 'Abcd',
    url: 'asd',
    likes: 1,
    user: {
      name: 'test',
    },
  }

  const component = render(
    <Blog blog={testData} user={'test'} handleBlogDelete={() => jest.fn()} />
  )

  expect(component.container).toHaveTextContent(`${testData.title} ${testData.author}`)
})

test('when view button is clicked, full blog details are shown', () => {
  const testData = {
    title: 'Test',
    author: 'Abcd',
    url: 'asd',
    likes: 1,
    user: {
      name: 'test',
    },
  }

  const component = render(
    <Blog blog={testData} user={'test'} handleBlogDelete={() => jest.fn()} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.allDetails')).toBeDefined()
})

// TODO - fix
test('form calls event handler with the right details', () => {
  const handleBlogCreate = jest.fn((a, b, c, d) => `${b} ${c} ${d}`)

  const component = render(<BlogForm handleBlogCreate={handleBlogCreate} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  })
  fireEvent.change(author, {
    target: { value: 'fso' },
  })
  fireEvent.change(url, {
    target: { value: 'fso2020.com' },
  })
  fireEvent.submit(form)

  expect(handleBlogCreate.mock.calls).toHaveLength(1)
  expect(handleBlogCreate.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(handleBlogCreate.mock.calls[0][0].author).toBe('fso')
  expect(handleBlogCreate.mock.calls[0][0].url).toBe('fso2020.com')
})
