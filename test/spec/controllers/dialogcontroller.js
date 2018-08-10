'use strict';

describe('Controller: DialogcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('aPpApp'));

  var DialogcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogcontrollerCtrl = $controller('DialogcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
