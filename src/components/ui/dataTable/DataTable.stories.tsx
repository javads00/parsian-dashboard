import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable'

// Sample data types
type User = {
  id: string
  name: string
  email: string
  role: string
}

type Product = {
  id: string
  name: string
  price: number
  stock: number
  category: string
}

// User columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

// Product columns
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return <div>${row.original.price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
]

const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  render: () => {
    const userData: User[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    ]

    return <DataTable columns={userColumns} data={userData} />
  },
}

export const WithProducts: Story = {
  render: () => {
    const productData: Product[] = [
      { id: '1', name: 'Laptop', price: 999.99, stock: 15, category: 'Electronics' },
      { id: '2', name: 'Mouse', price: 29.99, stock: 50, category: 'Accessories' },
      { id: '3', name: 'Keyboard', price: 79.99, stock: 30, category: 'Accessories' },
      { id: '4', name: 'Monitor', price: 299.99, stock: 20, category: 'Electronics' },
    ]

    return <DataTable columns={productColumns} data={productData} />
  },
}

export const Empty: Story = {
  render: () => {
    return <DataTable columns={userColumns} data={[]} />
  },
}

export const ManyRows: Story = {
  render: () => {
    const userData: User[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
    }))

    return <DataTable columns={userColumns} data={userData} />
  },
}

export const CustomCells: Story = {
  render: () => {
    const customColumns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <strong>{row.original.name}</strong>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <a href={`mailto:${row.original.email}`} className="text-blue-600 hover:underline">
            {row.original.email}
          </a>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <span
            className={`rounded-full px-2 py-1 text-xs ${
              row.original.role === 'Admin'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.original.role}
          </span>
        ),
      },
    ]

    const userData: User[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    ]

    return <DataTable columns={customColumns} data={userData} />
  },
}
