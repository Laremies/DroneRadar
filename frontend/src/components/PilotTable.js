const PilotTable = ({ pilots }) => {
  return (
    <table>
        <thead>
          <tr>
            <th colSpan={4}>Pilots who have violated the NDZ perimeter in the last 10 minutes</th>
          </tr>
        </thead>
        <tbody>
          {pilots.map(pilot =>
            <tr key={pilot.pilotId}>
              <td>{pilot.firstName} {pilot.lastName}</td>
              <td>{pilot.email}</td>
              <td>{pilot.phoneNumber}</td>
              <td>{pilot.distance}</td>
            </tr>
            )}
        </tbody>
      </table>
  )
}

export default PilotTable
