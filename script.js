triangle(val1, type1, val2, type2);

Допустимі типи ("type"):
- "leg"            : катет
- "hypotenuse"     : гіпотенуза
- "adjacent angle" : прилеглий до катета кут (у градусах)
- "opposite angle" : протилежний до катета кут (у градусах)
- "angle"          : один з двох гострих кутів, коли задана гіпотенуза (у градусах)

Приклади виклику:
  triangle(7, "leg", 18, "hypotenuse");
  triangle(60, "opposite angle", 5, "leg");
====================================================================`);

function triangle(val1, type1, val2, type2) {
    // Переведення градусів у радіани та навпаки
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    // 1. Перевірка на некоректні значення (від'ємні або нульові аргументи)
    if (typeof val1 !== "number" || typeof val2 !== "number" || val1 <= 0 || val2 <= 0 || isNaN(val1) || isNaN(val2)) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    // 2. Перевірка на помилки у назвах типів
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Уведено некоректний тип аргументу або помилку в написанні. Перечитайте інструкцію.");
        return "failed";
    }

    if (type1 === type2) {
        console.log("Типи аргументів не можуть бути однаковими. Перечитайте інструкцію.");
        return "failed";
    }

    // Формуємо об'єкт із переданих типів для зручної перевірки в довільному порядку
    const inputs = {};
    inputs[type1] = val1;
    inputs[type2] = val2;

    let a, b, c, alpha, beta;

    // --- Варіант 1: Задано два катети (leg + leg) ---
    if (inputs["leg"] !== undefined && inputs["hypotenuse"] === undefined && inputs["adjacent angle"] === undefined && inputs["opposite angle"] === undefined && inputs["angle"] === undefined) {
        // У цьому випадку обидва аргументи мали тип "leg", але вище перевірка type1 === type2 відхилить це,
        // тому два катети обробляються, якщо передати їх як leg1 та leg2. 
        // Проте за специфікацією типи "leg" однакові, тому перевірка однакових типів стосується несумісних дублікатів.
    }

    // Перерозподіл типів для обробки
    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } 
    // --- Варіант 2: Катет і гіпотенуза ---
    else if (inputs["leg"] !== undefined && inputs["hypotenuse"] !== undefined) {
        let leg = inputs["leg"];
        let hyp = inputs["hypotenuse"];

        if (leg >= hyp) {
            console.log("Катет не може бути більшим або рівним гіпотенузі!");
            return "Катет не може бути більшим або рівним гіпотенузі";
        }

        a = leg;
        c = hyp;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } 
    // --- Варіант 3: Катет і прилеглий кут ---
    else if (inputs["leg"] !== undefined && inputs["adjacent angle"] !== undefined) {
        let leg = inputs["leg"];
        let adjAngle = inputs["adjacent angle"];

        if (adjAngle >= 90) {
            console.log("Кут повинен бути гострим (< 90°)");
            return "Кут повинен бути гострим (< 90°)";
        }

        b = leg;
        beta = adjAngle;
        alpha = 90 - beta;
        c = b / Math.cos(toRad(beta));
        a = Math.sqrt(c * c - b * b);
    } 
    // --- Варіант 4: Катет і протилежний кут ---
    else if (inputs["leg"] !== undefined && inputs["opposite angle"] !== undefined) {
        let leg = inputs["leg"];
        let oppAngle = inputs["opposite angle"];

        if (oppAngle >= 90) {
            console.log("Кут повинен бути гострим (< 90°)");
            return "Кут повинен бути гострим (< 90°)";
        }

        a = leg;
        alpha = oppAngle;
        beta = 90 - alpha;
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
    } 
    // --- Варіант 5: Гіпотенуза і гострий кут ---
    else if (inputs["hypotenuse"] !== undefined && inputs["angle"] !== undefined) {
        let hyp = inputs["hypotenuse"];
        let ang = inputs["angle"];

        if (ang >= 90) {
            console.log("Кут повинен бути гострим (< 90°)");
            return "Кут повинен бути гострим (< 90°)";
        }

        c = hyp;
        alpha = ang;
        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    } 
    // Несумісна пара типів (наприклад, hypotenuse + adjacent angle)
    else {
        console.log("Несумісна пара типів аргументів. Перечитайте інструкцію.");
        return "failed";
    }

    // Вивід результатів обчислення в консоль згідно з позначеннями
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}
