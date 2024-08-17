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
  
  const mockLikeHandler = vi.fn()
  
  beforeEach(() => {
    mockLikeHandler.mockClear()
    render(
      <Blog
        blog={blog}
        user={appUser}
        onLike={mockLikeHandler}
      />
    )
  })
  
  test('renders title and author only', () => {
    screen.getByText('Teach Yourself Programming in Ten Years—Peter Norvig')

    const element = screen.queryByText('https://www.norvig.com/21-days.html')
    expect(element).toBeNull()
  })

  test('renders URL and likes after clicking "View" button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText('URL: https://www.norvig.com/21-days.html')
    screen.getByText('Likes: 5')
  })

  test('calls `onLike` twice if like button clicked twice', async () => {
    const user = userEvent.setup()

    // Show details and the "like" button
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    // Click the "like" button
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // expect(mockLikeHandler.mock.calls).toHaveLength(2)
    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
