
import { createTamagui } from 'tamagui'
import { config as tamaguiConfig } from '@tamagui/config/v3'

export default createTamagui(tamaguiConfig)

export type AppConfig = typeof tamaguiConfig
