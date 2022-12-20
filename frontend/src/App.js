import { useEffect, useState } from 'react'
import axios from 'axios'
import PilotTable from './components/PilotTable'

const App = (props) => {
  const [pilots, setPilots] = useState(props.pilots)

  return (
    <div>
      <PilotTable pilots={pilots} />
    </div>
  )
}

export default App
