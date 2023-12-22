import { State_persist } from '../lib/store/persist'

type get_color = (alpha?: number) => string

const Color = (base: string, base_alpha = 1) =>
  (alpha = 1) => `rgba(${base}, ${base_alpha * alpha})`

interface Color_opts {
  base: string
  alpha?: number
}

interface Theme_color {
  fore: get_color
  back: get_color
}

class Theme {
  public readonly color: Theme_color
  constructor(
    fore: Color_opts,
    back: Color_opts,
    private readonly font: number = 16,
  ) {
    this.color = {
      fore: Color(fore.base, fore.alpha),
      back: Color(back.base, back.alpha)
    }
  }

  size(font: number = 1) {
    return this.font * font + 'px'
  }

  xy(y: number, x: number, bottom: number = y, left: number = x) {
    return `${this.size(y)} ${this.size(x)} ${this.size(bottom)} ${this.size(left)}`
  }

  border(alpha: number = 1) {
    return `1px solid ${this.color.fore(alpha)}`
  }
}

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
