import '../styles/table.css'

const PilotTable = ({ drones }) => {
  let prettierDrones

  if (drones) {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false }

    prettierDrones = drones.sort((a, b) => b.time - a.time)
    prettierDrones = drones.map(drone => {
      const time = new Date(drone.time)
      const formattedTime = time.toLocaleTimeString('en-Gb', timeOptions)
      return {
        ...drone,
        time: formattedTime,
        closestDistance: (drone.closestDistance / 1000).toFixed(2)
      }
    })
  }
  
  return (
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Closest Distance (m)</th>
            <th>Time of last violation</th>
          </tr>
        </thead>
        <tbody>
          {prettierDrones && prettierDrones.map(d => 
            <tr key={d.pilot.id}>
              <td>{d.pilot.name}</td>
              <td>{d.pilot.email}</td>
              <td>{d.pilot.phoneNum}</td>
              <td className='longTxt'>{d.closestDistance}</td>
              <td className='longTxt'>{d.time}</td>
            </tr>
            )}
        </tbody>
      </table>
  )
}

export default PilotTable
