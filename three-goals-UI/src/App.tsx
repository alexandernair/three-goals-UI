import './App.css'
import API from './services/api.tsx'

function App() {

  return (
    <>
      <div>
        <API></API>
        <h1>Three Goals For The Day:</h1>
        <div className="input-fields">
          <input name="myInput" />
          <input name="myInput" />
          <input name="myInput" />
        </div>
      </div>
    </>
  )
}

export default App
