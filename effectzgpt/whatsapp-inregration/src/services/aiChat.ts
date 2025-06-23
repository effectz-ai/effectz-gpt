import axios from 'axios';

interface AIChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

interface AIChatResponse {
  response: string;
  conversationId?: string;
  error?: string;
}

export class AIChatService {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:5001/api/agent/request?agent_id=001') {
    this.apiUrl = apiUrl;
  }

  async sendMessage(request: AIChatRequest): Promise<AIChatResponse> {
    try {
      console.log(`🤖 Sending message to AI: ${request.message}`);
      
      const response = await axios.post(this.apiUrl, {
        messages: [{content:request.message, role: 'user'}]
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      console.log('✅ AI response received:', response.data);
      
      return {
        response: response.data.result.content || 'Sorry, I could not generate a response.',
        conversationId: response.data.conversation_id || request.conversationId
      };
    } catch (error) {
      console.error('❌ Error communicating with AI agent:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          return {
            response: 'Sorry, the AI agent is taking too long to respond. Please try again.',
            error: 'timeout'
          };
        } else if (error.response?.status === 404) {
          return {
            response: 'Sorry, the AI agent service is not available. Please try again later.',
            error: 'service_unavailable'
          };
        } else if (error.response && error.response.status >= 500) {
          return {
            response: 'Sorry, there was an error with the AI service. Please try again later.',
            error: 'server_error'
          };
        }
      }
      
      return {
        response: 'Sorry, I encountered an error while processing your request. Please try again.',
        error: 'unknown_error'
      };
    }
  }
}
