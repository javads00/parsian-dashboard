import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  args: {
    orientation: 'horizontal',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64">
      <p className="text-muted-foreground mb-2 text-sm">Above</p>
      <Separator {...args} />
      <p className="text-muted-foreground mt-2 text-sm">Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-16',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <span>Start</span>
      <Separator {...args} />
      <span>End</span>
    </div>
  ),
}
