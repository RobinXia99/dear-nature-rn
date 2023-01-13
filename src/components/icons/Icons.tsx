import { Heart } from './Heart'
import { Minus } from './Minus'
import { Plus } from './Plus'

export enum IconEnum {
  plus,
  minus,
  heart,
}

interface IconInterface {
  icon: IconEnum
  width?: number
  height?: number
  color?: string
}

export const Icon = ({ icon, width = 21, height = 21, color }: IconInterface) => {
  if (icon === IconEnum.plus) return <Plus width={width} height={height} color={color} />
  if (icon === IconEnum.minus) return <Minus width={width} height={height} color={color} />

  return <Heart width={width} height={height} />
}
