'use strict';

describe('Controller: DrawCtrl', function () {

  // load the controller's module
  beforeEach(module('aPpApp'));

  var DrawCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrawCtrl = $controller('DrawCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DrawCtrl.awesomeThings.length).toBe(3);
  });
});
