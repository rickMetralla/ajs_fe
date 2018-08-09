'use strict';

/**
 * @ngdoc overview
 * @name aPpApp
 * @description
 * # aPpApp
 *
 * Main module of the application.
 */
angular
  .module('aPpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'reg'
      })
      .when('/draw', {
        templateUrl: 'views/draw.html',
        controller: 'DrawCtrl',
        controllerAs: 'dc'
      })
      .when('/products', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'pc'
      })
      .when('/purchase', {
        templateUrl: 'views/purchase.html',
        controller: 'PurchaseCtrl',
        controllerAs: 'purc'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
