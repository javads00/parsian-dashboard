import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  args: {
    placeholder: 'Email',
    type: 'email',
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
