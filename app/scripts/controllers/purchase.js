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

    function ProductToBuy(item){
      item.datePurchased = UtilService.currentDate();
      // console.log(item);
      cntrl.toPurchase.push(item);
    }

    function CommitPurchase(){
      if (cntrl.allUsers.length === 1){
        // console.log(cntrl.allUsers);
        // console.log(cntrl.toPurchase);
        let customer = cntrl.allUsers[0];
        customer.products = cntrl.toPurchase;
        // console.log(customer);
        console.log(JSON.stringify(customer));
        // UserService.Update()
        UserService.Update(customer).then(function(response){
          //response logic
        });
      }
    }

  }]);
