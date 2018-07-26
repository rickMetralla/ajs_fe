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
    initProdServ();

    function initProdServ(){
      loadAllModels();
      loadAllProducts();
    }

    function loadAllModels() {
      ProductService.GetAllModels()
          .then(function (response_models) {
              // console.log("arrived")
              vm.models = response_models;
          });
    }

    // function saveModel(){
    //   if(vm.product == undefined){
    //     alert("fill necessary values")
    //     return;
    //   }
    //   vm.product.dateCreated = UtilService.currentDate();
    //   console.log(vm.product);
    // }

    // console.log(UtilService.currentDate());
    function saveProduct(){
      if(vm.product == undefined){
        alert("fill necessary values");
        return;
      }
      vm.product.model = vm.model.name;
      vm.product.dateCreated = UtilService.fixedDate();
      // console.log(JSON.stringify(vm.product));
      ProductService.Create(vm.product)
        .then(function(response){
          // if(response.success){
        //   alert("product saved successfully!")
        // }else{
        //   alert("[Error] something went wrong...")
        // }
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
        // console.log(response);
        vm.products = response;
      });
    }

    function editProduct(id) {
      console.log("should edit product");
    }

    function deleteProduct(name, id) {
      if (confirm("Are you sure delete " + name + " product?")) {
        console.log("delete " + id);
      } else {
        console.log("not delete " + id);
      }
    }

  }]);
