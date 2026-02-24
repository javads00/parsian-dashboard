import type { Meta, StoryObj } from '@storybook/react-vite'
import { AtSignIcon, CopyIcon, EyeIcon, LinkIcon, MailIcon, PhoneIcon, SearchIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './InputGroup'

const meta: Meta<typeof InputGroup> = {
  title: 'UI/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter text..." />
    </InputGroup>
  ),
}

export const WithIconStart: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

export const WithIconEnd: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter email..." />
      <InputGroupAddon align="inline-end">
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithIconsBothSides: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <LinkIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="https://example.com" />
      <InputGroupAddon align="inline-end">
        <CopyIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTextAddon: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter password..." type="password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="ghost" size="icon-xs">
          <EyeIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithAtSign: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <AtSignIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  ),
}

export const PhoneNumber: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <PhoneIcon />
        <InputGroupText>+1</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="(555) 000-0000" />
    </InputGroup>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupTextarea placeholder="Write a message..." rows={4} />
    </InputGroup>
  ),
}

export const TextareaWithAddon: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="block-start">
        <InputGroupText>Description</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Enter description..." rows={3} />
    </InputGroup>
  ),
}

export const ButtonSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputGroup className="w-80">
        <InputGroupInput placeholder="Extra small button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs">Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-80">
        <InputGroupInput placeholder="Small button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-80">
        <InputGroupInput placeholder="Icon xs" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-80">
        <InputGroupInput placeholder="Icon sm" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <InputGroup className="w-80" data-disabled="true">
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Disabled input" disabled />
    </InputGroup>
  ),
}
