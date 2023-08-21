/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEOCODE_MAPS_URL: string
    readonly VITE_POSTCODE_IO_URL: string
    readonly VITE_OPEN_METEO_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }