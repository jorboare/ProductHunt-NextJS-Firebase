import '../styles/globals.css'
import firebase, { FirebaseContext } from '../firebase/index'
import useAutenticacion from '../hooks/useAutenticacion'


function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion()

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
