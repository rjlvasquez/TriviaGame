var panel = $("#quiz-area");

// Question set
var questions = [{
    question: "If you space ship loses air pressure you should?",
    answers: ["Hold your breath", "Put on your helmet", "Start crying", "Just accept your death"],
    correctAnswer: "Put on your helmet"
}, {
    question: "Which space ship are you on?",
    answers: ["Jupiter 1", "Jupiter 2", "Jupiter 3", "Jupiter 4"],
    correctAnswer: "Jupiter 2"
}, {
    question: "In Episode 1 what did Will discover to save his sister?",
    answers: ["Crystals", "Diamond Sand", "A Robot", "A lighsaber"],
    correctAnswer: "A Robot"
}];

var timer;

var game = {

    correct: 0,
    incorrect: 0,
    counter: 120,

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            panel.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                panel.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }

        panel.append("<button id='done'>Done</button>");
    },

    done: function () {

        $.each($("input[name='question-0']:checked"), function () {
            if ($(this).val() === questions[0].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-1']:checked"), function () {
            if ($(this).val() === questions[1].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        $.each($("input[name='question-2']:checked"), function () {
            if ($(this).val() === questions[2].correctAnswer) {
                game.correct++;
            }
            else {
                game.incorrect++;
            }
        });

        this.result();

    },

    result: function () {

        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        panel.html("<h2>Done!</h2>");
        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }
};

//events

$(document).on("click", "#start", function () {
    game.start();
});


$(document).on("click", "#done", function () {
    game.done();
});
