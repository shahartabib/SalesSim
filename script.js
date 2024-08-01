const homepage = document.getElementById('homepage');
const simulation = document.getElementById('simulation');
const feedback = document.getElementById('feedback');
const setupForm = document.getElementById('setup-form');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const feedbackContent = document.getElementById('feedback-content');
const restartBtn = document.getElementById('restart-btn');

let simulationData = {};
let conversationHistory = [];
let simulationStage = 0;
const maxStages = 5;

setupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    simulationData = {
        companyName: document.getElementById('company-name').value,
        simulationTopic: document.getElementById('simulation-topic').value,
        difficulty: document.getElementById('difficulty').value,
        traineeName: document.getElementById('trainee-name').value
    };
    startSimulation();
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        simulateClientResponse(message);
        userInput.value = '';
    }
});

restartBtn.addEventListener('click', () => {
    feedback.classList.add('hidden');
    homepage.classList.remove('hidden');
    conversationHistory = [];
    simulationStage = 0;
});

function startSimulation() {
    homepage.classList.add('hidden');
    simulation.classList.remove('hidden');
    simulateClientResponse('start');
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    conversationHistory.push({ sender, message });
}

function simulateClientResponse(userMessage) {
    const clientResponses = [
        "Hello! I'm interested in learning more about your product. Can you tell me about its main features?",
        "That sounds interesting. How does your product compare to your competitors?",
        "I see. What about the pricing? Can you give me a ballpark figure?",
        "Hmm, I'm not sure if that fits our budget. Are there any discounts or special offers available?",
        "I need to think about it and discuss with my team. Can you send me some additional information?"
    ];

    setTimeout(() => {
        if (simulationStage < maxStages) {
            const clientMessage = clientResponses[simulationStage];
            addMessage('bot', clientMessage);
            simulationStage++;
        } else {
            endSimulation();
        }
    }, 1000 + Math.random() * 1000);
}

function endSimulation() {
    simulation.classList.add('hidden');
    feedback.classList.remove('hidden');
    provideFeedback();
}

function provideFeedback() {
    const feedbackPoints = [
        "You demonstrated good product knowledge.",
        "Try to ask more questions to understand the client's needs.",
        "Your responses were prompt and professional.",
        "Consider offering more specific solutions to the client's concerns.",
        "Overall, you handled objections well, but there's room for improvement in closing techniques."
    ];

    let feedbackHTML = `<h3>Feedback for ${simulationData.traineeName}</h3>`;
    feedbackHTML += '<ul>';
    feedbackPoints.forEach(point => {
        feedbackHTML += `<li>${point}</li>`;
    });
    feedbackHTML += '</ul>';

    feedbackContent.innerHTML = feedbackHTML;
}
