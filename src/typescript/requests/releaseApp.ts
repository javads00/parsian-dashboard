export const ReleaseAppPlatform = {
  ios: 'ios',
  android: 'android',
  web: 'web',
} as const

export type TReleaseAppPlatform = (typeof ReleaseAppPlatform)[keyof typeof ReleaseAppPlatform]

export type TReleaseApp = {
  id: string
  appName: string
  platform: TReleaseAppPlatform
  version: string
  previousVersion: string
  buildNumber: number
  releaseDate: string
  isActive: boolean
  downloadUrl: string
  createdAt: Date
}
