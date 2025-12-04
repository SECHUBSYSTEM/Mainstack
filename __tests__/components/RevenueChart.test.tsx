import { render } from '@testing-library/react'
import { RevenueChart } from '@/components/RevenueChart'

// Mock Recharts to avoid rendering issues in test environment
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}))

describe('RevenueChart', () => {
  it('should render chart components with data', () => {
    const mockData = [
      { date: 'Jan 01, 2024', value: 1000 },
      { date: 'Jan 02, 2024', value: 1500 },
    ]
    
    const { getByTestId } = render(<RevenueChart data={mockData} />)
    
    expect(getByTestId('area-chart')).toBeInTheDocument()
    expect(getByTestId('area')).toBeInTheDocument()
    expect(getByTestId('x-axis')).toBeInTheDocument()
    expect(getByTestId('tooltip')).toBeInTheDocument()
  })
})

