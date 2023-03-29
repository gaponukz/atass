# Atass rest api

## Installation

1. Clone the repository:

```sh
git clone https://github.com/gaponukz/atass.git
cd atass
```

2. Install pyhton packages
```sh
pip install -r requirements.txt
```

## Deployment
To run the app on your local machine, simply execute the server.py file:
```sh
python server.py
```
Alternatively, you can use uvicorn to run the app:
```sh
uvicorn server:app --host=localhost --port=5000 --reload
```

The app should now be accessible at [http://localhost:5000](http://localhost:5000).

## Js usage

For admin methods
```js
const requestUrl = `http://localhost:5000/admin/get_routes_family?move_from_city=Kiyv&move_to_city=Warsaw`
const token = localStorage.getItem('token')

await fetch(requestUrl, { headers: { 'Authorization': `Bearer ${token}` }} )
.then(async response => await response.json()).then(data => {
    // add some magic here
    console.log(data)
}).catch(error => console.error(error))
```

Public request example
```js
await fetch(`http://localhost:5000/public/get_unique_routes`)
.then(async response => await response.json()).then(data => {
    // add some magic here
    console.log(data)
}).catch(error => console.error(error))
```
Response:
```json
{
    "status": 200,
    "message": "Success",
    "body": ...
}
```
If `status` != 200 than we get some logic error, check `message` for details. <br>
`...` is response body, can be any type.
