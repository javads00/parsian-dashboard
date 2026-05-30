import z from 'zod'

export const CreateLabelSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  username: z.string().min(5, 'Username must be at least 5 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  roleId: z.string().min(1, 'Please select a role'),
})

export type CreateLabelFormData = z.infer<typeof CreateLabelSchema>

export const CountryFormSchema = z.object({
  name: z.string().min(2, 'Please enter a valid label name'),
})

export type CountryFormValues = z.infer<typeof CountryFormSchema>


