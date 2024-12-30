import { render, screen } from '@testing-library/react'
import DisplayUsers from '../../src/components/Dashboard/DisplayUsers'

describe('Display users', () => {
    it('should render the user table', () => {
        render(<DisplayUsers />)
        screen.debug()
    })
})
