    //q & a array object
    var triviaQs = [{
	    question: "What is the name of the sea monster believed to inhabit Muskrat Lake, Ontario?",
	    answerOptions: ["Misty", "Missy", "Musky", "Mussie"],
	    answer: 3
    },{
        question: "In which province is the sea monster Ogopogo believed to reside?",
	    answerOptions: ["New Brunswick", "British Columbia", "Ontario", "Quebec"],
	    answer: 1
    },{
        question: "The Algonquin tribes of Canada know the Wendigo as an evil creature which possesses people and turns them into what?",
	    answerOptions: ["murderers", "thieves", "cannibals", "arsonists"],
	    answer: 2
    },{
        question: "What is the name of the ferocious half-human, half-wolf creature believed to exist by the Inuit?",
	    answerOptions: ["Adlet", "Aldet", "Adelar", "Ardlet"],
	    answer: 0
    },{
        question: "What is the name given to the blonde sasquatch-like creature witnessed by some around Cobalt, Ontario?",
	    answerOptions: ["The Golden Sasquatch", "Yellow Yeti", "The Sunshine Sasquatch", "Old Yellow Top"],
	    answer: 3
    },{
        question: "What is the name of the massive, eagle-like creature believed in by Indigenous tribes all over Canada?",
	    answerOptions: ["Stormbird", "Thunderbird", "Lightningbird", "Cloudbird"],
	    answer: 1
    },{
        question: "Which of the following is NOT a recorded Canadian sea monster cryptid?",
	    answerOptions: ["Igopogo", "Manipogo", "Onipogo", "Winnipogo"],
	    answer: 2
    },{
        question: "What is the common name given to the saytoechin, a giant, sloth-looking creature that appears in a number of Indigenous Canadian oral traditions?",
	    answerOptions: ["Hairy Bear Killer", "Yukon Beaver Eater", "Tatchun Deer Stalker", "Whitehorse Meat Harvester"],
	    answer: 1
    },{
        question: "What did Fred Coleman, the original owner of the giant, taxidermied Coleman Frog in Frederickton, New Brunswick, claim he used to feed the frog while it was alive?",
	    answerOptions: ["coffee and oats", "eggs and bacon", "whiskey and whey", "pickles and limes"],
	    answer: 2
    },{
        question: "What is another name commonly used to refer to the Lake Utopia Monster from New Brunswick?",
	    answerOptions: ["Big Red", "Old Ted", "Big Fred", "Old Ned"],
	    answer: 3
    }];

   
    var currentQ;
    var correctAns; 
    var wrongAns; 
    var numUnanswered; 
    var numAnswered;
    var seconds; 
    var time; 
    var userSelect; 
    var messages = {
        correct: "Correct Answer!",
        incorrect: "Wrong Answer!",
        timeUp: "Time's Up",
        finished: "Way to Go! Time to View Your Score."
    }
    //make start button disappear upon user click
    $('#startBtn').on('click', function(){
        $(this).hide();
        startNewGame();
        console.log("hidden")
    });
    //make reset button disappear upon user click
    $('#resetGame').on('click', function() {
        $(this).hide();
        startNewGame();
        console.log("hidden")
    });

    function startNewGame(){
        $('#finishedGame').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unansweredQs').empty();
        currentQ = 0;
        correctAns = 0;
        wrongAns = 0;
        numUnanswered = 0;
        //numAnswered = 0;
        nextQ();
    }

    function nextQ() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;
        $('#currentQ').html('Question # '+(currentQ+1)+'/'+triviaQs.length);
        $('.questionsdDiv').html('<h2>' + triviaQs[currentQ].question + '</h2>');
        for(var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(triviaQs[currentQ].answerOptions[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('.answerOptions').append(choices);
        }
        countdown();
        $('.thisChoice').on('click',function(){
            userSelect = $(this).data('index');
            clearInterval(time);
            ansDisplay();
        });
    }

    function countdown(){
        //some of the questions are a bit wordy so 15 seconds seems fair
        seconds = 15;
        $('#timerDiv').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        time = setInterval(showCountdown, 1000);
    }
    function showCountdown(){
        seconds--;
        $('#timerDiv').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            ansDisplay();
        }
    }

    function ansDisplay(){
        $("#currentQ").empty();
        $(".thisChoice").empty();
        $(".questionsdDiv").empty();
    
        var rightAns = triviaQs[currentQ].answerOptions[triviaQs[currentQ].answer];
        var rightAnsIndex = triviaQs[currentQ].answer;
    
        if ((userSelect === rightAnsIndex) && (answered == true)){
            correctAns++;
            $('#message').html(messages.correct);
            $("#timerDiv").empty();
            
        } else if((userSelect !== rightAns) && (answered == true)){
            wrongAns++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAns);
            $("#timerDiv").empty();
        } else {
            numUnanswered++;
            $('#message').html(messages.timeUp);
            $('#correctedAnswer').html('The correct answer was: ' + rightAns);
            answered = true;
            $("#timerDiv").empty();
        }
        if(currentQ == (triviaQs.length-1)){
            setTimeout(scoreboard, 3000)
        } else{
            currentQ++;
            setTimeout(nextQ, 3000);
        }	
    }

    function scoreboard(){
        $("#timerDiv").empty();
        $("#message").empty();
        $("#correctedAnswer").empty();
    
    
        $('#finishedGame').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAns);
        $('#incorrectAnswers').html("Incorrect Answers: " + wrongAns);
        $('#unansweredQs').html("Unanswered: " + numUnanswered);
        $('#resetGame').addClass('reset');
        $('#resetGame').show();
        $('#resetGame').html("<button id='resetBtn' type='button' class='btn btn-success'>" + 'Start Over' + "</button>");
    }
    