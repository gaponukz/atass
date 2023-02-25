import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            "first_name": "John",
            "last_name": "Nut",
            "phone_number": "3809753254356",
            "email_address": "user@example.com",
            "is_authenticated": true,
            "password_hash": "666ccfcc3eabf27353c398bc101ee0aca83e5de8d7664467c3c19e2a54953ba4",
            "id": "2ec1c6eb-5f62-449a-a2a1-cae04a43760b"
        },
        {
            "first_name": "Anna",
            "last_name": "Hao",
            "phone_number": "3809853524354",
            "email_address": "user@example.com",
            "is_authenticated": false,
            "password_hash": null,
            "id": "be0b99a6-c6cb-4250-8c26-ca5ea8ad860f"
        }
    ]
}

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        }
    }
})

export const { usersFeature } = usersSlice.actions;

export default usersSlice.reducer;