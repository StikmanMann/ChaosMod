import { world, system, } from "@minecraft/server";
import { GlobalVars } from "globalVars";
let currentQuestion;
let currentAnswer;
let numberwhich;
const questions = [
    "9 + 10 = ", //1
    "9 * 10 = ", //2
    "7 *7 = ", //3
    "13 * 5 = ", //4
    "10 * 7,7 = ", //5
    `"2 + 2 = 4" §34 - 1 =`, //6
    "9 + 40 * 2 = ", //7
    "3 * 4 + 2 = ", //8
    "3 * 4 - 2 = ", //9
    "3 * 4 * 2 = ", //10
    "3 * 4 / 2 = ", //11
    "9 + 9 * 9 = ", //12
    "9 - 9 * 9 = ", //13
    "7 + 5 - 3 + 18 = ", //14
    "12 + 8 + 26 - 49 = ", //15
    "12 + 11 + 26 - 49 = ", //16
    "(12 + 11 + 26) * 2 = ", //17
    "12 + 11 + 26 / 2 = ", //18
    "12 + 11 + 152 = ", //19
    "2 * 2 * 2 * 2 * 2 * 2 = ", //20
];
const answers = [
    "19", //1
    "90", //2
    "49", //3
    "65", //4
    "77", //5
    "3", //6
    "89", //7
    "14", //8
    "10", //9
    "24", //10
    "6", //11
    "90", //12
    "-72", //13
    "28", //14
    "-3", //15
    "0", //16
    "98", //17
    "36", //18
    "185", //19
    "64", //20
];
const chooseRandomSuccessMessage = () => {
    switch (Math.floor(Math.random() * (5 - 1 + 1)) + 1) {
        case 1:
            return "Great job at doing §3Quick Maths§r!";
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
    switch (Math.floor(Math.random() * (2 - 1 + 1)) + 1) {
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
            eventData.cancel = true;
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
