import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Button } from '../button'
import { Toaster } from './Sonner'

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Toaster>

export const Playground: Story = {
  render: () => (
    <>
      <div className="space-x-2 p-6">
        <Button
          onClick={() =>
            toast.success('Action completed', { description: 'Everything went fine.' })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error('Something went wrong', { description: 'Try again later.' })}
        >
          Error
        </Button>
        <Button variant="ghost" onClick={() => toast('Neutral message')}>
          Neutral
        </Button>
      </div>
      <Toaster />
    </>
  ),
}
