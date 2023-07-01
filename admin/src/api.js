const API_URL = 'http://localhost:8000/'

export async function getUniqueRoutes() { // AllRoutes.jsx
    let response = await fetch(`${API_URL}/public/get_unique_routes`)
    return await response.json()
}

export async function getRoutesFamily(moveFromCity, moveToCity) { // хз поки де воно має бути
    let response = await fetch(`${API_URL}/admin/get_routes_family?move_from_city=${moveFromCity}&move_to_city=${moveToCity}`, {
        headers: {Authentication: 'Bearer 12345678'}
    })

    return await response.json()
}

export async function getRouteById(id) { // getUniqueDetail.jsx
    let response = await fetch(`${API_URL}/admin/get_route?route_id=${id}`, {
        headers: {Authentication: 'Bearer 12345678'}
    })

    return await response.json()
}