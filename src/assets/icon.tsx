import Icons, { type IconsType } from './index'

export interface IconInterface {
  iconType: IconsType
  className?: string
  onClick?: () => void
}
export const Icon = ({ className = '', onClick, iconType }: IconInterface) => {
  const SVG = Icons[iconType]
  return <SVG className={`h-8 w-8 ${className}`} onClick={() => onClick?.()} />
}
