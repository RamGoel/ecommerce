export function getDiscountedPrice(price, discountPercent){
    var discountAmount=(price*discountPercent)/100
    return !isNaN(price-discountAmount)?price-discountAmount:price;
}

export const convertArrayToObject=(array, condition)=>{
    var obj={}
    array.map(e => {
        if (condition(e)) {
            obj[e.id] = e
        }
        return 1;
    })

    return obj
}