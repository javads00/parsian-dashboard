type AuthHandlers = {
  getAccessToken: () => string | undefined
  signOut: () => void | Promise<void>
}

let handlers: AuthHandlers = {
  getAccessToken: () => undefined,
  signOut: () => {},
}

export function registerAuthHandlers(next: AuthHandlers) {
  handlers = next
}

export function getAccessToken() {
  return handlers.getAccessToken()
}

export function authSignOut() {
  return handlers.signOut()
}
