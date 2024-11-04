const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const audioFiles = {
    greetingMorning: 'dzharvis-libelirda.mp3',
    greetingEvening: 'audio/good_evening.mp3',
    morningResponse: 'Доброе утро.wav',
    workResponse: 'Есть.wav',
    praiseResponse: 'К вашим услугам сэр.wav'
};

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = 'ru-RU';  // Устанавливаем язык на русский
    text_speak.rate = 0.9;
    text_speak.volume = 1;
    text_speak.pitch = 1.2;
    window.speechSynthesis.speak(text_speak);
}

function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        playAudio(audioFiles.greetingMorning);
    } else if (hour >= 12 && hour < 17) {
        playAudio(audioFiles.greetingMorning);
    } else {
        playAudio(audioFiles.greetingEvening);
    }
}

window.addEventListener('load', () => {
    speak("Запуск JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ru-RU';  // Устанавливаем язык распознавания на русский

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Слушаю...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('эй') || message.includes('привет') || message.includes('здравствуй')) {
        playAudio('Доброе утро.wav');
    } else if (message.includes('помоги')) {
        playAudio('Сэр, не будете дергаться больно не будет.wav');
    } else if (message.includes('хорошая работа')) {
        playAudio('К вашим услугам сэр.wav');
    } else if (message.includes('выкинь')) {
        playAudio('Сэр, похоже его костюм может летать.wav');
    } else if (message.includes("открой Google")) {
        window.open("https://google.com", "_blank");
        playAudio(audioFiles.greetingMorning);
    } else if (message.includes("открой чат")) {
        window.open("https://chatgpt.com", "_blank");
        playAudio('Загружаю сэр.wav');
    } else if (message.includes(" аниме")) {
        window.open("https://jut.su", "_blank");
        playAudio('О чем я думал, обычно у нас все веселенькое.wav')
    } else if (message.includes('клевер')) {
        window.open("https://r812104.yandexwebcache.org/black-clover/169.480.4b4e81d02628747f.mp4?hash1=8f95fc99f806f47b4c203d0d415eb519&hash2=99ac08fd6f8ecd2b8c74bc7666d55501", "_blank");
        playAudio('Как пожелаете.wav');
    } else if (message.includes('википедия')) {
        window.open(`https://ru.wikipedia.org/wiki/${message.replace("википедия", "").trim()}`, "_blank");
        playAudio('Загружаю сэр.wav');
    } else if (message.includes('время')) {
        const time = new Date().toLocaleTimeString('ru-RU', { hour: "2-digit", minute: "2-digit" });
        speak("Текущее время " + time);
    } else if (message.includes('дата')) {
        const date = new Date().toLocaleDateString('ru-RU', { month: "long", day: "numeric" });
        speak("Сегодняшняя дата " + date);
    } else if (message.includes('калькулятор')) {
        window.open('Calculator:///', "_self");
        speak("Открываю калькулятор");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("Вот что я нашел в интернете по запросу " + message);
    }
}
