'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('ProductCtrl', ['UtilService', 'ProductService', '$uibModal', function (UtilService, ProductService, $uibModal) {
    var vm = this;
    vm.openDialog = openDialog;
    vm.cleanFields = cleanFields;
    vm.saveProduct = saveProduct;
    vm.editProduct = editProduct;
    vm.deleteProduct = deleteProduct;
    vm.models = [];
    vm.products = [];
    vm.product = {};
    initProdServ();

    function initProdServ(){
      loadAllModels();
      loadAllProducts();
    }

    function loadAllModels() {
      ProductService.GetAllModels()
          .then(function (response_models) {
              vm.models = response_models;
          });
    }

    function saveProduct(product){
      if(product == undefined){
        alert("not valid product");
        return;
      }
      console.log(product);
      console.log('creating product');
      // ProductService.Create(product)
      //   .then(function(response){
      //   loadAllProducts()
      //   cleanFields();
      // });
    }

    function cleanFields(){
      vm.product.name = '';
      vm.product.amount = '';
      loadAllModels();
    }

    function loadAllProducts(){
      ProductService.GetAll().then(function(response){
        vm.products = response;
      });
    }

    vm.model = {};
    function editProduct(prod) {
      // console.log(prod);
      vm.product.name = prod.name;
      vm.product.amount = prod.amount;
      vm.model.name = prod.model;
    }

    function deleteProduct(name, id) {
      if (confirm("Are you sure delete " + name + " product?")) {
        ProductService.Delete(id).then(function(){
          loadAllProducts();
          cleanFields();
        })
      } else {
        console.log("not delete " + id);
      }
    }

    function openDialog(){
      // console.log(vm.models);
      var modalInstance = $uibModal.open({
        templateUrl: "views/dialogModal.html",
        controller: "dialogController",
        controllerAs: 'dc',
        size: "md",
        resolve: {     //data before open modal to populate on it
          params: function () {
            return vm.models;
          }
        }
      });

      modalInstance.result.then(function (result){
        saveProduct(result);
      }, function () {
        console.log("Dialog dismissed");
      });
    }


  }]);
