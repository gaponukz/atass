import fetch from 'node-fetch'
import { fileURLToPath } from "url"

class Route {
    async getAllRoutes() {
        // const response = await fetch(`http://localhost:8000/api/...`)
        // return await response.json()
        return new Promise((resolve) => {
            resolve([
                {move_from: "Kiyv", move_to: "Warsaw", start_date: new Date(), arrival_date: new Date(), schedule: []},
                {move_from: "Warsaw", move_to: "Kiyv", start_date: new Date(), arrival_date: new Date(), schedule: []}
            ])
        })
    }
}

// usage
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const db = new Route()

    db.getAllRoutes().then(routes => {
        console.log(routes)
    })
}
