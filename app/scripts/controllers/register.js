'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('RegisterCtrl', ['UserService', 'FlashService', function (UserService, FlashService) {

    var vm = this;

    vm.register = register;
    vm.cleanFields = cleanFields;
    vm.user = {};

    function register() {
      //console.log(vm.user);
      UserService.Create(vm.user).then(function (response) {
        if (response.success) {
            FlashService.Success('Registration successful', true);
            // $location.path('/register');
        } else {
            FlashService.Error(response.message);
        }
        loadAllUsers();
        cleanFields();
      });
      // loadAllUsers();
    }

    function cleanFields() {
      vm.user.name = '';
      vm.user.dni = '';
      vm.user.address = '';
      vm.user.email = '';
      vm.user.phone = '';
    }

    initController();

    function initController() {
      loadAllUsers();
      // cleanFields();
    }

    // var dr = this;
    vm.allUsers = [];
    vm.deleteCustomer = deleteCustomer;
    vm.editCustomer = editCustomer;

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
        console.log("not deleted");
      }
      // UserService.Delete(dni)
      // .then(function() {
      //   loadAllUsers();
      // })
    }

    function editCustomer(dni) {
      console.log(vm.allUsers);
    }
  }]);
