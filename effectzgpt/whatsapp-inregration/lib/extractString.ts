const code_prompt = ["Contact us", "Chat with our chatbot", "YES", "NO"]

export function extractString(message:string){

    let userPrompt = ""
    switch(message){
        case "1":
            userPrompt = code_prompt[0].toLowerCase();
            break;
        case "2":
            userPrompt = code_prompt[1].toLowerCase();
            break;
        case "Y":
            userPrompt = code_prompt[2].toLowerCase();
            break;
        case "N":
            userPrompt = code_prompt[3].toLowerCase();
            break;
        default:
            userPrompt = message.toLowerCase();
            break;
    }
    return userPrompt;
}