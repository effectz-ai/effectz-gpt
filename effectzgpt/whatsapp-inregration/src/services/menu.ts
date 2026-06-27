import { templateHeaderParam, templateHeaderParams } from "../types/types";

interface Option {
    number: string;
    description: string;
    key: string;
    template?: {
      name: string;
      language?: string;
      headerParam?: templateHeaderParams;
    };
  }
  
  interface Menu {
    title: string;
    options: Option[];
  }
  
  export class MenuService {
    private mainMenu: Menu;
    private subMenus: { [key: string]: Menu };
    private userStates: Map<string, string[]>;
    private chatStates: Map<string, { inChat: boolean; conversationId?: string }>;

    constructor() {
      this.mainMenu = {
        title: 'Main Menu',
        options: [
          { number: '1', description: 'Channelling Appointments', key: 'channelling_main'},
          { number: '2', description: 'Surgery prices and Admission Details', key: 'surgery_admission'},
          { number: '3', description: 'CT, MRI Scan & Radiology Services', key: 'radiology_services'},
          { number: '4', description: 'Laboratory Services', key: 'laboratory_services'},
          { number: '5', description: 'Ambulance Services', key: 'ambulance_services'},
          { number: '6', description: 'Chat with our AI', key: 'chat_agent' }
        ]
      };
  
      this.subMenus = {
        channelling_main: {
          title: 'Channelling Appointments',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Book Appointment', key: 'book_appointment'},
            { number: '3', description: 'Check Appointment Status', key: 'check_appointment'},
            { number: '4', description: 'Cancel Appointment', key: 'cancel_appointment'}
          ]
        },
        surgery_admission: {
          title: 'Surgery & Admission Details',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Surgery Prices', key: 'surgery_prices'},
            { number: '3', description: 'Admission Process Info', key: 'admission_info'},
            { number: '4', description: 'Pre-surgery Requirements', key: 'presurgery_requirements'}
          ]
        },
        radiology_services: {
          title: 'CT, MRI Scan & Radiology Services',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'CT Scan Services', key: 'ct_scan'},
            { number: '3', description: 'MRI Scan Services', key: 'mri_scan'},
            { number: '4', description: 'Other Radiology Services', key: 'other_radiology'}
          ]
        },
        laboratory_services: {
          title: 'Laboratory Services',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Blood Tests', key: 'blood_tests'},
            { number: '3', description: 'Urine Tests', key: 'urine_tests'},
            { number: '4', description: 'Special Tests', key: 'special_tests'}
          ]
        },
        ambulance_services: {
          title: 'Ambulance Services',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Emergency Ambulance', key: 'emergency_ambulance'},
            { number: '3', description: 'Non-Emergency Transport', key: 'non_emergency_transport'},
            { number: '4', description: 'Ambulance Rates', key: 'ambulance_rates'}
          ]
        },
        chat_agent: {
          title: 'Chat Agent Options',
          options: [
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Talk to AI Assistant', key: 'transfer' }
          ]
        }
      };

      this.userStates = new Map<string, string[]>();
      this.chatStates = new Map<string, { inChat: boolean; conversationId?: string }>();
    }
  
    public getCurrentMenu(phoneId: string): Menu {
      const states = this.userStates.get(phoneId);
      if (!states || states.length === 0) {
        return this.mainMenu;
      }
      const currentKey = states[states.length - 1];
      return this.subMenus[currentKey] ?? this.mainMenu;
    }

    public isInChatMode(phoneId: string): boolean {
      const chatState = this.chatStates.get(phoneId);
      return chatState?.inChat || false;
    }

    public enterChatMode(phoneId: string, conversationId?: string): void {
      this.chatStates.set(phoneId, { inChat: true, conversationId });
    }

    public exitChatMode(phoneId: string): void {
      this.chatStates.set(phoneId, { inChat: false });
    }

    public getChatState(phoneId: string): { inChat: boolean; conversationId?: string } | undefined {
      return this.chatStates.get(phoneId);
    }
  

    public handleInput(phoneId: string, input: string): { 
      text: string; 
      menu?: Menu;
      template?: {
        name: string;
        language?: string;
        headerParam?: templateHeaderParams;
      };
      action?: 'start_chat' | 'exit_chat';
    } {
      const trimmedInput = input.trim();
  
      if (trimmedInput === '0') {
        const state = this.userStates.get(phoneId) || [];
        state.pop();
        this.userStates.set(phoneId, state);
        const menu = this.getCurrentMenu(phoneId);
        return {
          text: `Returning to ${menu.title}:\n${this.formatMenu(menu)}`,
          menu
        };
      } else if (trimmedInput === '1') {
        // Go to main menu regardless of current position
        this.userStates.set(phoneId, []);
        return {
          text: `Returning to Main Menu:\n${this.formatMenu(this.mainMenu)}`,
          menu: this.mainMenu
        };
      }
  
      // Retrieve the current menu and validate input
      const currentMenu = this.getCurrentMenu(phoneId);
      const selectedOption = currentMenu.options.find(opt => opt.number === trimmedInput);
  
      if (selectedOption) {
        // If submenu exists, push state and load submenu
        if (this.subMenus[selectedOption.key]) {
          const state = this.userStates.get(phoneId) || [];
          state.push(selectedOption.key);
          this.userStates.set(phoneId, state);
          const nextMenu = this.getCurrentMenu(phoneId);
          return {
            text: `You selected "${selectedOption.description}".\nNow choose an option from:\n${this.formatMenu(nextMenu)}`,
            menu: nextMenu
          };
        } else {
          // Final action (no submenu)
          if (selectedOption.key === 'transfer') {
            // Start chat with AI agent
            this.enterChatMode(phoneId);
            return {
              text: `🤖 You are now connected to our AI assistant!\n\n💬 Ask me anything about our services\n📝 I can help with information and support\n🚪 Type "exit" anytime to return to the main menu\n\nHow can I help you today?`,
              action: 'start_chat'
            };
          } else if (selectedOption.template){
            return {
              text: `You selected "${selectedOption.description}". Processing your request...`,
              template: selectedOption.template
            };
          } else {
            return {
              text: `You selected "${selectedOption.description}". Processing your request...`
            };
          }
        }
      } else {
        // Invalid input
        return {
          text: `Invalid input. Please try again:\n${this.formatMenu(currentMenu)}\nTip: Type 0 to go back to the previous menu.`,
          menu: currentMenu
        };
      }
    }
  
    public handleChatMessage(phoneId: string, message: string): { 
      text?: string; 
      menu?: Menu;
      action?: 'exit_chat' | 'continue_chat';
      aiMessage?: string;
    } {
      const lowerMessage = message.toLowerCase().trim();
      
      // Check if user wants to exit chat
      if (lowerMessage === 'exit' || lowerMessage === 'quit' || lowerMessage === 'stop' || lowerMessage === 'menu') {
        this.exitChatMode(phoneId);
        this.userStates.set(phoneId, []); // Reset to main menu
        return {
          text: `Chat ended. Returning to Main Menu:\n${this.formatMenu(this.mainMenu)}`,
          menu: this.mainMenu,
          action: 'exit_chat'
        };
      }
      
      // Return the message for AI processing
      return {
        aiMessage: message,
        action: 'continue_chat'
      };
    }

    public formatMenu(menu: Menu): string {
      let response = `${menu.title}:\n`;
      menu.options.forEach(opt => {
        response += `${opt.number}. ${opt.description}\n`;
      });
      if (menu !== this.mainMenu) {
        response += `0. Previous Menu\n`;
      }
      return response;
    }
  }
