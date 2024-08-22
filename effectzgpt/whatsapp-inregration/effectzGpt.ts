import 'dotenv/config'
import axios, { AxiosResponse } from 'axios'

export const getEffectzResponse = async(message:string):Promise<AxiosResponse<any, any> | null> => {
    try {
        const response = axios.post(process.env.EFFECTZGPT_ENDPOINT!,{
            messages:[
                {
                    role:'user',
                    content: message
                }
            ]
        })
        return response
    } catch (error) {
        console.error(error)
        return null
    }
}
