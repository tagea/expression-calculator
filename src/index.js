const signArray = ['/','*','!','+'];

function eval(a, b, s) {
    let res = 0;
    if(s === '+'){
        res = a+b;
    }
    if(s === '!'){
        res = a-b;
    }
    if(s === '*'){
        res = a*b;
    }
    if(s === '/'){   
       if(b === 0){
        throw new Error('TypeError: Division by zero.'); 
       }
       res = a/b;
    }
    return res;
}

function evalStr(str){
    const regSign = /[^\*\!\/\+]+/;
    for (sign of signArray){
        while (str.indexOf(sign) !== -1 && str.indexOf(sign) !== 0){
            const posMulti = str.indexOf(sign);
            let posMultiLeft = posMulti-1;
            let posMultiRight = posMulti+1;
            while(posMultiLeft > 0 && str.charAt(posMultiLeft-1).match(regSign)){
                posMultiLeft--; 
            }
            while(posMultiRight < str.length && str.charAt(posMultiRight).match(regSign)){
                posMultiRight++; 
            }
            
            str = cutStr(sign,str, posMultiLeft, posMultiRight);
        }
    }
    return str;
}


function deleteSpaces(str){
    const regexp = /\ /gm;
    return str.replace(regexp, '');
}

function cutStr(sign,mainStr, leftPos, rightPos){
    const cutStr = mainStr.substring(leftPos,rightPos);
    const posMulti = cutStr.indexOf(sign);
    const numberStrLeft = cutStr.substring(0, posMulti);
    const numberStrRight = cutStr.substring(posMulti+1, cutStr.length);
    const res = eval(+numberStrLeft, +numberStrRight, sign);
    
    return mainStr.replace(cutStr,res);
}

function checkBrackets(slimStr, configBrackets){
    const countBr = [0,0];
    let tempStr = slimStr;
    configBrackets.forEach((item, indx) => {
        while(tempStr.indexOf(item) !== -1){
            countBr[indx]++;
            const pos = tempStr.indexOf(item);
            tempStr = tempStr.substring(pos+1, tempStr.length);
        }
        tempStr = slimStr;
    });
    return countBr[0] === countBr[1];
}

function findRightBrPos(leftBrPos, str, configBrackets){
    let found = false;
    let pos = leftBrPos + 1;
    let tempFound = 0;
    while(!found){
        if(str.charAt(pos) === configBrackets[0]){
            tempFound++;
            pos++;
        }else if(str.charAt(pos) === configBrackets[1]){
            if(tempFound === 0){found = true;}
            else{
                tempFound--;
                pos++;
            }
        }else{
            pos++;
        }
    }
    return pos;
}

function expressionCalculator(expr) {
    const regSign = /[^\*\!\/\+]+/;
    const configBrackets = ['(',')'];
    let slimStr = deleteSpaces(expr);
    // for correct calculate negative values
    while(slimStr.indexOf('-') !== -1 ) slimStr = slimStr.replace('-','!');

    const bracketsCorrect = checkBrackets(slimStr, configBrackets);
    if(bracketsCorrect){
        let fromIndex = 0;
        let fromLastIndex = slimStr.length;
        let r = 1
        while(slimStr.indexOf(configBrackets[0]) !== -1){
            let leftBrPos = slimStr.indexOf(configBrackets[0],fromIndex);
            let rightBrPos = findRightBrPos(leftBrPos, slimStr, configBrackets);
            let slimStrInner = slimStr.substring(leftBrPos+1, rightBrPos);
            if(slimStrInner.indexOf(configBrackets[0]) === -1){
                slimStrInner = evalStr(slimStrInner);
                slimStr = slimStr.substring(0,leftBrPos) + slimStrInner + slimStr.substring(rightBrPos+1,slimStr.length);
                
                fromIndex = 0;
                fromLastIndex = slimStr.length;
            }else{
                
                fromIndex = leftBrPos + 1;
                fromLastIndex = findRightBrPos(fromIndex, slimStr, configBrackets);
            }
        }

        slimStr = evalStr(slimStr);
        
        let res = +slimStr;
        if(slimStr.length > 3){
            res = res.toFixed(4);
        }
        return +res;
    }else{
        throw new Error('ExpressionError: Brackets must be paired'); 
        
    }
}

module.exports = {
    expressionCalculator
}