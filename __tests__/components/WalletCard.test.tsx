import { render, screen } from '@testing-library/react'
import { WalletCard } from '@/components/WalletCard'

describe('WalletCard', () => {
  it('should render balance with proper currency formatting', () => {
    render(<WalletCard balance={1234567.89} />)
    expect(screen.getByText('Available Balance')).toBeInTheDocument()
    expect(screen.getByText(/USD 1,234,567.89/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /withdraw/i })).toBeInTheDocument()
  })
})

