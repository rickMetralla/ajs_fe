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
    dc.models = params;
    dc.product = {};
    dc.model = {};
    dc.product.name = '';
    dc.model.name = '';
    dc.product.amount = '';

    initRegisterProductModal();

    function initRegisterProductModal(productToUpdate){
      if (productToUpdate !== undefined){
        dc.product.name = productToUpdate.name;
        dc.model.name = productToUpdate.model;
        dc.product.amount = productToUpdate.amount;
      }
    }

    dc.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

    dc.ok = function () {
       var product = {
          name: dc.product.name,
          model: dc.model.name,
          amount: dc.product.amount
       };
       let message = UtilService.validateProductFields(product);
       if(product.amount === '') product.amount = 0;
       if(message !== ""){
         alert(message);
         return;
       }
       $uibModalInstance.close(product);
    };
  }]);
