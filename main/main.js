'use strict';


const isBarcodesValid = (Barcodes) =>{
    let allItems = loadAllItems
    let index = 0
    Barcodes.forEach(element => {
        allItems.forEach(item => {
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