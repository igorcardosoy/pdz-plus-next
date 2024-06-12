import {api} from "../index"


export const check_user_is_allowed = async (username: string | null | undefined): Promise<boolean | Error> => {
    try{
        const urlRelativa = '/discord_user/check_username'
        
        const {data} = await api.post(urlRelativa,{username:username});
        if(data){
            return data.accepted
        }
        return new Error("Usuario não autorizado")
    }catch(error){
        return new Error((error as { detail: string}).detail || "Usuario não autorizado")
    }
}