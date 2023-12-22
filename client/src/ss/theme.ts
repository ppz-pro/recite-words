import { Theme } from '../lib/theme'
import { State_persist } from '../lib/store/persist'

type theme_name = 'light' | 'dark'

const themes: Record<theme_name, Theme> = {
  light: new Theme(
    { base: '0,0,0' },
    { base: '255,255,255' },
  ),
  dark: new Theme(
    { base: '255,255,255' },
    { base: '0,0,0' },
  ),
}

const theme_name_state = State_persist('theme_name', 'light')

export
const set_theme = (name: theme_name) =>
  theme_name_state.set(() => name)

export
const useVal_theme = () => themes[theme_name_state.useVal() as theme_name]
