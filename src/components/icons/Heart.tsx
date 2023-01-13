import Svg, { Path } from 'react-native-svg'
import { IconInterface } from './types'

export const Heart = ({ height, width, color = '#222', props }: IconInterface) => (
  <Svg width={width} height={height} fill={'none'} viewBox="0 0 24 24" {...props}>
    <Path
      d="m4.45 13.908 6.953 6.531c.24.225.36.338.5.366a.5.5 0 0 0 .193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.203 5.203 0 0 0 .549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 0 1-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 0 0 .549 6.981Z"
      stroke={color}
    />
  </Svg>
)
