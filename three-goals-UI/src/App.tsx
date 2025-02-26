import './App.css'
import API from './services/api.tsx'
import PatchGoals from './services/patchGoals.tsx'

function App() {

  return (
    <>
      <div>
        <API/>
        <PatchGoals/>
      </div>
    </>
  )
}

export default App
