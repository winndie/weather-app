/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEOCODE_MAPS_URL: string
    readonly VITE_POSTCODE_IO_URL: string
    readonly VITE_OPEN_METEO_URL: string
    readonly VITE_DEFAULT_WEATHER_CODE: string
    readonly VITE_DEFAULT_DB_NAME: string
    readonly VITE_DEFAULT_TABLE_NAME: string
    readonly VITE_DEFAULT_WEB_DB_NAME: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }