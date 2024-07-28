import { world, system, } from "@minecraft/server";
import { GlobalVars } from "globalVars";
let currentQuestion;
let currentAnswer;
let numberwhich;
const questions = ["9 + 10 = ", "9 * 10 = "];
const answers = ["19", "90"];
const successMessages = [
    "Great job at doing §3Quick Maths!",
    "Wow your cognitive ability is amazing!",
    "Wow this is crazy how you calculated that!",
    "With those calculating skills you should sign up at a championship!",
    `I don't even know myself how to calculate ${currentQuestion}!`,
];
const loseMessages = [
    `doesn't know how to calculate ${currentQuestion}`,
    "suffers from cognititve malfunction",
];
const chooseRandomQuestion = () => {
    return Math.floor(Math.random() * questions.length);
};
const chooseRandomSuccessMessage = () => {
    return successMessages[Math.floor(Math.random() * successMessages.length)];
};
const chooseRandomLoseMessage = () => {
    return loseMessages[Math.floor(Math.random() * loseMessages.length)];
};
const quickMathsEvent = (eventData) => {
    system.run(() => {
        const message = eventData.message;
        const player = eventData.sender;
        if (message == currentAnswer) {
            player.addTag("isSafe");
            player.sendMessage(chooseRandomSuccessMessage());
        }
        //world.sendMessage(`§a${player.nameTag}§r: ${message}`);
    });
};
const quickMathsStart = () => {
    numberwhich = chooseRandomQuestion();
    currentQuestion = questions[numberwhich];
    currentAnswer = answers[numberwhich];
    world.sendMessage(`§aSay this or death :) : §r${currentQuestion}`);
    world.beforeEvents.chatSend.subscribe(quickMathsEvent);
};
const quickMathsStop = () => {
    for (const player of GlobalVars.players) {
        if (!player.hasTag("isSafe")) {
            player.kill();
            world.sendMessage(`§4${player.nameTag}§r ${chooseRandomLoseMessage()}`);
        }
        if (player.hasTag("isSafe")) {
            player.removeTag("isSafe");
        }
    }
    world.beforeEvents.chatSend.unsubscribe(quickMathsEvent);
};
export const quickMaths = {
    chaosEventId: "quickMaths",
    chaosEventDisplayName: "§3Qick Maths",
    chaosEventUniqueId: "-1",
    chaosEventTime: 250,
    onChaosStart: quickMathsStart,
    onChaosStop: quickMathsStop,
    onChaosTick: () => { },
};
