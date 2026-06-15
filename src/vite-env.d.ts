/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_API_URL_STAGING: string
  readonly VITE_API_URL_PRODUCTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
