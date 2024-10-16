
import ErrorMessage from './ErrorMessage'
import {render, screen} from '@testing-library/react'
//import '@testing-library/jest-dom'

describe('ErrorMessage component', () => {

  beforeEach(()=> {
    render(<ErrorMessage>Test error message</ErrorMessage>)
  })

  it('renders the children prop correctly', () => {
    
    

    expect(screen.getByText('Test error message')).toBeDefined()
  })
  
    
});
