import Svg, { Path } from 'react-native-svg'
import { IconInterface } from './types'

export const Plus = ({ height, width, color = 'none', props }: IconInterface) => (
  <Svg width={width} height={height} fill={color} viewBox="0 0 24 24" {...props}>
    <Path d="M12 6L12 18" stroke="#222222" strokeLinecap="round" />
    <Path d="M18 12L6 12" stroke="#222222" strokeLinecap="round" />
    <Path d="M0.75 12H23.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 0.75V23.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)
