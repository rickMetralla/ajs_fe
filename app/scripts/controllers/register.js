'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('RegisterCtrl', ['UserService', 'UtilService', '$scope', 'orderByFilter', function (UserService, UtilService, $scope, orderBy) {

    var vm = this;
    vm.registerNew = true;
    vm.register = register;
    vm.cleanFields = cleanFields;
    vm.allUsers = [];
    vm.deleteCustomer = deleteCustomer;
    vm.editCustomer = editCustomer;
    vm.updateCustomer = updateCustomer; //need implementation
    vm.user = {};

    vm.sortBy = function(propertyName){
      $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
         ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
      vm.allUsers = orderBy(vm.allUsers, $scope.propertyName, $scope.reverse);
    };

    function register() {
      let message = UtilService.validateCustomerFields(vm.user);
      if (message !== ""){
        alert(message);
        return;
      }
      UserService.Create(vm.user).then(function (response) {
        $('#registerModal').modal('hide'); // should be called by angular
        loadAllUsers();
        cleanFields();
      });
    }

    function cleanFields() {
      vm.user.name = '';
      vm.user.dni = '';
      vm.user.address = '';
      vm.user.email = '';
      vm.user.phone = '';
      vm.registerNew = true;
    }

    initController();

    function initController() {
      loadAllUsers();
      cleanFields();
      vm.registerNew = true;
    }

    function loadAllUsers() {
      UserService.GetAll().then(function (users) {
        vm.allUsers = users;
      });
    }

    function deleteCustomer(dni) {
      if (confirm("Are you sure delete user with dni: " + dni)) {
        console.log(dni + " deleted");
        UserService.Delete(dni)
        .then(function() {
          loadAllUsers();
        })
      } else {
        console.log(dni + " not deleted yet");
      }
    }

    function editCustomer(customer) {
      vm.registerNew = false;
      vm.user.name = customer.name;
      vm.user.dni = customer.dni;
      vm.user.address = customer.address;
      vm.user.email = customer.email;
      vm.user.phone = customer.phone;
    }

    function updateCustomer(customer){
      // console.log(customer);
      vm.registerNew = true;
    }
  }]);
