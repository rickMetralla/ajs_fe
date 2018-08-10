'use strict';

angular.module('aPpApp')
  .factory('UserService', ['$http', function ($http) {

      var service = {};

      service.GetAll = GetAll;
      service.GetByDni = GetByDni;
      service.Create = Create;
      service.Update = Update;
      service.Delete = Delete;

      return service;

      function GetAll() {
        var req = {
          method: 'GET',
          url: 'http://localhost:8080/customers',
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req).then(handleSuccess, handleError('Error getting all users'));
      }

      function GetByDni(dni) {
          return $http.get('http://localhost:8080/customers/' + dni).then(handleSuccess, handleError('Error getting user by id'));
      }

      function Create(user) {
        var req = {
          method: 'POST',
          url: 'http://localhost:8080/customers',
          headers: {
            'Content-Type':'application/json'
          },
          data: JSON.stringify(user)
        };
        return $http(req).then(handleSuccess, handleError('Error creating user'));
      }

      function Update(user) {
        var req = {
          method: 'PUT',
          url: 'http://localhost:8080/customers',
          headers: {
            'Content-Type':'application/json'
          },
          data: JSON.stringify(user)
        };
        return $http(req).then(handleSuccess, handleError('Error updating user'));
      }

      function Delete(id) {
          return $http.delete('http://localhost:8080/customers/' + id).then(handleSuccess, handleError('Error deleting user'));
      }

      // private functions

      function handleSuccess(res) {
          return res.data;
      }

      function handleError(error) {
          return function () {
              return { success: false, message: error };
          };
      }
  }]);
