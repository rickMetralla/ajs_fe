'use strict';

/**
 * @ngdoc service
 * @name aPpApp.product.service
 * @description
 * # product.service
 * Factory in the aPpApp.
 */
angular.module('aPpApp')
  .factory('ProductService', ['$http', function ($http) {

    var service = {};

    service.GetAll = GetAll;
    service.GetAllModels = GetAllModels;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAllModels() {
      // return $http.get('http://localhost:8080/pmodels').then(handleSuccess, handleError('Error getting product by id'));
      return $http.get('http://localhost:8080/pmodels').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }

      });
    }

    function GetAll() {
      var req = {
        method: 'GET',
        url: 'http://localhost:8080/products/',
        headers: {
          'Content-Type':'application/json'
        }
      }
      return $http(req).then(handleSuccess, handleError('Error getting all products'));
    }

    function GetById(id) {
      return $http.get('http://localhost:8080/product/' + id).then(handleSuccess, handleError('Error getting product by id'));
    }

    function Create(product) {
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/product/',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(product)
      }
      // console.log(req.data);
      return $http(req).then(handleSuccess, handleError('Error creating product'));
    }

    function Update(product) {
      var req = {
        method: 'PUT',
        url: 'http://localhost:8080/product/',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(product)
      }
      return $http(req).then(handleSuccess, handleError('Error updating product'));
    }

    function Delete(id) {
        return $http.delete('http://localhost:8080/product/' + id).then(handleSuccess, handleError('Error deleting product'));
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
