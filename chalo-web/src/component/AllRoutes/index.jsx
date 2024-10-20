import { Link } from 'react-router-dom'

const AllRoutes = () => {
  const routes = JSON.parse(localStorage.getItem('routes'))
  console.log('routes in allRoutes', routes);
  
  return (
    <>
      <div className='routes-table'>
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="table-head rounded-tl rounded-bl">Route ID</th>
            <th className="table-head">Route Name</th>
            <th className="table-head">Direction</th>
            <th className="table-head">Status</th>
            <th className="table-head">Start Stop</th>
            <th className="table-head">End Stop</th>
            <th className="table-head">Actions</th>
            <th className="title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {routes.map(route => (
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.name}</td>
              <td>{route.direction}</td>
              <td>{route.status}</td>
              <td>{route.origin.label}</td>
              <td>{route.destination.label}</td>
              <td className="w-10 text-center">
              <div className="flex justify-around items-center">
                <Link to={`/routes/${route.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
                {/* <Link to={`/${route.id}`} onClick={onEditRoute}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link> */}

                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default AllRoutes