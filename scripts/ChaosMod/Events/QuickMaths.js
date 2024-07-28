import { world, system, } from "@minecraft/server";
import { GlobalVars } from "globalVars";
let currentQuestion;
let currentAnswer;
let numberwhich;
const questions = [
    "9 + 10 = ",
    "9 * 10 = ",
    "7 *7 = ",
    "13 * 5 = ",
    "10 * 7,7 = ",
];
const answers = ["19", "90", "49", "65", "77"];
const chooseRandomSuccessMessage = () => {
    switch (Math.floor(Math.random() * (5 - 1 + 1)) + 1) {
        case 1:
            return "Great job at doing §3Quick Maths!";
        case 2:
            return "Wow your cognitive ability is amazing!";
        case 3:
            return "Wow this is crazy how you calculated that!";
        case 4:
            return "With those calculating skills you should sign up at a championship!";
        case 5:
            return `I don't even know myself how to calculate ${currentQuestion}!`;
    }
};
const chooseRandomLoseMessage = () => {
    switch (Math.floor(Math.random() * (-1 + 1)) + 1) {
        case 1:
            return `doesn't know how to calculate ${currentQuestion}`;
        case 2:
            return "suffers from cognititve malfunction";
    }
};
const chooseRandomQuestion = () => {
    return Math.floor(Math.random() * questions.length);
};
const quickMathsEvent = (eventData) => {
    system.run(() => {
        const message = eventData.message;
        const player = eventData.sender;
        if (message == currentAnswer) {
            player.addTag("isSafe");
            player.sendMessage(chooseRandomSuccessMessage());
        }
    });
};
const quickMathsStart = () => {
    numberwhich = chooseRandomQuestion();
    currentQuestion = questions[numberwhich];
    currentAnswer = answers[numberwhich];
    world.sendMessage(`§aCalculate this or death :) : §r${currentQuestion}`);
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
