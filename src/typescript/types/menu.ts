// types/menu.ts
import type { IconsType } from '@/assets'
import type { TResource } from '@/data'
export type MenuItem = {
  title: string
  url: string
  key: TResource
  breadCrumb: string[]
  icon: IconsType
}
