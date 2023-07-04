import { Button } from "@mui/material";

import { useSelector } from "react-redux";

const SignUp = () => {


    return (
        <>
            {/* <div
                style={{
                    marginLeft: "300px",
                    marginRight: "300px"
                }}
            >
                <input
                    type="text"
                    className="form-control rrr"
                    placeholder="gmail"
                />

                <input
                    type="text"
                    className="form-control rrr"
                    placeholder="code"
                />

                <Button
                    variant="contained"
                    onClick={() => {
                        console.log("test");
                    }}
                >Click</Button>
            </div> */}
            <div class="container">
                <div class="input-group mb-3 " >
                    <input type="text" class="form-control" placeholder="Ім'я" aria-label="Recipient's username" aria-describedby="button-addon2" />

                </div>
                <div class="input-group mb-3 ">
                    <input type="text" class="form-control" placeholder="Пошта" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="телефон" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Пароль" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Підтвердити пароль" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Код з пошти" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>
                <div>
                    <p class="object">Дозволити надсилати рекламу на почту</p>
                    <input type="checkbox" id="myCheckbox" class="object" />
                </div>
            </div>

            <div class="kn">
                <button type="submit" class="btn" style={{ backgroundColor: "#40ABCF", color: "white", fontWeight: "bold" }} id="knop">
                    <span>Зареєструвати</span>
                </button>
            </div>
        </>
    )
}

export default SignUp