import { State_persist } from '../lib/store/persist'

type color = (alpha?: number) => string
const Color = (base: string, base_alpha: number = 1): color =>
  (alpha: number = 1) => `rgba(${base}, ${base_alpha * alpha})`

interface Theme {
  color: {
    back: color,
    fore: color,
  }
}

type theme_name = 'light' | 'dark'

const themes: Record<theme_name, Theme> = {
  light: {
    color: {
      back: Color('255, 255, 255'),
      fore: Color('0, 0, 0'),
    },
  },
  dark: {
    color: {
      back: Color('255, 255, 255'),
      fore: Color('0, 0, 0'),
    },
  },
}

const theme_name_state = State_persist('theme_name', 'light')

export
const set_theme = (name: theme_name) =>
  theme_name_state.set(() => name)

export
const useVal_theme = () => themes[theme_name_state.useVal() as theme_name]
