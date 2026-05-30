import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <Textarea className="w-80" placeholder="Type your message here..." />
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <Textarea className="w-80" defaultValue="This textarea has a default value." />
  ),
}

export const WithRows: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea className="w-80" placeholder="2 rows" rows={2} />
      <Textarea className="w-80" placeholder="6 rows" rows={6} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Textarea className="w-80" placeholder="Disabled textarea" disabled />
  ),
}

export const Invalid: Story = {
  render: () => (
    <Textarea className="w-80" placeholder="Invalid textarea" aria-invalid="true" />
  ),
}

export const WithMaxLength: Story = {
  render: () => (
    <Textarea className="w-80" placeholder="Max 100 characters" maxLength={100} />
  ),
}
