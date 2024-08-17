import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  const appUser = {
    name: 'Jon Doe',
    username: 'jon_doe',
  }
  
  test('renders title and author only', () => {
    render(<Blog blog={blog} user={appUser} />)

    screen.getByText('Teach Yourself Programming in Ten Years—Peter Norvig')

    const element = screen.queryByText('https://www.norvig.com/21-days.html')
    expect(element).toBeNull()
  })

  test('renders URL and likes after clicking "View" button', async () => {
    render(<Blog blog={blog} user={appUser} />)
    
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText('URL: https://www.norvig.com/21-days.html')
    screen.getByText('Likes: 5')
  })
})
