'use strict';

/**
 * @ngdoc service
 * @name aPpApp.draw.service
 * @description
 * # draw.service
 * Factory in the aPpApp.
 */
angular.module('aPpApp')
  .factory('DrawService', ['$http', function ($http) {
    var service = {};

    service.createPromotionSeason = createPromotionSeason;
    service.updatePromotionSeason = updatePromotionSeason;
    service.deletePromoById = deletePromoById;
    service.getSeasons = getSeasons;
    service.getSeason = getSeason;
    service.activatePromo = activatePromo;
    service.inactivatePromo = inactivatePromo;
    service.completePromo = completePromo;
    service.getAvailablesCustomersBeforeActivate = getAvailablesCustomersBeforeActivate;
    service.getAvailablesCustomersAfterActivate = getAvailablesCustomersAfterActivate;
    service.makeDrawPrizeProcess = makeDrawPrizeProcess;
    service.getPromoStatus = getPromoStatus;
    service.getPromoStatusById = getPromoStatusById;
    service.getPrizeDrawByPromoId = getPrizeDrawByPromoId;
    service.getPrizeByPromoId = getPrizeByPromoId;
    service.getAllPrize = getAllPrize;
    service.getRankPrizes = getRankPrizes;
    service.registerPrize = registerPrize;
    service.getAllWinnersByPromoId = getAllWinnersByPromoId;

    function createPromotionSeason(promo){
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/promos',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(promo)
      };
      return $http(req).then(handleSuccess, handleError('Error creating promotion season'));
    }

    function updatePromotionSeason(promoToUpdate){
      var req = {
        method: 'PUT',
        url: 'http://localhost:8080/promos',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(promoToUpdate)
      };
      return $http(req).then(handleSuccess, handleError('Error updating promotion season'));
    }

    function deletePromoById(id){
      return $http.delete('http://localhost:8080/promos/' + id).then(function(result){
        return result.status;
      }, handleError('Error deleting promotion season by id: ' + id));
    }

    function getSeasons(){
      return $http.get('http://localhost:8080/promos').then(function(response){
        if(response.status !== 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function getSeason(id){
      return $http.get('http://localhost:8080/promos/' + id).then(function(response){
        if(response.status !== 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function activatePromo(id){
      return $http.put('http://localhost:8080/promos/'+ id +'/activate')
        .then(handleSuccess, handleError("error while activating a promotion"));
    }

    function inactivatePromo(id){
      return $http.put('http://localhost:8080/promos/'+ id +'/inactive')
        .then(handleSuccess, handleError("error while inactivating a promotion"));
    }

    function completePromo(id){
      return $http.put('http://localhost:8080/promos/'+ id +'/complete')
        .then(handleSuccess, handleError("error while completing a promotion"));
    }

    function getAvailablesCustomersBeforeActivate(idPromo){
      return $http.get('http://localhost:8080/promos/'+ idPromo + '/customers')
        .then(handleSuccess, handleError("error while getting availables customer before active promo"));
    }

    function getAvailablesCustomersAfterActivate(idPromo){
      return $http.get('http://localhost:8080/promos/'+ idPromo + '/active/customers')
        .then(handleSuccess, handleError("error while getting availables customer after active promo"));
    }

    function makeDrawPrizeProcess(idPromo){
      return $http.post('http://localhost:8080/promos/' + idPromo + '/drawprizes')
        .then(handleSuccess, handleError('Error doing draw of prizes'));
    }

    function getPromoStatusById(idPromo){
      return $http.get('http://localhost:8080/promos/status/'+ idPromo)
        .then(handleSuccess, handleError("error while getting promo status by promo id"));
    }

    function getPromoStatus(idPromo){
      return $http.get('http://localhost:8080/promos/status/')
        .then(handleSuccess, handleError("error while getting promo status"));
    }

    function getPrizeDrawByPromoId(promoId){
      return $http.get('http://localhost:8080/promos/' + promoId + '/vouchers')
        .then(handleSuccess, handleError("error while getting the prizeDraws"));
    }

    function getPrizeByPromoId(promoId){
      return $http.get('http://localhost:8080/prizes/' + promoId)
        .then(handleSuccess, handleError("error while getting prizes by promo id"));
    }

    function getAllPrize(){
      return $http.get('http://localhost:8080/prizes')
        .then(handleSuccess, handleError("error while getting all prizes"));
    }

    function getRankPrizes(){
      return $http.get('http://localhost:8080/prizes/ranks')
        .then(handleSuccess, handleError("error while getting all rank prizes"));
    }

    function registerPrize(prize){
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/prizes',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(prize)
      };
      return $http(req).then(handleSuccess, handleError('Error creating prize'));
    }

    function getAllWinnersByPromoId(promoId, winner){
      return $http.get('http://localhost:8080/promos/' + promoId + '/vouchers/' + winner)
        .then(handleSuccess, handleError("error while getting all winners by promo id"));
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

    return service;
  }]);
