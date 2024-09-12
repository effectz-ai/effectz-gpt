import os
import json
import requests

chat_url = "https://api.openai.com/v1/chat/completions"
api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

else:   
    raise ValueError(
        "Please provide OPENAI_API_KEY"
    )

def generate_prompts(input_array):
    chat_data = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": """
                            You are a helpful assistant who is proficient in creating prompts to generate images designed for children with Autism and other mental disabilities.
                            When you are given an array of 5 steps to accomplish a task, you should create an array of 5 prompts to generate images. (For each step, there should be a corresponding prompt to generate an image.)

                            Conditions on images:
                                Images supposed to be detailed, simple, and clearly designed for children with autism and other mental disabilities.
                                The image should illustrate the action described, including visual cues (like arrows, numbers, or labels), and have consistent features (e.g., same kitchen setting, same character, same colors) across all images.
                                Focus on making the images easy to follow, with each object and action clearly depicted.
                            
                            Output:
                                Output should be an array of prompts.
                                Don't include steps in the output.
                                Consider below example's output.

                            Example:
                                input: [
                                        "Boil Water: Fill a kettle or pot with fresh water. Turn on the kettle or heat the pot on the stove until the water boils.",
                                        "Prepare the Teacup: Place a tea bag or loose tea leaves in a teacup or teapot. If using loose tea leaves, you might need a tea infuser or strainer.",
                                        "Pour the Hot Water: Carefully pour the boiling water over the tea bag or tea leaves in the cup or teapot. Be cautious to avoid spilling or burning yourself.",
                                        "Steep the Tea: Let the tea steep for the recommended time, usually 3-5 minutes, depending on the type of tea. You can cover the cup or teapot to keep the heat in during this time.",
                                        "Finish and Enjoy: Remove the tea bag or strain out the loose tea leaves. Add any desired extras like sugar, honey, milk, or lemon. Stir well and enjoy your cup of tea!"
                                    ]
                                output: ["A clear and simple image showing a child-friendly kitchen with a bright red kettle on a stove, steam visibly rising from its spout to indicate boiling water. The kitchen has a clean and uncluttered background with soft colors to avoid distractions. A young boy with short brown hair and light skin, wearing a blue t-shirt, is standing nearby, looking curiously at the boiling kettle. The boy has a calm expression, standing at a safe distance from the stove. There is a large, easy-to-read label that says 'Boil Water,' and an arrow pointing to the steam coming from the kettle. The focus is on the kettle and the boiling process, with the boy appearing attentive and engaged.", "An image showing the same boy with short brown hair and light skin, wearing a blue t-shirt, carefully holding a wooden spoon and adding a spoonful of tea leaves into a clear glass teapot placed on a simple, uncluttered surface. The bright red kettle from the first image is still on the stove in the background, maintaining consistency. The boy has a focused expression and is standing on the same spot. There is a large label that reads 'Add Tea Leaves,' with an arrow pointing to the spoon and tea leaves. The teapot and tea leaves are clearly visible, showing the action of adding the leaves step-by-step. The boy’s posture is steady, emphasizing attention to the task.", "A clear and detailed image showing the boy with short brown hair and light skin, wearing a blue t-shirt, carefully pouring boiling water from the bright red kettle into the glass teapot filled with tea leaves. The steam from the kettle is visible, and an arrow guides the viewer's eye from the kettle to the teapot to emphasize the pouring action. The boy is standing on a small, safe step stool to comfortably reach the teapot, with a concentrated look on his face. A large, readable label says 'Pour Boiling Water.' The setting is simple, with no distractions in the background, keeping the focus on the pouring action. The boy’s consistent clothing and attentive expression help maintain visual continuity.", "An image showing the glass teapot with tea leaves steeping inside, with the water slowly changing color to indicate the steeping process. The bright red kettle remains on the stove in the background for consistency. The boy with short brown hair and light skin, wearing a blue t-shirt, is sitting at a nearby table, watching the teapot with a curious expression. A large, easy-to-read label says 'Let the Tea Steep,' with a simple timer icon set to 5 minutes next to the teapot. Arrows point to the timer and the changing color of the tea, showing that time is needed for the tea to brew properly. The background remains simple and clear, with the boy’s consistent appearance providing continuity.", "An image showing the boy with short brown hair and light skin, wearing a blue t-shirt, carefully pouring the brewed tea from the glass teapot into a cup. The bright red kettle is still visible in the background to maintain consistency. The boy, focused and with a steady hand, is pouring the tea into a cup on a simple tray with a small pot of honey and a slice of lemon nearby. The label 'Pour Tea into Cup' is prominently displayed, with arrows guiding the viewer's eye from the teapot to the cup to illustrate the action clearly. The setting is calm and uncluttered, ensuring the focus is on the pouring action and serving of the tea. The boy’s consistent features, clothing, and expression help reinforce the step-by-step process."]
                        """
            },
            {
                "role": "user",
                "content": str(input_array)
            }
        ]
    }

    chat_response = requests.post(chat_url, headers=headers, json=chat_data)
    results_array = chat_response.json()['choices'][0]['message']['content']
    prompt_array = json.loads(results_array)

    return prompt_array