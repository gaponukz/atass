import axios from "axios"


const EditProfile = () => {

  const response = axios.post("http://localhost:8080/updateUserInfo", {
    fullName: "skrynyk vlad", // "testuser@knu.ua"
    phone: "0994613617666", // "somepass"
    allowsAdvertisement: false
  })
  console.log(response);

  return (
    <div>EditProfile</div>
  )
}

export default EditProfile