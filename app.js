/**
 ** [Start Quiz App]
*? Select Html DOM Element
*/

//* Global Counter Variables
let score = 0;
let currentIndex = 0;

let questionsData = [
    {
        id: 1,
        title: "ماهوا اكبر نهر في العالم؟",
        answer_1: "نهر دجلة",
        answer_2: "نهر الفرات",
        answer_3: "نهر النيل",
        answer_4: "نهر الأمازون",
        right_answer: "نهر النيل"
    },
    {
        id: 2,
        title: "ماهي عاصمة مصر",
        answer_1: "بغداد",
        answer_2: "القاهرة",
        answer_3: "الرياض",
        answer_4: "دمشق",
        right_answer: "القاهرة"
    },
    {
        id: 3,
        title: "اكبر دولة عربية من حيث المساحة؟",
        answer_1: "مصر",
        answer_2: "السودان",
        answer_3: "الجزائر",
        answer_4: "السعودية",
        right_answer: "الجزائر"
    },
    {
        id: 4,
        title: "اكثر دولة افريقيا تتويجا بكأس الأمم الأفريقة؟",
        answer_1: "الكاميرون",
        answer_2: "الجزائر",
        answer_3: "مصر",
        answer_4: "غانا ",
        right_answer: "مصر"
    },
    {
        id: 5,
        title: "ماهي اكبر دولة عربية في التعداد السكاني؟",
        answer_1: "سوريا",
        answer_2: "السعودية",
        answer_3: "ليبيا",
        answer_4: "مصر",
        right_answer: "مصر"
    },
    {
        id: 6,
        title: "في اي سنة انتصرت مصر على اسرائيل في حرب أكتوبر",
        answer_1: "1948",
        answer_2: "1973",
        answer_3: "1980",
        answer_4: "2000",
        right_answer: "1973"
    },
    {
        id: 7,
        title: "ماهوااكبر محيط في العالم؟",
        answer_1: "المحيط الهندي",
        answer_2: "المحيط الهادي",
        answer_3: "المحيط الأطلسي",
        answer_4: "المحيط المتجمد",
        right_answer: "المحيط الهادي"
    },
    {
        id: 8,
        title: "ما هي اكثر دول العالم التي بها بحيرات مائية؟",
        answer_1: "أمريكا",
        answer_2: "السويد",
        answer_3: "فنلندا",
        answer_4: "أستراليا",
        right_answer: "فنلندا"
    }
];

let questionCount = questionsData.length;
const question = questionsData[currentIndex];
// Get answersCount
let answersCount = Object.keys(question).filter(key => key.startsWith("answer")).length;

// const quizScore = document.getElementById("score");
const quesCount = document.getElementById("count");
const questionBox = document.getElementsByClassName("question-box")[0];
const answerSection = document.getElementsByClassName("answer-section")[0];
const playBtn = document.getElementById("play");
const exitBtn = document.getElementById("exit");
const endGame_modal = document.getElementById("endGame_modal");
const gameScore = document.getElementById("score");
const count = document.querySelector(".score-board #ques-count");
const closeModalBtns = document.querySelectorAll(".modal-box .close-modal");

//TODO userDataForm Function
const userForm = document.getElementById("user_form");
const firstName = userForm.querySelector("#first_name");
const lastName = userForm.querySelector("#last_name");
const fullName = document.getElementById("user_name");
const userAgeSapn = document.getElementById("user_age");

function userDataForm() {
    //* Select User Form Elements
    const userAge = userForm.querySelector("#user_age");

    //* error Function
    const error = (input, message) => {
        const userIData = input.parentElement;
        const msgItem = userIData.querySelector(".error-msg");

        // Add error Class To input
        input.classList.add("error");

        // Remove success Class From input
        input.classList.remove("success");

        msgItem.classList.add("show-msg");
        msgItem.innerText = message;
    };
    //* valid Function
    const valid = (input) => {
        const userIData = input.parentElement;
        const msgItem = userIData.querySelector(".error-msg");

        // Add success Class To input
        input.classList.add("success");

        // Remove error Class From input
        input.classList.remove("error");

        msgItem.classList.remove("show-msg");
        msgItem.innerText = "";
    };

    userForm.addEventListener("submit", userFormValidation);

    // userFormValidation Function
    function userFormValidation(e) {
        e.preventDefault();

        let firstNameValue = firstName.value.trim();
        let lastNameValue = lastName.value.trim();
        let userAgeValue = userAge.value.trim();

        if (firstNameValue !== "") {
            valid(firstName);

        } else {
            error(firstName, "من فضلك ادخل الأسم الأول");
        };

        if (lastNameValue !== "") {
            valid(lastName);

        } else {
            error(lastName, "من فضلك ادخل الأسم الثاني");
        };

        if (firstNameValue && lastNameValue !== "") {
            document.getElementById("user-overlay").classList.add("hidden");
            let result = firstNameValue.concat(" " + lastNameValue);
            fullName.innerText = result;
        };

        if (userAgeValue !== "") {
            userAgeSapn.innerText = userAgeValue;

        } else {
            userAgeSapn.innerText = "غير معروف";
        };
    };
};

// window addEventListener (Load)
window.addEventListener("load", userDataForm);

playBtn.addEventListener("click", playSetup);
exitBtn.addEventListener("click", exitGame);

// playSetup Function (1)
function playSetup() {
    quesCount.innerText = questionsData.length;
    // Show Quiz Element
    this.parentElement.classList.add("toggle");
    questionBox.classList.add("show");
    answerSection.classList.add("active");
};

// startGame Function (2)
function startGame() {
    //*? Invoke addQuestions
    addQuestions(question, questionCount, answersCount);

    // //*? Invoke checkAnswers
    // checkAnswers(question.right_answer, questionCount)
};

startGame();

// addQuestions Function
function addQuestions(question, quesCount, ansCount) {
    // if currentIndex Less Than quesCount
    if (currentIndex < quesCount) {
        //* Destruction question Obj Data
        const {title} = question;

        // Create Question Title Item
        const quesTitle = document.createElement("h3");
        quesTitle.className = "title";
        //* Create Question Text 
        let quesText = document.createTextNode(title);
        //TODO Append quesText To quesTitle Item
        quesTitle.appendChild(quesText);

        // Append quesTitle To questionBox
        questionBox.appendChild(quesTitle);

        //*? Create Ansewers Boxex Divs
        for (let i = 1; i <= ansCount; i++) {
            const answerDiv = document.createElement("div");
            answerDiv.className = "answer-box";
            //* Set Data Answer To answerDiv
            answerDiv.dataset.answer = question[`answer_${i}`];

            let ansewerData = `
                <button class="answer-btn">${i}</button>
                <h4 class="answer-text">${question[`answer_${i}`]}<h4/>
            `

            answerDiv.innerHTML = ansewerData;

            //! Append answerDiv to answerSection
            answerSection.appendChild(answerDiv);
        };

        checkAnswers(question.right_answer, quesCount);
    };
};

// checkAnswers Function
function checkAnswers(rAnswer, quesCount) {

    // Get Answer Boexs
    let answerBoxes = document.getElementsByClassName("answer-box");
    answerBoxes = Array.from(answerBoxes);

    //* Looping On answerBoxes
    answerBoxes.forEach(box => {
        box.addEventListener("click", answerBoxActions);
    });

    //* answerBoxActions Function
    function answerBoxActions(e) {
        //*? The Choosen Answer
        let choosenAnswer;

        let targetBox = e.target;
        let answerData = targetBox.dataset.answer;

        //* Get question Title HtLm DOM Element
        let quesTitle = questionBox.children[0];


        if (targetBox) {
            //* initialization choosenAnswer Value To answerData
            choosenAnswer = answerData;
        };

        // console.log(rAnswer + "=>" + choosenAnswer);

            //*? The Comparison
        if  (rAnswer.trim() === choosenAnswer.trim()) {
            // Add Correct Class To answerBox
            targetBox.classList.add("correct");
            //* Add Correct Class To quesTitle
            quesTitle.classList.add("correct");
            quesTitle.innerText = "اجابة صحيحة";
            //! Increase Score Counter By One
            score++;

        } else {
            // Add inCorrect Class To answerBox
            targetBox.classList.add("incorrect");
            //! Add incorrect Class To quesTitle
            quesTitle.classList.add("incorrect");
            quesTitle.innerText = "اجابة خاطئة!";
        };

        currentIndex++;

        setTimeout(_ => {
            questionBox.innerHTML = "";
            answerSection.innerHTML = "";

            //*? Invoke addQuestions
            addQuestions(questionsData[currentIndex], questionsData.length, answersCount);
        } , 1000);

        endGame(score, quesCount);
    };
};

// exitGame Function
function exitGame() {
    //* Reset All Html DOM Game Element
    quesCount.innerHTML = "&hyphen;";
    questionBox.innerHTML = "";
    questionBox.classList.remove("show");

    while (answerSection.children.length > 0) {
        answerSection.removeChild(answerSection.children[0]);
    };
    answerSection.classList.remove("active");
    exitBtn.parentElement.classList.remove("toggle");

    // Reset Counter Variables
    score = 0;
    currentIndex = 0;

    // *? Invoke addQuestions
    addQuestions(question, questionCount, answersCount);
};

// endGame Function
function endGame(score, quesCount) {
    const endGameMsg = document.querySelector(".box-content .endGame-msg");

    if (currentIndex >= quesCount) {

        // Add Active Class To endGame_modal
        endGame_modal.classList.add("active");

        gameScore.innerText = score;
        count.innerText = quesCount;

        // Invoke scoreGameMesaage
        scoreGameMesaage(score, endGameMsg);

        //? Invoke exitGame Function
        exitGame();
    };
};

// scoreGameMesaage Function
function scoreGameMesaage(score, endGameMsg) {
    if (score <= 2) {
        endGameMsg.innerHTML = `
        <strong class="msg">حاول في المرة القادمه !</strong>
        <i class="fas fa-sad-tear"></i>
        `

    } else if (score >= 3 && score <= 4) {
        endGameMsg.innerHTML = `
        <strong class="msg">عمل جيد !</strong>
        <i class="fas fa-thumbs-up"></i>
        `

    } else if (score >= 5 && score <= 6) {
        endGameMsg.innerHTML = `
        <strong class="msg">رائع !</strong>
        <i class="fas fa-surprise"></i>
        `

    } else {
        endGameMsg.innerHTML = `
        <strong class="msg">نهانينا !</strong>
        <i class="fas fa-heart"></i>
        `
    }
};

// Close End Game Modal
closeModalBtns.forEach(btn => {
    btn.addEventListener("click", _ => {
        // remove Active Class From endGame_modal
        endGame_modal.classList.remove("active");

        //? Calling resetUserFormData
        resetUserFormData();
    });
});

// resetUserFormData Function
function resetUserFormData() {
    userForm.reset();

    //TODO Remove Success Class From firstName & lastName
    firstName.classList.remove("success");
    lastName.classList.remove("success");

    //* Remove Hidden Class From user-overlay
    document.getElementById("user-overlay").classList.remove("hidden");

    fullName.innerText = "";
    userAgeSapn.innerText = "";
};
