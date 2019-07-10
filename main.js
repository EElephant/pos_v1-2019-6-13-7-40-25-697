'use strict';
const aaa = require('./test/fixtures');
const database = aaa.loadAllItems();

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



module.exports = {isBarcodesValid,
    createItemLists}