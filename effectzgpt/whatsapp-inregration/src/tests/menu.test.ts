const {MenuService} = require('../services/menu');

const menuService = new MenuService();
const testPhoneId = 'test-user-123';

// Simulate user interaction
function simulateUserInput(input:string) {
  const response = menuService.handleInput(testPhoneId, input);
  console.log(`Input: ${input}`);
  console.log('Response:', response);
  console.log('----------------------------');
  return response;
}

// Test main menu
simulateUserInput('2'); // Go to channeling submenu
simulateUserInput('3'); // Select E-channeling option
simulateUserInput('0'); // Go back to previous menu
simulateUserInput('1'); // Go to main menu