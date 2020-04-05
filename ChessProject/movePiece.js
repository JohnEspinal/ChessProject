'use strict'
 


var ids = [
    "brock",
    "bhorse",
    "bbishop",
    "bking",
    "bqueen",
    "bpawn",
    "wpawn",
    "wrock",
    "whorse",
    "wbishop",
    "wqueen",
    "wking"
];

var sources = [
    "resources/ChessPieces/brock.png",
    "resources/ChessPieces/bhorse.png",
    "resources/ChessPieces/bbishop.png",
    "resources/ChessPieces/bqueen.png",
    "resources/ChessPieces/bking.png",
    "resources/ChessPieces/bpawn.png",
    "resources/ChessPieces/wpawn.png",
    "resources/ChessPieces/wrock.png",
    "resources/ChessPieces/whorse.png",
    "resources/ChessPieces/wbishop.png",
    "resources/ChessPieces/wqueen.png",
    "resources/ChessPieces/wking.png"
];

function getImage(id, source) {

    var img = document.createElement("img");
    img.setAttribute("id", id);
    img.setAttribute("src", source);

    return img;
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

function piecesFactory(input) {
    var result;

    switch (input) {
        case "r": result = getImage(ids[0], sources[0])
            break;
        case "n": result = getImage(ids[1], sources[1])
            break;
        case "b": result = getImage(ids[2], sources[2])
            break;
        case "q": result = getImage(ids[3], sources[3])
            break;
        case "k": result = getImage(ids[4], sources[4])
            break;
        case "p": result = getImage(ids[5], sources[5])
            break;
        case "P": result = getImage(ids[6], sources[6])
            break;
        case "R": result = getImage(ids[7], sources[7])
            break;
        case "N": result = getImage(ids[8], sources[8])
            break;
        case "B": result = getImage(ids[9], sources[9])
            break;
        case "Q": result = getImage(ids[10], sources[10])
            break;
        case "K": result = getImage(ids[11], sources[11])
            break;
        default: result = null;
    }

    return result;
}

function ClearChess(){

    for(var x=0;x<64;x++){
        if(document.getElementById(boxes[x]).hasChildNodes()){
            document.getElementById(boxes[x]).removeChild(document.getElementById(boxes[x]).firstChild);
        }

        
    }
}

function Move(piece, casilla) {

    piece = piecesFactory(piece);

    casilla = document.getElementById(boxes[casilla]);

    casilla.append(piece);
}

var boxes = [];
for (var i = 8; i > 0; i--) {
    for (var x = 97; x < 105; x++) {
        boxes.push(String.fromCharCode(x) + i.toString());
    }

}


var content;

var input = document.getElementById("sendButton");


input.addEventListener('click', function () {
    ClearChess();
    
    content = document.getElementById("posicion").value;

    content = content.split('/');

    if(Validate(content)){
        var counter = 0;

        
    for (var i = 0; i < content.length; i++) {
        var target=content[i];

        for (var x = 0; x < target.length; x++) {

            var currentElement = target[x];

            if (TryParseInt(currentElement, 0) == currentElement) {
                currentElement = parseInt(currentElement);


                counter=counter+currentElement-1;
            } else {
                Move(currentElement, counter);
            }

            counter++;

        }
    }
    }else{
        alert("El texto ingresado no es una notación FEN o no es un escenario posible en el juego.");
    }
    
});



function Validate(input){
    var IsValid;
    var counter = 0;


    if(input.length==8){
        var first = input[0];


        var lastArr = input[7].split(" ");

        input[7] = lastArr[0];
        input[8] = lastArr[1];
        
        input.pop();

        var last = lastArr[0];

        var lastletter = lastArr[1];

        console.log(lastletter);

        if((lastletter!="b")&&(lastletter!="w")){
            console.log("falseeeeee");
            return false;
        }

        console.log(input);
    
        if(first.includes("p") || last.includes("P")){
            IsValid = false;
        }else{
            IsValid = true;

            for (var i = 0; i < input.length; i++) {
                var target=input[i];
                
                /*var hasCastlingAbility = /^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/.test(input[1]);

                if(hasCastlingAbility){
                    return hasCastlingAbility
                }*/


                for (var x = 0; x < target.length; x++) {
        
                    var currentElement = target[x];
        
                    var IsValid = /[1-8]|[pkqbnrPKQBNR]/ig.test(currentElement);
                    

                    if(IsValid==false){
                        return IsValid;
                    }

                    var hasContinuesNumbers = /\d{2}/.test(target);



                    if(hasContinuesNumbers==true){
                        return false;
                    }
        
                }


            }
            
            
            


        }
    }else{
        IsValid=false;
    }


    return IsValid;
}