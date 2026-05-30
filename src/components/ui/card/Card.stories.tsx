import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../forms/button/Button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Plan</CardTitle>
        <CardDescription>Choose the plan that’s right for you.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Upgrade
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          <li>Unlimited projects</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
}
