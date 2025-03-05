import './Styles/App.css'
import Header from './Components/Header.tsx'
import 'typeface-open-sans'
import DateComp from './Components/DateComp.tsx'
import BuildingHabits from './Components/BuildingHabits.tsx'

function App() {

  return (
    <>
      <div>
        <Header/>
        <DateComp/>
        <BuildingHabits/>
      </div>
    </>
  )
}

export default App
