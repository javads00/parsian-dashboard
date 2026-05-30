import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusIcon } from 'lucide-react'
import { Button } from '../forms/button/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
}

export const Placement: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Top tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Right tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Left tooltip</TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const OnIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add new item</TooltipContent>
    </Tooltip>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline">Always visible</Button>
      </TooltipTrigger>
      <TooltipContent>This tooltip is open by default</TooltipContent>
    </Tooltip>
  ),
}

export const WithOffset: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">No offset</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={0}>Offset: 0</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">8px offset</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>Offset: 8</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">16px offset</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16}>Offset: 16</TooltipContent>
      </Tooltip>
    </div>
  ),
}
