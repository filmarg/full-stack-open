import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Teach Yourself Programming in Ten Years',
    author: 'Peter Norvig',
    url: 'https://www.norvig.com/21-days.html',
    likes: '5',
    user: {
      name: 'Jon Doe',
      username: 'jon_doe',
    },
  }

  const user = {
    name: 'Jon Doe',
    username: 'jon_doe',
  }
  
  test('renders title and author only', () => {
    render(<Blog blog={blog} user={user} />)

    screen.getByText('Teach Yourself Programming in Ten Years—Peter Norvig')

    const element = screen.queryByText('https://www.norvig.com/21-days.html')
    expect(element).toBeNull()
  })
})
