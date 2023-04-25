import {LoginPayloadType} from "../common/types/types";
import {instance, ResponseType} from "../common/constants/instanceAPI";

type AuthMeResponseType = {
    id: number
    login: string
    email: string
}
export const authAPI = {
    login(payload: LoginPayloadType ){
        return instance.post<ResponseType<{userId: string}>>('/auth/login', payload)
    },
    me(){
        return instance.get('auth/me')
    },
    logout(){
        return instance.delete('/auth/login')
    }
}
// authAPI.me().then((res)=>res.data)