export function getDiscountedPrice(price, discountPercent){
    var discountAmount=(price*discountPercent)/100
    return !isNaN(price-discountAmount)?price-discountAmount:price;
}