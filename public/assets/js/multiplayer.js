const firebaseConfig = {
    apiKey: "AIzaSyDdCKXsVpizumDY-BmBzAUGkMUiEK_xK2M",
    authDomain: "tictactoe-e2b97.firebaseapp.com",
    projectId: "tictactoe-e2b97",
    storageBucket: "tictactoe-e2b97.appspot.com",
    messagingSenderId: "948642224045",
    appId: "1:948642224045:web:bde77587c6e5cebaca3324",
    measurementId: "G-KWBWE2NBJX"
};
var firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

var name = "";
var generatedCode = "";
var Letters = "abcdefghijklmnopqrstuvwxyz".split("");

var isPlayer1 = false;
var isPlayer2 = false;


function createNewBoard() {
    name = document.getElementById("codeOrName").value;
    if (name) {
        document.querySelector(".new-user").style.display = "none";
        document.getElementById("ShowGame").style.display = "block";
        generatedCode = name + Math.floor(Math.random() * 10000) + Letters[Math.floor(Math.random() * 25)];
        isPlayer1 = true;
        isPlayer2 = false;
        db.collection("users").doc(generatedCode).set({
            player1: 1,
            player2: false,
            array: [
                { 00: 0, 01: 0, 02: 0 },
                { 10: 0, 11: 0, 12: 0 },
                { 20: 0, 21: 0, 22: 0 }
            ],
            counter: 0,
        })
    } else {
        alert("Please enter the name.");
    }
}

function joinBoard() {
    generatedCode = document.getElementById("codeOrName").value;
    try {
        db.collection("users").doc(generatedCode).get().then((res) => {
            if (res.data()) {
                document.querySelector(".new-user").style.display = "none";
                document.getElementById("ShowGame").style.display = "block";
                isPlayer1 = false;
                isPlayer2 = true;
                db.collection("users").doc(generatedCode).update({
                    player2: 2
                })
            } else {
                alert("Sorry Invalid Code.");
            }

        }).catch(() => {
            alert("Sorry Invalid Code.");
        })
    } catch (err) {
        alert("Sorry Invalid Code.");
    }

}

var userStatus = false;
var combinations = [00, 01, 02, 10, 11, 12, 20, 21, 22];

async function UserClick(location) {
    if (userStatus == false) {
        db.collection("users").doc(generatedCode).onSnapshot((res) => {
            if (res.data().player2 == false) {
                document.getElementById("showName").innerHTML = "Please wait for user to connect.";
            } else {
                document.getElementById("showName").innerHTML = "Player 2 connected!";
                userStatus = true;
                setTimeout(() => {
                    document.getElementById("showName").innerHTML = ""
                }, 1000)
            }
        })
    }
    if (userStatus) {
        if (isPlayer1) {
            var splitLocation = location.split("");
            db.collection("users").doc(generatedCode).onSnapshot((res) => {
                var array = res.data().array;
                var counter = res.data().counter;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < combinations.length; j++) {
                        if (array[i][combinations[j]] == 1) {
                            if (combinations[j].toString().length == 1) {

                                document.getElementById("0" + combinations[j]).innerHTML = "X";
                            } else {
                                document.getElementById(combinations[j]).innerHTML = "X";
                            }
                        }
                        if (array[i][combinations[j]] == 2) {
                            if (combinations[j].toString().length == 1) {

                                document.getElementById("0" + combinations[j]).innerHTML = "O";
                            } else {
                                document.getElementById(combinations[j]).innerHTML = "O";
                            }
                        }
                    }
                }

                if (counter % 2 == 0) {
                    document.getElementById(location).innerHTML = "X";
                    array[splitLocation[0]][parseInt(location)] = 1;
                    counter++;
                    db.collection("users").doc(generatedCode).update({
                        array: array,
                        counter: counter,
                    })
                }
            })
        }


        if (isPlayer2) {
            var splitLocation = location.split("");
            db.collection("users").doc(generatedCode).onSnapshot((res) => {
                var array = res.data().array;
                var counter = res.data().counter;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < combinations.length; j++) {
                        if (array[i][combinations[j]] == 1) {
                            if (combinations[j].toString().length == 1) {

                                document.getElementById("0" + combinations[j]).innerHTML = "X";
                            } else {
                                document.getElementById(combinations[j]).innerHTML = "X";
                            }
                        }
                        if (array[i][combinations[j]] == 2) {
                            if (combinations[j].toString().length == 1) {

                                document.getElementById("0" + combinations[j]).innerHTML = "O";
                            } else {
                                document.getElementById(combinations[j]).innerHTML = "O";
                            }
                        }
                    }
                }
                if (counter % 2 != 0) {
                    document.getElementById(location).innerHTML = "O";
                    array[splitLocation[0]][parseInt(location)] = 2;
                    counter++;
                    db.collection("users").doc(generatedCode).update({
                        array: array,
                        counter: counter,
                    })
                }

            })
        }
    }

}