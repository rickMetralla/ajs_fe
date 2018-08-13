'use strict';

describe('Controller: PromodetailCtrl', function () {

  // load the controller's module
  beforeEach(module('aPpApp'));

  var PromodetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromodetailCtrl = $controller('PromodetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PromodetailCtrl.awesomeThings.length).toBe(3);
  });
});
