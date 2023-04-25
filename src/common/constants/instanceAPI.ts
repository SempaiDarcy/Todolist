import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "a3689f8d-4bdb-4cdd-9a1a-83733437adfc"
    }
})

export enum ResponseResulCode {
    OK = 0,
    Error = 1,
    Captcha = 10
}
export type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}