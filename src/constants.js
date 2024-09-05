export const RESULTS_PER_PAGE = 24
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000'
export const ADMINS = ['altobellidardo@gmail.com', 'rullimaximoeduardo@gmail.com']
