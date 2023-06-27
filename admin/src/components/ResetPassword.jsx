import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import cross from "./static/images/cross.png";

import { fetchPassword } from "../features/postPassword/postPassword";

const ResetPassword = () => {
  const postStatus = useSelector((state) => state.reset.status);
  console.log(postStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchPassword(""));
  }, [])

  return (
    <>
      <div className="centered-text">
        <h1>Укажіть свою ел. адресу. Ми надішлемо вам посилання, за яким можна створити новий пароль.</h1>
      </div>
      <div className="container">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Електронна адреса" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button type="submit" className="btn" >
            <img src={cross} />
          </button>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Новий пароль" aria-label="Recipient's username" aria-describedby="button-addon2" />

          <button type="submit" className="btn" >
            <img src={cross} />
          </button>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Підтвердити пароль" aria-label="Recipient's username" aria-describedby="button-addon2" />

          <button type="submit" className="btn" >
            <img src={cross} />
          </button>
        </div>

        <div className="input-group mb-3">
          <input type="text" className="form-control er" placeholder="Код" aria-label="Recipient's username" aria-describedby="button-addon2" />

          <button type="submit" className="btn" >
            <img src={cross} />
          </button>
        </div>

      </div>

      <div className="kn">
        <button type="submit" className="btn" style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} id="knop">
          <span>Надіслати</span>
        </button>
      </div>
    </>
  )
}

export default ResetPassword