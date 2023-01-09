import { useEffect, useState } from 'react'
import PilotTable from './components/PilotTable'
import droneService from './services/drones'
import './styles/body.css'

const App = () => {
  const [drones, setDrones] = useState([])

  useEffect(() => {
    const interval = setInterval(async () => {
      const newDrones = await droneService.getAll()
      setDrones(newDrones)
    }, 2000)

    return () => clearInterval(interval)
  }, [drones])


  return (
    <div>
    {drones ? (
      <>
        <h1 className='pop-out'>
          <a href='https://assignments.reaktor.com/birdnest' target='_blank' rel='noreferrer'>
            PROJECT BIRDNEST
          </a>
        </h1>
        <h2>
          Pilots who have recently violated the NDZ (no drone zone)
        </h2>
        <PilotTable drones={drones} />
      </>
    ) : (
      <>
        <h1>Encountering server problems</h1>
        <h2>Restarting application, please wait a moment...</h2>
      </>
    )}
  </div>
  )
}

export default App
