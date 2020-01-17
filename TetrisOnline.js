var score = 0;
var threshold = 1000;
var flagGrounded = 1;
var shapeIndex = 0;
var nextShapeIndex = Math.floor(Math.random() * (8 - 1) + 1);
var boxcoords = [];
var color = "";
var currentColor = "";
var state = "";
var boxesFilled = 0;
var rowsCleared = 0;
var clearBoxes = 0;
audio = document.getElementById("music1");
document.getElementById("score").innerText = "Score: " + score;
document.onkeypress = KeyIsPressed;
//making the grid on the gameSpace
for (var i = 0; i <= 21; i++) {
    document.getElementById("gameSpace").innerHTML += '<div id="' + i.toString() + ',0"></div>';
    document.getElementById(i.toString() + ',0').style.background = "black";
    document.getElementById(i.toString() + ',0').style.width = "30px";
    document.getElementById(i.toString() + ',0').style.height = "30px";
    document.getElementById(i.toString() + ',0').style.cssFloat = "left";
    document.getElementById(i.toString() + ',0').style.boxSizing = "border-box";
    //document.getElementById(i.toString() + ',0').style.visibility = "hidden";
    for (var j = 1; j <= 10; j++) {
        document.getElementById("gameSpace").innerHTML += '<div id="' + i.toString() + ',' + j.toString() + '"></div>';
        document.getElementById(i.toString() + ',' + j.toString()).style.background = "white";
        document.getElementById(i.toString() + ',' + j.toString()).style.border = "0px solid black";
        document.getElementById(i.toString() + ',' + j.toString()).style.width = "30px";
        document.getElementById(i.toString() + ',' + j.toString()).style.height = "30px";
        document.getElementById(i.toString() + ',' + j.toString()).style.cssFloat = "left";
        document.getElementById(i.toString() + ',' + j.toString()).style.boxSizing = "border-box";
    }
    document.getElementById("gameSpace").innerHTML += '<div id="' + i.toString() + ',11"></div>';
    document.getElementById(i.toString() + ',11').style.background = "black";
    document.getElementById(i.toString() + ',11').style.width = "30px";
    document.getElementById(i.toString() + ',11').style.height = "30px";
    document.getElementById(i.toString() + ',11').style.cssFloat = "left";
    document.getElementById(i.toString() + ',11').style.boxSizing = "border-box";
    //document.getElementById(i.toString() + ',11').style.visibility = "hidden";
}
for (var j = 0; j <= 11; j++) {
    document.getElementById('21,' + j.toString()).style.background = "black";
    document.getElementById('0,' + j.toString()).style.display = 'none';
    //document.getElementById('21,' + j.toString()).style.visibility = "hidden";
}
//making the grid for the next element
for (var i = 1; i <= 2; i++) {
    document.getElementById("ScoreBox").innerHTML += '<br />';
    for (var j = 1; j <= 4; j++) {
        document.getElementById("ScoreBox").innerHTML += '<div id="score' + i.toString() + j.toString() + '"></div>';
        document.getElementById("score" + i.toString() + j.toString()).style.background = "white";
        document.getElementById("score" + i.toString() + j.toString()).style.width = "30px";
        document.getElementById("score" + i.toString() + j.toString()).style.height = "30px";
        document.getElementById("score" + i.toString() + j.toString()).style.margin = "-4px -1px";
        document.getElementById("score" + i.toString() + j.toString()).style.display = "inline-block";
        document.getElementById("score" + i.toString() + j.toString()).style.boxSizing = "border-box";
        document.getElementById("score" + i.toString() + j.toString()).style.border = "1px solid black";
    }    
}
audio.play();
var timer = 1000;   // in milliseconds
GameSpeed = setInterval(Game, timer);
function Game() {
    setScoreTimer();
    if (flagGrounded == 1) {
        checkRows();
        shapeIndex = nextShapeIndex;
        switch (shapeIndex) {
            case 1: boxcoords = [[1, 4], [1, 5], [1, 6], [1, 7]]; break;    //I
            case 2: boxcoords = [[1, 4], [1, 5], [1, 6], [2, 6]]; break;    //J
            case 3: boxcoords = [[2, 4], [1, 4], [1, 5], [1, 6]]; break;    //L
            case 4: boxcoords = [[1, 5], [2, 5], [2, 6], [1, 6]]; break;    //O
            case 5: boxcoords = [[2, 4], [2, 5], [1, 5], [1, 6]]; break;    //S
            case 6: boxcoords = [[1, 4], [1, 5], [2, 5], [1, 6]]; break;    //T
            case 7: boxcoords = [[1, 4], [1, 5], [2, 5], [2, 6]]; break;    //Z
        }
        spawnShape(shapeIndex);
        flagGrounded = 0;
        nextShapeIndex = getShapeIndex();
        drawNextShape(nextShapeIndex);
    }
    else if (flagGrounded == 0) {
        if (!checkColision())
        {
            fallShape(boxcoords);
        }
        else
        {
            flagGrounded = 1;
            return;
        }
    }
}
function checkRows() {
    //checks for filled rows with boxes
    for (var i = 1; i <= 20; i++) {
        for (var j = 1; j <= 10; j++) {
            if(document.getElementById(i.toString() + ',' + j.toString()).style.backgroundColor != "white")
            {
                boxesFilled++;
            }
            else {
                boxesFilled = 0;
                break;
            }
        }
        if (boxesFilled == 10) {
            boxesFilled = 0;
            rowsCleared++;
            for (var j = 1; j <= 10; j++) {
                document.getElementById(i.toString() + ',' + j.toString()).style.background = "white";
            }
            pushRowsDown(i);
        }
    }
    //allocates points
    switch (rowsCleared) {
        case 2:
            score += rowsCleared * 10 + 10;
            rowsCleared = 0;
            break;
        case 3:
            score += rowsCleared * 10 + 100;
            rowsCleared = 0;
            break;
        case 4:
            score += rowsCleared * 10 + 1000;
            rowsCleared = 0;
            break;
        default:
            score += rowsCleared * 10;
            rowsCleared = 0;
            break;
    }
    setScoreTimer();
}
function pushRowsDown(index) {
    for (var i = index - 1; i > 0; i--) {
        for (var j = 1; j <= 10; j++) {
            document.getElementById((i + 1).toString() + ',' + j.toString()).style.background = document.getElementById((i).toString() + ',' + j.toString()).style.background;
        }
    }
}
function KeyIsPressed(e) {
    if (!e) e = window.event;
    if (flagGrounded != 1) {
        var handled = false;
        clearShape(boxcoords);
        if (e.charCode == 97) {
            if (!checkLeftColision()) {
                boxcoords[0][1]--;
                boxcoords[1][1]--;
                boxcoords[2][1]--;
                boxcoords[3][1]--;
            }
            handled = true;
        }
        else if (e.charCode == 119) {
            rotate(shapeIndex);
            if (checkRotateColision()) {
                console.log("Vry6tam!");
                rotateBackwards();
            }
            handled = true;
        }
        else if (e.charCode == 100) {
            if (!checkRightColision()) {
                boxcoords[0][1]++;
                boxcoords[1][1]++;
                boxcoords[2][1]++;
                boxcoords[3][1]++;
            }
            handled = true;
        }
        else if (e.charCode == 115) {
            handled = true;
            if (!checkColision()) {
                fallShape(boxcoords);
            }
        }
        if (handled){
            e.preventDefault(); // prevents arrow keys from scrolling the page
        }
        redraw(boxcoords);
    }
}
function rotate(SHAPEINDEX) {
    if (state == "0d") {
        switch (SHAPEINDEX) {
            case 1: //I
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0]+=2;
                boxcoords[3][1]-=2;
                break;
            case 2: //J
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][1] -= 2;
                break;
            case 3: //L
                boxcoords[0][0] -= 2;

                boxcoords[1][0]--;
                boxcoords[1][1]++;

                boxcoords[3][0]++;
                boxcoords[3][1]--;
                break;
            case 5: //S
                boxcoords[0][0] -= 2;
                boxcoords[0][1]++;

                boxcoords[1][0]--;

                boxcoords[2][1]++;

                boxcoords[3][0]++;
                break;
            case 6:  //T
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]--;
                break;
            case 7:  //Z
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][1] -=2 ;
                break;
        }
        state = "90d";
    }
    else if (state == "90d") {
        switch (SHAPEINDEX) {
            case 1: //I
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0] -= 2;
                boxcoords[3][1] += 2;
                break;
            case 2: //J
                boxcoords[0][0]++;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][0] -= 2;
                break;
            case 3: //L
                boxcoords[0][1] += 2;

                boxcoords[1][0]++;
                boxcoords[1][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]--;
                    break;
            case 5: //S
                boxcoords[0][0] += 2;
                boxcoords[0][1]--;

                boxcoords[1][0]++;

                boxcoords[2][1]--;

                boxcoords[3][0]--;
                break;
            case 6:  //T
                boxcoords[0][0]++;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]--;
                break;
            case 7:  //Z 
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][1] += 2;
                break;
        }
        state = "180d";
    }
    else if (state == "180d") {
        switch (SHAPEINDEX) {
            case 1: //I
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0] += 2;
                boxcoords[3][1] -= 2;
                break;
            case 2: //J
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][1] += 2;
                break;
            case 3: //L
                boxcoords[0][0] += 2;

                boxcoords[1][0]++;
                boxcoords[1][1]--;

                boxcoords[3][0]--;
                boxcoords[3][1]++;
                break;
            case 5: //S
                boxcoords[0][0] -= 2;
                boxcoords[0][1]++;

                boxcoords[1][0]--;

                boxcoords[2][1]++;

                boxcoords[3][0]++;
                break;
            case 6:   //T
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]++;
                break;
            case 7:  //Z
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][1] -= 2;
                break;
            }
        state = "270d";
    }
    else if (state == "270d") {
        switch (SHAPEINDEX) {
            case 1: //I
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0] -= 2;
                boxcoords[3][1] += 2;
                break;
            case 2: //J
                boxcoords[0][0]--;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][0] += 2;
                break;
            case 3: //L
                boxcoords[0][1] -= 2;

                boxcoords[1][0]--;
                boxcoords[1][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]++;
                break;
            case 5: //S
                boxcoords[0][0] += 2;
                boxcoords[0][1]--;

                boxcoords[1][0]++;

                boxcoords[2][1]--;

                boxcoords[3][0]--;
                break;
            case 6:  //T
                boxcoords[0][0]--;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]++;
                break;
            case 7:  //Z
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][1] += 2;
                break;
            }
        state = "0d";
    }
}
function rotateBackwards() {
    if (state == "90d") {
        switch (shapeIndex) {
            case 1: //I
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0] -= 2;
                boxcoords[3][1] += 2;
                break;
            case 2: //J
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][1] += 2;
                break;
            case 3: //L
                boxcoords[0][0] += 2;

                boxcoords[1][0]++;
                boxcoords[1][1]--;

                boxcoords[3][0]--;
                boxcoords[3][1]++;
                break;
            case 5: //S
                boxcoords[0][0] += 2;
                boxcoords[0][1]--;

                boxcoords[1][0]++;

                boxcoords[2][1]--;

                boxcoords[3][0]--;
                break;
            case 6:  //T
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]++;
                break;
            case 7:  //Z
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][1] +=2 ;
                break;
        }
        state = "0d";
    }
    else if (state == "180d") {
        switch (shapeIndex) {
            case 1: //I
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0] += 2;
                boxcoords[3][1] -= 2;
                break;
            case 2: //J
                boxcoords[0][0]--;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][0] += 2;
                break;
            case 3: //L
                boxcoords[0][1] -= 2;

                boxcoords[1][0]--;
                boxcoords[1][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]++;
                    break;
            case 5: //S
                boxcoords[0][0] -= 2;
                boxcoords[0][1]++;

                boxcoords[1][0]--;

                boxcoords[2][1]++;

                boxcoords[3][0]++;
                break;
            case 6:  //T
                boxcoords[0][0]--;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]++;
                break;
            case 7:  //Z 
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][1] -= 2;
                break;
        }
        state = "90d";
    }
    else if (state == "270d") {
        switch (shapeIndex) {
            case 1: //I
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0] -= 2;
                boxcoords[3][1] += 2;
                break;
            case 2: //J
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][1] -= 2;
                break;
            case 3: //L
                boxcoords[0][0] -= 2;

                boxcoords[1][0]--;
                boxcoords[1][1]++;

                boxcoords[3][0]++;
                boxcoords[3][1]--;
                break;
            case 5: //S
                boxcoords[0][0] += 2;
                boxcoords[0][1]--;

                boxcoords[1][0]++;

                boxcoords[2][1]--;

                boxcoords[3][0]--;
                break;
            case 6:   //T
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][0]++;
                boxcoords[3][1]--;
                break;
            case 7:  //Z
                boxcoords[0][0]++;
                boxcoords[0][1]--;

                boxcoords[2][0]++;
                boxcoords[2][1]++;

                boxcoords[3][1] += 2;
                break;
            }
        state = "180d";
    }
    else if (state == "0d") {
        switch (shapeIndex) {
            case 1: //I
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]++;
                boxcoords[2][1]--;

                boxcoords[3][0] += 2;
                boxcoords[3][1] -= 2;
                break;
            case 2: //J
                boxcoords[0][0]++;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][0] -= 2;
                break;
            case 3: //L
                boxcoords[0][1] += 2;

                boxcoords[1][0]++;
                boxcoords[1][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]--;
                break;
            case 5: //S
                boxcoords[0][0] -= 2;
                boxcoords[0][1]++;

                boxcoords[1][0]--;

                boxcoords[2][1]++;

                boxcoords[3][0]++;
                break;
            case 6:  //T
                boxcoords[0][0]++;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]++;

                boxcoords[3][0]--;
                boxcoords[3][1]--;
                break;
            case 7:  //Z
                boxcoords[0][0]--;
                boxcoords[0][1]++;

                boxcoords[2][0]--;
                boxcoords[2][1]--;

                boxcoords[3][1] -= 2;
                break;
            }
        state = "270d";
    }
}
function checkRotateColision() {
    switch (shapeIndex) {
        case 1: //I 
            if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[2][0].toString() + ',' + boxcoords[2][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            break;
        case 2: //J 
            if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[2][0].toString() + ',' + boxcoords[2][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            break;
        case 3: //L 
            if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[1][0].toString() + ',' + boxcoords[1][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            break;
        case 5: //S 
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[1][0].toString() + ',' + boxcoords[1][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[1][0].toString() + ',' + boxcoords[1][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 6: //T 
            if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                return true;
            }
            break;
        case 7: //Z 
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[2][0].toString() + ',' + boxcoords[2][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[2][0].toString() + ',' + boxcoords[2][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[0][0].toString() + ',' + boxcoords[0][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + ',' + boxcoords[3][1].toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
    }
}
function checkColision() {
    var lowestRow = Math.max(boxcoords[0][0], boxcoords[1][0], boxcoords[2][0], boxcoords[3][0]);
    for (var i = 0; i < 4; i++) {
        if (lowestRow == boxcoords[i][0]) {
            if (document.getElementById((lowestRow + 1).toString() + ',' + boxcoords[i][1]).style.backgroundColor != "white") {
                return true;
            }
        }
    }
    switch (shapeIndex) {
        case 2: //J 
            switch (state) {
                case "0d":
                    if (document.getElementById((boxcoords[0][0] + 1).toString() + ',' + boxcoords[0][1]).style.backgroundColor != "white"
                        || document.getElementById((boxcoords[1][0] + 1).toString() + ',' + boxcoords[1][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById((boxcoords[3][0] + 1).toString() + ',' + boxcoords[3][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 3: //L 
            switch (state) {
                case "0d":
                    if (document.getElementById((boxcoords[2][0] + 1).toString() + ',' + boxcoords[2][1]).style.backgroundColor != "white"
                        || document.getElementById((boxcoords[3][0] + 1).toString() + ',' + boxcoords[3][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById((boxcoords[0][0] + 1).toString() + ',' + boxcoords[0][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 4: //O 
            break;
        case 5: //S 
            switch (state) {
                case "0d":
                    if (document.getElementById((boxcoords[3][0] + 1).toString() + ',' + boxcoords[3][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById((boxcoords[1][0] + 1).toString() + ',' + boxcoords[1][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById((boxcoords[3][0] + 1).toString() + ',' + boxcoords[3][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById((boxcoords[1][0] + 1).toString() + ',' + boxcoords[1][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 6: //T 
            switch (state) {
                case "0d":
                    if (document.getElementById((boxcoords[0][0] + 1).toString() + ',' + boxcoords[0][1]).style.backgroundColor != "white" ||
                        document.getElementById((boxcoords[3][0] + 1).toString() + ',' + boxcoords[3][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById((boxcoords[2][0] + 1).toString() + ',' + boxcoords[2][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById((boxcoords[2][0] + 1).toString() + ',' + boxcoords[2][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 7: //Z 
            switch (state) {
                case "0d":
                    if (document.getElementById((boxcoords[0][0] + 1).toString() + ',' + boxcoords[0][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById((boxcoords[1][0] + 1).toString() + ',' + boxcoords[1][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById((boxcoords[0][0] + 1).toString() + ',' + boxcoords[0][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById((boxcoords[1][0] + 1).toString() + ',' + boxcoords[1][1]).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
    }
}
function checkLeftColision() {
    var leftmost = Math.min(boxcoords[0][1], boxcoords[1][1], boxcoords[2][1], boxcoords[3][1]);
    for (var i = 0; i < 4; i++) {
        if (leftmost == boxcoords[i][1]) {
            if (document.getElementById(boxcoords[i][0] + ',' + (leftmost - 1).toString()).style.backgroundColor != "white") {
                return true;
            }
        }
    }
    switch (shapeIndex) {
        case 2: //J
            switch (state) {
                case "0d":
                    if(document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    for (var i = 0; i <= 1; i++) {
                        if (document.getElementById(boxcoords[i][0].toString() + "," + (boxcoords[i][1] - 1).toString()).style.backgroundColor != "white") {
                            return true;
                        }
                    }
                    break;
            }
            break;
        case 3: //L
            switch (state) {
                case "90d":
                    for (var i = 2; i <= 3; i++) {
                        if (document.getElementById(boxcoords[i][0].toString() + "," + (boxcoords[i][1] - 1).toString()).style.backgroundColor != "white") {
                            return true;
                        }
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 5: //S
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                case "180d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
            }
            break;
        case 6: //T
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 7: //Z
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] - 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
    }
}
function checkRightColision() {
    var rightmost = Math.max(boxcoords[0][1], boxcoords[1][1], boxcoords[2][1], boxcoords[3][1]);
    for (var i = 0; i < 4; i++) {
        if (rightmost == boxcoords[i][1]) {
            if (document.getElementById(boxcoords[i][0] + ',' + (rightmost + 1).toString()).style.backgroundColor != "white") {
                return true;
            }
        }
    }
    switch (shapeIndex) {
        case 2: //J
            switch (state) {
                case "180d":
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    for (var i = 0; i <= 1; i++) {
                        if (document.getElementById(boxcoords[i][0].toString() + "," + (boxcoords[i][1] + 1).toString()).style.backgroundColor != "white") {
                            return true;
                        }
                    }
                    break;
            }
            break;
        case 3: //L
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    for (var i = 2; i <= 3; i++) {
                        if (document.getElementById(boxcoords[i][0].toString() + "," + (boxcoords[i][1] + 1).toString()).style.backgroundColor != "white") {
                            return true;
                        }
                    }
                    break;
            }
            break;
        case 5: //S
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[1][0].toString() + "," + (boxcoords[1][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                case "180d":
                    if (document.getElementById(boxcoords[1][0].toString() + "," + (boxcoords[1][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
            }
            break;
        case 6: //T
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[2][0].toString() + "," + (boxcoords[2][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[0][0].toString() + "," + (boxcoords[0][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
        case 7: //Z
            switch (state) {
                case "0d":
                    if (document.getElementById(boxcoords[1][0].toString() + "," + (boxcoords[1][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "90d":
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "180d":
                    if (document.getElementById(boxcoords[1][0].toString() + "," + (boxcoords[1][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
                case "270d":
                    if (document.getElementById(boxcoords[3][0].toString() + "," + (boxcoords[3][1] + 1).toString()).style.backgroundColor != "white") {
                        return true;
                    }
                    break;
            }
            break;
    }
}
function clearShape(coordsbox) {
    document.getElementById(coordsbox[0][0].toString() + "," + coordsbox[0][1].toString()).style.background = "white";
    document.getElementById(coordsbox[1][0].toString() + "," + coordsbox[1][1].toString()).style.background = "white";
    document.getElementById(coordsbox[2][0].toString() + "," + coordsbox[2][1].toString()).style.background = "white";
    document.getElementById(coordsbox[3][0].toString() + "," + coordsbox[3][1].toString()).style.background = "white";
}
function redraw(coordsbox) {
    document.getElementById(coordsbox[0][0].toString() + "," + coordsbox[0][1].toString()).style.background = "radial-gradient(circle,white, #" + currentColor + ")";;
    document.getElementById(coordsbox[1][0].toString() + "," + coordsbox[1][1].toString()).style.background = "radial-gradient(circle,white, #" + currentColor + ")";;
    document.getElementById(coordsbox[2][0].toString() + "," + coordsbox[2][1].toString()).style.background = "radial-gradient(circle,white, #" + currentColor + ")";;
    document.getElementById(coordsbox[3][0].toString() + "," + coordsbox[3][1].toString()).style.background = "radial-gradient(circle,white, #" + currentColor + ")";;
}
function fallShape(BOXCOORDS) {
    clearShape(BOXCOORDS);
    if (!checkColision()) {
        BOXCOORDS[0][0]++;
        BOXCOORDS[1][0]++;
        BOXCOORDS[2][0]++;
        BOXCOORDS[3][0]++;
    }
    redraw(BOXCOORDS);
}
function spawnShape(SHAPEINDEX) {
    for (var i = 1; i <= 3; i++) {
        if (document.getElementById(boxcoords[i][0].toString() + "," + boxcoords[i][1].toString()).style.backgroundColor != "white") {
            window.alert("GAME OVER!");
            window.location.reload(true);
            return;
        }
    }
    state = "0d";
    switch (SHAPEINDEX) {
        case 1: currentColor = "FF8800";   //I
            break;
        case 2: currentColor = "1129FF";   //J
            break;
        case 3: currentColor = "00FF9D";   //L
            break;
        case 4: currentColor = "FFCC00";   //O
            break;
        case 5: currentColor = "1DFF00";   //S
            break;
        case 6: currentColor = "A202FF";   //T
            break;
        case 7: currentColor = "FF0026";   //Z
            break;
    }
    for (var i = 0; i <= 3; i++) {
        document.getElementById(boxcoords[i][0].toString() + "," + boxcoords[i][1].toString()).style.background = "radial-gradient(circle,white, #" + currentColor + ")";
    }
}
function drawNextShape(SHAPEINDEX) {
    for (var i = 1; i <= 2; i++) {
        for (var j = 1; j <= 4; j++) {
            document.getElementById("score" + i.toString() + j.toString()).style.background = "white";
        }
    }   //clears the box
    switch (SHAPEINDEX){
        case 1: color = "FF8800";   //I
                document.getElementById("score11").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score14").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 2: color = "1129FF";   //J
                document.getElementById("score11").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score23").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 3: color = "00FF9D";   //L
                document.getElementById("score21").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score11").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 4: color = "FFCC00";   //O
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score22").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score23").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 5: color = "1DFF00";   //S
                document.getElementById("score21").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score22").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 6: color = "A202FF";   //T
                document.getElementById("score11").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score22").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score13").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
        case 7: color = "FF0026";   //Z
                document.getElementById("score11").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score12").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score22").style.background = "radial-gradient(circle,white, #" + color + ")";
                document.getElementById("score23").style.background = "radial-gradient(circle,white, #" + color + ")";
                break;
    }
}
function setScoreTimer() {
    document.getElementById("score").innerText = "Score: " + score;
    if (score >= threshold && timer > 100) {
        timer -= 100;
        threshold += 1000;
        audio.pause();
        audio.currentTime = 0;
        audio = document.getElementById("music" + (threshold / 1000).toString());
        audio.play();
    }
    clearInterval(GameSpeed);
    GameSpeed = setInterval(Game, timer);
}
function getShapeIndex() {
    return Math.floor(Math.random() * (8 - 1) + 1);
}
function muteMusic() {
    if (document.getElementById('mute').innerText == 'Mute') {
        document.getElementById('mute').innerText = 'Unmute';
        audio.muted = true;
    } else {
        document.getElementById('mute').innerText = 'Mute'
        audio.muted = false;
    }
}
