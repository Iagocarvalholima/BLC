const STORAGE_KEY = 'my-app'
const isLogged = () => !!localStorage.getItem(STORAGE_KEY)

export {STORAGE_KEY,isLogged}