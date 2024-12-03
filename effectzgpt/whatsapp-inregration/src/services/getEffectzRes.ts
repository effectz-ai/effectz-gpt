import axios from 'axios'

const effectzEndpoint = process.env.EFFECTZGPT_ENDPOINT!

export const getEffectzResponse = async (message:string,conversationId: string):Promise<string> => {
    try {
        const response = await axios.post(
            `${effectzEndpoint}/?agent_id=${conversationId}`,
            {
                messages:[
                    {
                        role:'user',
                        content: message
                    }
                ]
            }
        )

        return response.data.result.content
    } catch (error) {
        console.error('Error Communicating with EffectzGPT', error);
        return 'Sorry, Something went wrong'
    }
}