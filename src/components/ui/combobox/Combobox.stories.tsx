import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  useComboboxAnchor,
} from './Combobox'

const meta: Meta = {
  title: 'UI/Combobox',
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj

const frameworks = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Vue' },
  { id: '3', label: 'Angular' },
  { id: '4', label: 'Svelte' },
  { id: '5', label: 'Next.js' },
  { id: '6', label: 'Nuxt' },
  { id: '7', label: 'Remix' },
  { id: '8', label: 'Astro' },
]

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = useState<(typeof frameworks)[number] | null>(null)

    return (
      <div className="w-64">
        <Combobox
          items={frameworks}
          value={value}
          onValueChange={setValue}
          isItemEqualToValue={(a, b) => a.id === b.id}
        >
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const WithClearButton: Story = {
  render: function ClearStory() {
    const [value, setValue] = useState<(typeof frameworks)[number] | null>(null)

    return (
      <div className="w-64">
        <Combobox
          items={frameworks}
          value={value}
          onValueChange={setValue}
          isItemEqualToValue={(a, b) => a.id === b.id}
        >
          <ComboboxInput placeholder="Select framework..." showClear />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

const frontendFrameworks = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Vue' },
  { id: '3', label: 'Svelte' },
]

const backendFrameworks = [
  { id: '4', label: 'Express' },
  { id: '5', label: 'Fastify' },
  { id: '6', label: 'Hono' },
]

const allGrouped = [...frontendFrameworks, ...backendFrameworks]

export const Grouped: Story = {
  render: function GroupedStory() {
    const [value, setValue] = useState<(typeof allGrouped)[number] | null>(null)

    return (
      <div className="w-64">
        <Combobox
          items={allGrouped}
          value={value}
          onValueChange={setValue}
          isItemEqualToValue={(a, b) => a.id === b.id}
        >
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxLabel>Frontend</ComboboxLabel>
              <ComboboxList>
                {(item) => {
                  if (!frontendFrameworks.some((f) => f.id === item.id)) return null
                  return (
                    <ComboboxItem key={item.id} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )
                }}
              </ComboboxList>
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Backend</ComboboxLabel>
              <ComboboxList>
                {(item) => {
                  if (!backendFrameworks.some((f) => f.id === item.id)) return null
                  return (
                    <ComboboxItem key={item.id} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )
                }}
              </ComboboxList>
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const MultiSelect: Story = {
  render: function MultiSelectStory() {
    const [values, setValues] = useState<(typeof frameworks)[number][]>([])
    const anchor = useComboboxAnchor()

    return (
      <div className="w-80">
        <Combobox
          multiple
          items={frameworks}
          value={values}
          onValueChange={setValues}
          isItemEqualToValue={(a, b) => a.id === b.id}
        >
          <ComboboxChips ref={anchor}>
            {values.map((item) => (
              <ComboboxChip key={item.id}>
                {item.label}
              </ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Select frameworks..." />
          </ComboboxChips>

          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: function DisabledStory() {
    return (
      <div className="w-64">
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="Disabled combobox" disabled />
          <ComboboxContent>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const WithDisabledItems: Story = {
  render: function DisabledItemsStory() {
    const [value, setValue] = useState<(typeof frameworks)[number] | null>(null)
    const disabledIds = new Set(['3', '6'])

    return (
      <div className="w-64">
        <Combobox
          items={frameworks}
          value={value}
          onValueChange={setValue}
          isItemEqualToValue={(a, b) => a.id === b.id}
        >
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item} disabled={disabledIds.has(item.id)}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}
