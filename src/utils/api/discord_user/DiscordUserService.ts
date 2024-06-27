import {api} from "../index"


export const checkIfUserIsAllowed = async (username: string | null | undefined): Promise<boolean | Error> => {
    try{
        const urlRelative = '/discord_user/check_username'
        
        const {data} = await api.post(urlRelative,{username:username});
        if(data){
            return data.accepted
        }
        return new Error("Usuario não autorizado")
    }catch(error){
        return new Error((error as { detail: string}).detail || "Usuario não autorizado")
    }
}