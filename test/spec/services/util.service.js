'use strict';

describe('Service: util.service', function () {

  // load the service's module
  beforeEach(module('aPpApp'));

  // instantiate service
  var util.service;
  beforeEach(inject(function (_util.service_) {
    util.service = _util.service_;
  }));

  it('should do something', function () {
    expect(!!util.service).toBe(true);
  });

});
