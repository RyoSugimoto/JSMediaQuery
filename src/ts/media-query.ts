interface Handler {
  eventName: string
  callback: Function
}

export default class MediaQuery {
  readonly query: string
  readonly triggers = [
    'resize', 'DOMContentLoaded', 'load'
  ]
  private debounceTimer: number = 0
  private isMatched: boolean | null = null
  private handlers: Handler[] = []

  constructor(query: string) {
    this.query = query
    this._attach()
  }

  match(fn: Function) {
    this.on('match', fn)
    return this
  }

  unmatch(fn: Function) {
    this.on('unmatch', fn)
    return this
  }

  watch(fn: Function) {
    this.on('watch', fn)
    return this
  }

  on(eventName: string, fn: Function) {
    this.handlers.push({
      eventName: eventName,
      callback: fn,
    })
    return this
  }

  private _attach() {
    for (let i = 0; i < this.triggers.length; i++) {
      window.addEventListener(this.triggers[i], () => {
        window.cancelAnimationFrame(this.debounceTimer)
        this.debounceTimer = window.requestAnimationFrame(this._test.bind(this))
      })
    }
    return this
  }

  private _test() {
    const isMatched = window.matchMedia(this.query).matches
    if (isMatched !== this.isMatched) {
      this._dispatch('watch', isMatched)
    }
    if (isMatched && !this.isMatched) {
      this.isMatched = true
      this._dispatch('match', isMatched)
    } else if (!isMatched && this.isMatched !== false) {
      this.isMatched = false
      this._dispatch('unmatch', isMatched)
    }
  }

  private _dispatch(eventName: string, isMatched: boolean) {
    this.handlers.filter((handler, index) => {
      if (handler.eventName !== eventName) {
        return false
      }
      handler.callback({
        eventName,
        index,
        isMatched,
        callback: handler.callback,
        query: this.query,
      })
      return true
    })
  }
}
