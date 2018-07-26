'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:PurchaseCtrl
 * @description
 * # PurchaseCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('PurchaseCtrl', ['PurchaseService', 'UserService', 'ProductService', 'UtilService',
  function (PurchaseService, UserService, ProductService, UtilService) {

    var cntrl = this;
    cntrl.allUsers = [];
    cntrl.selectOne = selectOne;
    cntrl.loadAllUsers = loadAllUsers;

    cntrl.allProducts = [];
    cntrl.toPurchase = [];
    cntrl.getAllProducts = getAllProducts;
    cntrl.CommitPurchase = CommitPurchase;
    cntrl.ProductToBuy = ProductToBuy;
    initController();

    function initController() {
      loadAllUsers();
      getAllProducts();
    }


    function loadAllUsers() {
      UserService.GetAll().then(function (customers) {
        // console.log("arrived")
        // console.log(customers);
        cntrl.allUsers = customers;
      });
      cntrl.toPurchase = [];
    }

    function selectOne(dni) {
      UserService.GetByDni(dni)
      .then(function(customer) {
        cntrl.allUsers = [customer];
      })
    }

    function getAllProducts(){
      ProductService.GetAll().then(function(products){
        cntrl.allProducts = products;
      })
    }

    cntrl.selectedList = {};
    cntrl.amountList = {};
    function ProductToBuy(item){
      let indexOfItem = cntrl.toPurchase.indexOf(item);
      if (indexOfItem === -1) {
        cntrl.toPurchase.push(item);
      } else {
        cntrl.toPurchase.splice(indexOfItem, 1)
      }
      //item.datePurchased = UtilService.currentDate();
      // console.log(cntrl.selectedList);
    }

    function CommitPurchase(){
      if (cntrl.allUsers.length === 1){
        // console.log(cntrl.allUsers);
        // console.log(cntrl.toPurchase);
        // let customer = cntrl.allUsers[0];

        // creation of a transaction
        let transaction = {};
        transaction.custDni = cntrl.allUsers[0].dni;
        transaction.productOrders = [];
        // console.log(cntrl.amountList);
        for(let key in cntrl.amountList){
          // console.log(key + ': ' + cntrl.amountList[key]);
          transaction.productOrders.push({
            prodId : parseInt(key),
            amount : cntrl.amountList[key]
          });
        }
        // transaction.purchasedAt = UtilService.currentDate();
        // transaction.purchasedAt = JSON.stringify(new Date());
        transaction.purchasedAt = UtilService.fixedDate();
        console.log(transaction);
        console.log(JSON.stringify(transaction));

        PurchaseService.createTransaction(transaction).then(function(){
          // response logic
        })

        // customer.products = cntrl.toPurchase;
        // // console.log(customer);
        // console.log(JSON.stringify(customer));
        // // UserService.Update()
        // UserService.Update(customer).then(function(response){
        //   //response logic
        // });
      }
      // console.log(cntrl.amountList);
    }

  }]);
