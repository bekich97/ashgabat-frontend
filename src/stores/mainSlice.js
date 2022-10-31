import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        lang: "tm",
        word: "",
        verified: false,
        phone: "",
        otp: false,
        nextpath: "",
    },
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        },
        setWord: (state, action) => {
            state.word = action.payload
        },
        setVerified: (state, action) => {
            state.verified = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setOtp: (state, action) => {
            state.otp = action.payload
        },
        setNextpath: (state, action) => {
            state.nextpath = action.payload
        },
    },
});

export const { setLang, setWord, setVerified, setPhone, setOtp, setNextpath } = mainSlice.actions

export default mainSlice.reducer