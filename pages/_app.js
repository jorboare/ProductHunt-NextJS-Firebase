import '../styles/globals.css'
import firebase, { FirebaseContext } from '../firebase/index'
import useAutenticacion from '../hooks/useAutenticacion'


function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion()
  console.log(usuario)

  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
