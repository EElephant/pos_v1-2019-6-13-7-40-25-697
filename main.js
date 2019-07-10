'use strict';
const aaa = require('./test/fixtures');
const database = aaa.loadAllItems();
const promotion = aaa.loadPromotions();

const isBarcodesValid = (Barcodes) =>{
    let index = 0
    Barcodes.forEach(element => {
        database.forEach(item => {
            if(element == item.barcode){
                index ++
            }
        })
    })
    if(index == Barcodes.length){
        return true
    }else{
        return false
    }
}

const createItemLists = (Barcodes,isExst) => {
    let itemLists = []
    if(isExst == false){
        return null
    }else{
        Barcodes.forEach(element => {
            database.forEach(item => {
                if(element == item.barcode){
                    itemLists.push(item)
                }
            })
        })
        return itemLists
    }
}

const createReceipt = (itemLists) => {
    let receipt = [];
    
    itemLists.forEach(item => {
        let singleReceipt = {
            barcode: '',
            name: '',
            count: 0,
            unit: '',
            price: 0,
            
        }
        singleReceipt.barcode = item.barcode
        singleReceipt.name = item.name
        singleReceipt.price = item.price
        singleReceipt.count = 1
        singleReceipt.unit = item.unit
        receipt.push(singleReceipt)  
    })
    receipt = mergeSingleItemCount(receipt)
    // receipt = dealWithPromotion(receipt)
    return receipt
}

const mergeSingleItemCount = (receipt) =>{
    let elementMap = new Map()
    receipt.forEach(item => {
        let count = (elementMap.get(item.name) === undefined) ? 1 : elementMap.get(item.name) + 1;
        elementMap.set(item.name, count);
    })
    let result = [];
    elementMap.forEach((value, key) => {
        let item = {
            name: key,
            count: value,
        };
        result.push(item);
    });
    result = rebulidReceipt(result)

    return result;
}

const rebulidReceipt = (map) =>{
    let itemLists = []
    map.forEach(element => {
        database.forEach(item => {
            let singleReceipt = {
                barcode: '',
                name: '',
                count: 0,
                unit: '',
                price: 0,
                }
            if(element.name == item.name){
                singleReceipt.barcode = item.barcode
                singleReceipt.name = item.name
                singleReceipt.count = element.count
                singleReceipt.unit = item.unit
                singleReceipt.price = item.price
                itemLists.push(singleReceipt)
            }
        })
    })
    return itemLists
}

const printReceiptString = (receipt) =>{
    let receiptString = ''
    let totalPrice = 0
    let proPrice = 0
    receiptString += '***<没钱赚商店>收据***\n'
    receipt.forEach(item => {
        receiptString += '名称：'
        receiptString += item.name
        receiptString += ',\t数量：'
        receiptString += item.count
        receiptString += item.unit
        receiptString += ',\t单价：'
        receiptString += item.price
        receiptString += '(元)，\t小计：'
        receiptString += item.price * item.count - dealWithPromotion(item.count,item.price)
        totalPrice += item.price * item.count - dealWithPromotion(item.count,item.price)
        proPrice += dealWithPromotion(item.count,item.price)
        receiptString += '(元)\n'
    })
    receiptString += '-------------------------\n'
    receiptString += `总价：${totalPrice}(元)\n`
    receiptString += `节省：${proPrice}(元)\n`
    receiptString += '***************************'
    return receiptString

}

const dealWithPromotion = (count,price) => {
    let promotion = 0
    if(count>=3){
        promotion = parseInt(count / 3) * price
    }
    return promotion
}


module.exports = {isBarcodesValid,
    createItemLists,createReceipt,printReceiptString}