import type { Meta, StoryObj } from '@storybook/react-vite'
import type { LabelProps } from '@/typescript/types/components'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {}

export const WithDescription: Story = {
  render: (args: LabelProps) => (
    <div className="flex flex-col gap-2">
      <Label {...args} />
      <p className="text-muted-foreground text-sm">
        We will never share your email with anyone else.
      </p>
    </div>
  ),
}
