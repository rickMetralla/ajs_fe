'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:DialogcontrollerCtrl
 * @description
 * # DialogcontrollerCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('dialogController', ['UtilService', '$uibModalInstance', 'params', function (UtilService, $uibModalInstance, params) {
    var dc = this;
    dc.models = params.models;
    dc.product = {};
    dc.model = {};
    dc.product.name = '';
    dc.model.name = '';
    dc.product.stock = '';

    initRegisterProductModal(params.productToEdit);

    function initRegisterProductModal(productToUpdate){
      if (productToUpdate !== undefined){
        dc.product.id = productToUpdate.id;
        dc.product.name = productToUpdate.name;
        dc.model.name = productToUpdate.model;
        dc.product.stock = productToUpdate.stock;
      }
    }

    dc.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

    dc.ok = function () {
      if(dc.model === null){
        alert("Needs to select a Name of Model.");
        return;
      }
       var product = {
          name: dc.product.name,
          model: dc.model.name,
          stock: dc.product.stock
       };
       let message = UtilService.validateProductFields(product);
       if(params.productToEdit !== undefined) product.id = params.productToEdit.id;
       if(product.stock === '') product.stock = 0;
       if(message !== ""){
         alert(message);
         return;
       }
       $uibModalInstance.close(product);
    };
  }]);
