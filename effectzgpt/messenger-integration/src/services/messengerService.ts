import axios from "axios";
import 'dotenv/config'

export const sendMessage = async (recipientId: string, text: string): Promise<void> => {
    const messageData = {
      recipient: { id: recipientId },
      message: { text },
    };
  
    try {
      await axios.post(
        `https://graph.facebook.com/v17.0/me/messages?access_token=${process.env.MESSENGER_ACCESS_TOKEN}`,
        messageData
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };