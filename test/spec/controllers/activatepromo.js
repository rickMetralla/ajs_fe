'use strict';

describe('Controller: ActivatepromoCtrl', function () {

  // load the controller's module
  beforeEach(module('aPpApp'));

  var ActivatepromoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivatepromoCtrl = $controller('ActivatepromoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActivatepromoCtrl.awesomeThings.length).toBe(3);
  });
});
