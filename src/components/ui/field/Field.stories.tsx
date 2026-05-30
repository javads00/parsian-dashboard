import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../forms/button/Button'
import { Input } from '../forms/input/Input'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from './Field'

const meta: Meta<typeof Field> = {
  title: 'UI/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: () => (
    <FieldSet className="w-[320px]">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input id="name" placeholder="Jane Doe" />
            <FieldDescription>We’ll use this on your invoices.</FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input id="email" type="email" placeholder="jane@example.com" />
            <FieldError errors={[{ message: 'Please enter a valid email address.' }]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <Button className="self-end">Save</Button>
    </FieldSet>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <FieldSet className="w-[420px]">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldTitle>Notifications</FieldTitle>
          <FieldDescription>
            Choose how you want to receive notifications about your account.
          </FieldDescription>
          <FieldContent>
            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Email alerts
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> SMS alerts
              </label>
            </div>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
