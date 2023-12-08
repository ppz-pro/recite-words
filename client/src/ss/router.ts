import { useLocation } from 'wouter'

class Page {
  constructor(
    public path: string,
  ) {}

  useNav() {
    const [_, nav] = useLocation()
    return () => nav(this.path)
  }
}

export
const pages = {
  home: new Page('/'),
  login: new Page('/login'),
}
