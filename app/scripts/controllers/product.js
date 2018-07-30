'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('ProductCtrl', ['UtilService', 'ProductService', function (UtilService, ProductService) {
    var vm = this;
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

    function saveProduct(){
      if(vm.product == undefined){
        alert("fill necessary values");
        return;
      }
      vm.product.model = vm.model.name;
      vm.product.dateCreated = UtilService.fixedDate();
      ProductService.Create(vm.product)
        .then(function(response){
        loadAllProducts()
        cleanFields();
      });
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

    function validator(product){
      
    }

  }]);
