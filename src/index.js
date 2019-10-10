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
        try{
            res = a/b;
        }catch(e){
            throw new Error('TypeError: Division by zero.'); 
        }
    }
    if(res.toFixed().length >2){
        res = res.toFixed(4);
    }
    return res;
}


function deleteSpaces(str){
    const regexp = /\ /gm;
    return str.replace(regexp, '');
}
function convertToNumber(arr){
    return arr.map(item => +item)
}

function cutStr(sign,mainStr, leftPos, rightPos){
    const cutStr = mainStr.substring(leftPos,rightPos);
    const posMulti = cutStr.indexOf(sign);
    const numberStrLeft = cutStr.substring(0, posMulti);
    const numberStrRight = cutStr.substring(posMulti+1, cutStr.length);
    const res = eval(+numberStrLeft, +numberStrRight, sign);
    
    
    return mainStr.replace(cutStr,res);
}


function expressionCalculator(expr) {
    let slimStr = deleteSpaces(expr);
    while(slimStr.indexOf('-')!==-1 ) slimStr = slimStr.replace('-','!');

    const regSign = /[^\*\!\/\+]+/;
    for (sign of signArray){
        while (slimStr.indexOf(sign) !== -1 && slimStr.indexOf(sign) !== 0){
            const posMulti = slimStr.indexOf(sign);
            let posMultiLeft = posMulti-1;
            let posMultiRight = posMulti+1;
            while(posMultiLeft > 0 && slimStr.charAt(posMultiLeft-1).match(regSign)){
                posMultiLeft--; 
            }
            while(posMultiRight < slimStr.length && slimStr.charAt(posMultiRight).match(regSign)){
                posMultiRight++; 
            }
            
            slimStr = cutStr(sign,slimStr, posMultiLeft, posMultiRight);
            
            
            
            console.log(slimStr);
            //posMulti = -1;
        }
    }
    
    
}

expressionCalculator('1/0');
// module.exports = {
//     expressionCalculator
// }