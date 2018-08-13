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

    cntrl.allProducts = []; // products to show
    cntrl.toPurchase = [];
    cntrl.getAllProducts = getAllProducts;
    cntrl.CommitPurchase = CommitPurchase;
    cntrl.ProductToBuy = ProductToBuy;

    cntrl.allPurchasers = [];
    cntrl.selectedPurchaser = [];
    cntrl.products = []; // products selected to purchase by customer
    cntrl.viewPurchase = viewPurchase;
    cntrl.loadAllPurchasers = loadAllPurchasers;

    cntrl.selectedList = {};
    cntrl.amountList = {};
    cntrl.fixDate = fixDate;
    cntrl.getProductName = getProductName;

    initController();

    function initController() {
      loadAllUsers();
      getAllProducts();
    }


    function loadAllUsers() {
      UserService.GetAll().then(function (customers) {
        cntrl.allUsers = customers;
        // console.log(customers);
      });
      loadAllPurchasers();
      cntrl.toPurchase = [];
      cntrl.products = [];
      cntrl.selectedList = {};
      cntrl.amountList = {};
    }

    function selectOne(dni) {
      UserService.GetByDni(dni).then(function(customer) {
        cntrl.allUsers = [customer];
      });
    }

    function getAllProducts(){
      ProductService.GetAll().then(function(products){
        cntrl.allProducts = products;
      });
    }


    function ProductToBuy(item){
      let indexOfItem = cntrl.toPurchase.indexOf(item);
      if (indexOfItem === -1) {
        cntrl.toPurchase.push(item);
      } else {
        cntrl.toPurchase.splice(indexOfItem, 1)
      }
    }

    function CommitPurchase(){
      if (cntrl.allUsers.length === 1){
        if(cntrl.purchaseDate === undefined){
          alert("Set date is mandatory");
          return;
        }

        // creation of a transaction
        let prodOrderList = [];
        // console.log(cntrl.amountList);
        for(let key in cntrl.amountList){
          if(cntrl.amountList[key] > 0){
            prodOrderList.push({
              prodId : parseInt(key),
              amount : cntrl.amountList[key]
            });
          }else{
            // console.log(key);
            let productName = cntrl.getProductName(parseInt(key));
            alert("Amount not valid for " + productName);
            return;
          }
        }

        if(prodOrderList.length === 0){
          alert("Needs to select one product at least");
          return;
        }
        // console.log(prodOrderList);

        let transaction = {};

        transaction.custDni = cntrl.allUsers[0].dni;
        transaction.invoices = [];

        transaction.invoices.push({
          productOrders : prodOrderList,
          purchasedAt : UtilService.fixDate(cntrl.purchaseDate)
        });

        PurchaseService.createTransaction(transaction).then(function(res){
          // console.log(res);
          initController();
        });
      }
    }

    function getProductName(prodId){
      // console.log(prodId);
      // console.log(cntrl.allProducts);
      for (var i = 0; i < cntrl.allProducts.length; i++) {
        if(cntrl.allProducts[i].id === prodId){
          return cntrl.allProducts[i].name;
        }
      }
    }

    function viewPurchase(dni){
      UserService.GetByDni(dni).then(function(purchaser) {
        // console.log(purchaser);
        // console.log(cntrl.allPurchasers);
        cntrl.selectedPurchaser = [purchaser];
        // console.log(cntrl.allPurchasers);
        for (var i = 0; i < cntrl.allPurchasers.length; i++) {
          if (cntrl.allPurchasers[i].custDni === dni){
            cntrl.products = cntrl.allPurchasers[i].invoices;
          }
        }
        // console.log(cntrl.products);
      });
    }

    function loadAllPurchasers() {
      PurchaseService.GetAllPurchaser().then(function(purchasers){
        // console.log(purchasers);
        cntrl.allPurchasers = purchasers;
        cntrl.selectedPurchaser = [];
      });
    }

    function fixDate(failDate){
      let correctDate = failDate.split("@")[0];
      return correctDate;
    }

  }]);
