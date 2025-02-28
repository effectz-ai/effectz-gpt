interface Option {
    number: string;
    description: string;
    key: string;
  }
  
  interface Menu {
    title: string;
    options: Option[];
  }
  
  export class MenuService {
    private mainMenu: Menu;
    private subMenus: { [key: string]: Menu };
    private userStates: Map<string, string[]>;
  
    constructor() {
      this.mainMenu = {
        title: 'Main Menu',
        options: [
          { number: '0', description: 'Go back to last menu', key: 'back' },
          { number: '1', description: 'Go back to main menu', key: 'main' },
          { number: '2', description: 'Channeling Service', key: 'channeling' },
          { number: '3', description: 'Chat with Agent', key: 'agent' }
        ]
      };
  
      this.subMenus = {
        channeling: {
          title: 'Channeling Service Options',
          options: [
            { number: '0', description: 'Go back to last menu', key: 'back' },
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Doc 990', key: 'schedule' },
            { number: '3', description: 'E chanelling', key: 'info' }
          ]
        },
        agent: {
          title: 'Chat Agent Options',
          options: [
            { number: '0', description: 'Go back to last menu', key: 'back' },
            { number: '1', description: 'Go back to main menu', key: 'main' },
            { number: '2', description: 'Talk to Agent', key: 'transfer' }
          ]
        }
      };

      this.userStates = new Map<string, string[]>();
    }
  
    public getCurrentMenu(phoneId: string): Menu {
      const states = this.userStates.get(phoneId);
      if (!states || states.length === 0) {
        return this.mainMenu;
      }
      const currentKey = states[states.length - 1];
      return this.subMenus[currentKey] ?? this.mainMenu;
    }
  

    public handleInput(phoneId: string, input: string): { text: string; menu?: Menu } {
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
          return {
            text: `You selected "${selectedOption.description}". Processing your request...`
          };
        }
      } else {
        // Invalid input
        return {
          text: `Invalid input. Please try again:\n${this.formatMenu(currentMenu)}\nTip: Type 0 to go back to the previous menu.`,
          menu: currentMenu
        };
      }
    }
  
    private formatMenu(menu: Menu): string {
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
  