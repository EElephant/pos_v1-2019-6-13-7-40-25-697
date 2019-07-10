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





module.exports = {isBarcodesValid}