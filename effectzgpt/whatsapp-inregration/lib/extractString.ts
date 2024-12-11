const code_prompt = [
    "Channelling Appointments",
    "Surgery prices and Admission",
    "CT, MRI Scan & Radiology Services",
    "Laboratory Services",
    "Ambulance Services",
    "Chat with our AI",
    "YES",
    "NO"]

export function extractString(message:string){

    let userPrompt = ""
    switch(message){
        case "1":
            userPrompt = code_prompt[0].toLowerCase();
            break;
        case "2":
            userPrompt = code_prompt[1].toLowerCase();
            break;
        case "3":
            userPrompt = code_prompt[2].toLowerCase();
            break;
        case "4":
            userPrompt = code_prompt[3].toLowerCase();
            break;
        case "5":
            userPrompt = code_prompt[4].toLowerCase();
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