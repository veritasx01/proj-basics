export function AnimalList({ animalInfos }) {
  return (
    <table className="animal-table">
      <thead>
        <tr>
          <th>Animal</th>
          <th>Count</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {animalInfos.map((info, index) => (
          <tr key={index}>
            <td>{info.type}</td>
            <td>{info.count}</td>
            <td>
              <a
                href={`https://www.google.com/search?q=${info.type}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Search
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
