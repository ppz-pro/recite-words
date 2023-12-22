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

export
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
