import { z } from 'zod'

const numericVersionRegex = /^\d+(?:\.\d+)*$/

function compareNumericVersions(a: string, b: string) {
  const pa = a.split('.').map((x) => Number.parseInt(x, 10))
  const pb = b.split('.').map((x) => Number.parseInt(x, 10))

  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const av = pa[i] ?? 0
    const bv = pb[i] ?? 0
    if (av > bv) return 1
    if (av < bv) return -1
  }
  return 0
}

export const ReleaseAppSchema = z
  .object({
    appName: z.string().min(1, 'App name is required'),
    platform: z.string().min(1, 'platform is required'),
    version: z
      .string()
      .min(1, 'Version is required')
      .regex(numericVersionRegex, 'Version must be numeric (e.g. 1.4.2)'),
    previousVersion: z
      .string()
      .min(1, 'Previous version is required')
      .regex(numericVersionRegex, 'Previous version must be numeric (e.g. 1.4.1)'),
    downloadUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  })
  .superRefine((values, ctx) => {
    // If version format is invalid, regex will report it; avoid duplicate noise.
    if (!numericVersionRegex.test(values.version) || !numericVersionRegex.test(values.previousVersion))
      return

    if (compareNumericVersions(values.previousVersion, values.version) === 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['previousVersion'],
        message: 'Previous version cannot be greater than the current version',
      })
    }
  })

export type ReleaseAppFormValues = z.infer<typeof ReleaseAppSchema>
