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
    vm.openCreateProductDialog = openCreateProductDialog;
    vm.openEditProductDialog = openEditProductDialog;
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
      vm.product.stock = '';
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
      vm.product.stock = prod.stock;
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

    function openCreateProductDialog(){
      var modalInstance = $uibModal.open({
        templateUrl: "views/dialogModal.html",
        controller: "dialogController",
        controllerAs: 'dc',
        size: "md",
        resolve: {
          params: function () {
            return {
              models : vm.models
            };
          }
        }
      });

      modalInstance.result.then(function (result){
        saveProduct(result);
      }, function () {
        // console.log("Dialog dismissed");
      });
    }

    function openEditProductDialog(product){
      console.log(product);
      var modalInstance = $uibModal.open({
        templateUrl: "views/dialogModal.html",
        controller: "dialogController",
        controllerAs: 'dc',
        size: "md",
        resolve: {
          params: function () {
            return {
              productToEdit : product,
              models : vm.models
            };
          }
        }
      });

      modalInstance.result.then(function (result){
        saveProduct(result);
      }, function () {
        // console.log("Dialog dismissed");
      });
    }


  }]);
