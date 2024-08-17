import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls `onSubmit` with right data after clicking "Post" button', async () => {
    const mockSubmitHandler = vi.fn()
    const cont = render(<BlogForm onSubmit={mockSubmitHandler} />).container

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')

    const user = userEvent.setup()

    await user.type(titleInput, 'Teach Yourself Programming in Ten Years')
    await user.type(authorInput, 'Peter Norvig')
    await user.type(urlInput, 'https://www.norvig.com/21-days.html')

    const button = cont.querySelector('#postButton')
    await user.click(button)

    const handlerParams = mockSubmitHandler.mock.calls[0][0]
    expect(mockSubmitHandler).toHaveBeenCalledTimes(1)
    expect(handlerParams.title).toBe('Teach Yourself Programming in Ten Years')
    expect(handlerParams.author).toBe('Peter Norvig')
    expect(handlerParams.url).toBe('https://www.norvig.com/21-days.html')
  })
})
