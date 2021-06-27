// var name = prompt("Please Enter Your Name?");
// if (!name) {
//     name = prompt("Please Enter Your Name?")
// } else {
//     document.getElementById("showName").innerHTML = name + " VS COMPUTER!";
// }
var name = "MS";

var counter = 0;

function reset() {
    array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    document.getElementById("00").innerHTML = "";
    document.getElementById("01").innerHTML = "";
    document.getElementById("02").innerHTML = "";
    document.getElementById("10").innerHTML = "";
    document.getElementById("11").innerHTML = "";
    document.getElementById("12").innerHTML = "";
    document.getElementById("20").innerHTML = "";
    document.getElementById("21").innerHTML = "";
    document.getElementById("22").innerHTML = "";
    counter = 0;
    computerTurn();
}


function checkWhoWon() {
    counter++;
    var decrement = 2;
    var UserCheck1 = 0;
    var UserCheck2 = 0;
    var UserCheck3 = 0;
    var UserCheck4 = 0;
    var UserCheck5 = 0;
    var UserCheck6 = 0;
    var ComputerCheck1 = 0;
    var ComputerCheck2 = 0;
    var ComputerCheck3 = 0;
    var ComputerCheck4 = 0;
    var ComputerCheck5 = 0;
    var ComputerCheck6 = 0;
    for (var i = 0; i < 3; i++) {
        if (array[i][0] == 1) {
            UserCheck1++;
        }
        if (array[i][0] == 2) {
            ComputerCheck1++;
        }

        if (array[i][1] == 1) {
            UserCheck2++;
        }
        if (array[i][1] == 2) {
            ComputerCheck2++;
        }

        if (array[i][2] == 1) {
            UserCheck3++;
        }

        if (array[i][2] == 2) {
            ComputerCheck3++;
        }

        if (array[i][decrement] == 1) {
            UserCheck4++;
        }
        if (array[i][decrement] == 2) {
            ComputerCheck4++;
        }
        decrement--;
        for (var j = 0; j < 3; j++) {
            if (array[i][j] == 1) {
                UserCheck5++;
            }
            if (array[i][j] == 2) {
                ComputerCheck5++;
            }

            if (i == j) {
                if (array[i][j] == 1) {
                    UserCheck6++;
                }
                if (array[i][j] == 2) {
                    ComputerCheck6++;
                }
            }





        }
        if (UserCheck5 == 3) {
            document.getElementById("state").innerHTML = name + "WON! WOOHOO!";
            confetti.start(5000)
            setTimeout(() => {
                document.getElementById("state").innerHTML = "";
            }, 2000)

            // alert(name + " won");
            UserCheck5 = 0;
            reset()
            break;
        } else {
            UserCheck5 = 0;
        }

        if (ComputerCheck5 == 3) {
            document.getElementById("state").innerHTML = "Better Luck Next Time!";
            setTimeout(() => {
                document.getElementById("state").innerHTML = "";
            }, 2000)


            // alert("Computer won");
            ComputerCheck5 = 0;
            reset()
            break;
        } else {
            ComputerCheck5 = 0;
        }
    }
    var draw = true;
    if (UserCheck1 == 3 || UserCheck2 == 3 || UserCheck3 == 3 || UserCheck4 == 3 || UserCheck5 == 3 || UserCheck6 == 3) {
        // alert(name + " won!");
        document.getElementById("state").innerHTML = name + "WON! WOOHOO!";
        confetti.start(5000)
        setTimeout(() => {
            document.getElementById("state").innerHTML = "";
        }, 2000)

        reset()
        draw = false;

    }
    if (ComputerCheck1 == 3 || ComputerCheck2 == 3 || ComputerCheck3 == 3 || ComputerCheck4 == 3 || ComputerCheck5 == 3 || ComputerCheck6 == 3) {
        // alert("Computer won!");
        document.getElementById("state").innerHTML = "Better Luck Next Time!";
        setTimeout(() => {
            document.getElementById("state").innerHTML = "";
        }, 2000)


        reset()
        draw = false;

    }

    console.log(counter)

    if (counter == 9 & draw == true) {

        array = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        document.getElementById("00").innerHTML = "";
        document.getElementById("01").innerHTML = "";
        document.getElementById("02").innerHTML = "";
        document.getElementById("10").innerHTML = "";
        document.getElementById("11").innerHTML = "";
        document.getElementById("12").innerHTML = "";
        document.getElementById("20").innerHTML = "";
        document.getElementById("21").innerHTML = "";
        document.getElementById("22").innerHTML = "";
        counter = 0;
        document.getElementById("state").innerHTML = "Match Drawn!";
        setTimeout(() => {
            document.getElementById("state").innerHTML = "";
        }, 2000)
        computerTurn();
    }

}

function computerTurn() {
    var indexI = Math.floor(Math.random() * 3);
    var indexJ = Math.floor(Math.random() * 3);
    if (array[indexI][indexJ] == 0) {
        array[indexI][indexJ] = 2;
        document.getElementById(`${indexI}${indexJ}`).innerHTML = "X";
        checkWhoWon();
    } else {
        computerTurn();
    }
}

var playerTurn = 2;
//assigning 1 to player and 2 to computer;
var array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

if (playerTurn == 1) {

} else {
    computerTurn();

}

function UserClick(location, user) {
    var split = location.split("");
    if (array[parseInt(split[0])][parseInt(split[1])] == 0) {
        array[parseInt(split[0])][parseInt(split[1])] = 1;
        document.getElementById(location).innerHTML = user;
        computerTurn();
        checkWhoWon();
    }

}