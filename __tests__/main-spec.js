'use strict';
const aaa = require('../main.js');
// describe('pos', () => {

//   it('should print text', () => {

//     const tags = [
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000003-2.5',
//       'ITEM000005',
//       'ITEM000005-2',
//     ];

//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
// 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
// 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
// ----------------------
// 总计：58.50(元)
// 节省：7.50(元)
// **********************`;

//     expect(console.log).toHaveBeenCalledWith(expectText);
//   });
// });

  it('should return true when call is barcodes valid given right barcodes',()=>{
    const barcodes = ['ITEM000001','ITEM000002','ITEM000003']
    expect(aaa.isBarcodesValid(barcodes)).toBe(true)
  })

  it('should return false when call is barcodes valid given error barcodes',()=>{
    const barcodes = ['ITEM1000001','ITEM000002','ITEM000003']
    expect(aaa.isBarcodesValid(barcodes)).toBe(false)
  })



  let itemLists = [{
    barcode: 'ITEM000001',
    name: '雪碧',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000002',
    name: '苹果',
    unit: '斤',
    price: 5.50
  },
  {
    barcode: 'ITEM000003',
    name: '荔枝',
    unit: '斤',
    price: 15.00
  }]
  it('should return itemLists when call create ItemLists given right barcodes',()=>{
    const barcodes = ['ITEM000001','ITEM000002','ITEM000003']
    expect(aaa.createItemLists(barcodes,aaa.isBarcodesValid(barcodes))).toStrictEqual(itemLists)
  })

  it('should return null when call create ItemLists given error barcodes',()=>{
    const barcodes = ['ITEM1000001','ITEM000002','ITEM000003']
    expect(aaa.createItemLists(barcodes,aaa.isBarcodesValid(barcodes))).toBe(null)
  })


  let receipt = [{
    barcode: 'ITEM000001',
    count:3,
    name: '雪碧',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000002',
    count:5,
    name: '苹果',
    unit: '斤',
    price: 5.50
  },
  {
    barcode: 'ITEM000003',
    count:2,
    name: '荔枝',
    unit: '斤',
    price: 15.00
  }]
  it('should return receipt when call create Receipt given right barcodes',()=>{
    const barcodes = ['ITEM000001','ITEM000001','ITEM000001','ITEM000002','ITEM000002','ITEM000002','ITEM000002','ITEM000002','ITEM000003','ITEM000003']
    expect(aaa.createReceipt(aaa.createItemLists(barcodes,aaa.isBarcodesValid(barcodes)))).toStrictEqual(receipt)
  })

  let receiptString = '***<没钱赚商店>收据***\n名称：雪碧,\t数量：3瓶,\t单价：3(元)，\t小计：6(元)\n名称：苹果,\t数量：5斤,\t单价：5.5(元)，\t小计：22(元)\n名称：荔枝,\t数量：2斤,\t单价：15(元)，\t小计：30(元)\n-------------------------\n总价：58(元)\n节省：8.5(元)\n***************************'
  it('should return receipt when call create Receipt given right barcodes',()=>{
    const barcodes = ['ITEM000001','ITEM000001','ITEM000001','ITEM000002','ITEM000002','ITEM000002','ITEM000002','ITEM000002','ITEM000003','ITEM000003']
    expect(aaa.printReceiptString(aaa.createReceipt(aaa.createItemLists(barcodes,aaa.isBarcodesValid(barcodes))))).toStrictEqual(receiptString)
  })