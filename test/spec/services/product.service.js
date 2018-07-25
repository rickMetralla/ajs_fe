'use strict';

describe('Service: product.service', function () {

  // load the service's module
  beforeEach(module('aPpApp'));

  // instantiate service
  var product.service;
  beforeEach(inject(function (_product.service_) {
    product.service = _product.service_;
  }));

  it('should do something', function () {
    expect(!!product.service).toBe(true);
  });

});
