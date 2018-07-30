'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:DrawCtrl
 * @description
 * # DrawCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('DrawCtrl', ['PurchaseService', 'UtilService', 'DrawService', 'UserService',
  function (PurchaseService, UtilService, DrawService, UserService) {

    initController();

    function initController() {
      loadLotteries();
      getActiveLottery();
    }

    var dr = this;
    dr.create = false;
    dr.activeLottery = {};
    dr.lotteryToPost = {};
    dr.newLottery = {};
    dr.lotteries = [];
    dr.getActiveLottery = getActiveLottery;
    dr.createSeasonLottery = createSeasonLottery;
    dr.loadLotteries = loadLotteries;
    dr.cancel = cancel;
    dr.openCreateOption = openCreateOption;
    dr.drawPrizeLottery = drawPrizeLottery;
    dr.draw = false;
    dr.availableCustomers = [];
    dr.makeDrawPrize = makeDrawPrize;
    dr.winners = [];
    dr.getWinners = [];
    dr.complete = complete;

    function openCreateOption(){
      dr.create = true;
    }
    function cancel(){
      dr.create = false;
    }

    function createSeasonLottery(lot){
      if(lot === undefined){
        alert('Lottery form needs correct values.');
        return;
      }
      if(!(lot.end >= lot.start)){
        console.log(lot);
        alert('Dates needs correction.');
        return;
      }
      dr.lotteryToPost.season = lot.season;
      dr.lotteryToPost.description = lot.description;
      dr.lotteryToPost.startAt = UtilService.fixDate(lot.start);
      dr.lotteryToPost.endAt = UtilService.fixDate(lot.end);
      dr.lotteryToPost.active = false;
      DrawService.createSeasonLottery(dr.lotteryToPost).then(function(response){
        dr.create = false;
        loadLotteries();
      });
    }

    function loadLotteries(){
      DrawService.getSeasons().then(function(lotteries){
        dr.lotteries = lotteries;
      });
    }

    function getActiveLottery(){
      DrawService.getActiveSeason().then(function(activeLot){
        // console.log(activeLot);
        dr.activeLottery = activeLot;
      });
    }

    function drawPrizeLottery(lottery){
      dr.draw = true;
      loadAvailableCustomers(lottery);
      // loadWinners();
    }

    function loadAvailableCustomers(lottery){
      PurchaseService.GetAllPurchaser().then(function(purchasers){
        // dr.availableCustomers = purchasers;
        for (var i = 0; i < purchasers.length; i++) {
          if(validateCustomer(purchasers[i], lottery)){
            dr.availableCustomers.push(purchasers[i]);
            // console.log("add avail");
            // console.log(purchasers[i]);
          }
        }
      });
    }

    function validateCustomer(customer, lottery){
      let startDate = UtilService.convertToDate(lottery.startAt);
      let endDate = UtilService.convertToDate(lottery.endAt);
      for (var i = 0; i < customer.customerOrders.length; i++) {
        let current = UtilService.convertToDate(customer.customerOrders[i].purchasedAt);
        if(current > startDate && current < endDate){
          // for (var i = 0; i < dr.getWinners.length; i++) {
          //   if(customer.custDni !== dr.getWinners[i].custDni){
          //     return true;
          //   }
          // }
          return true;
        }
      }
      return false;
    }

    // function loadWinners(){
    //   DrawService.getWinners().then(function(response){
    //     dr.getWinners = response;
    //   });
    // }

    function makeDrawPrize(customers){
      // console.log(customers);
      DrawService.makeDrawPrizeProcess(customers).then(function(winner){
        dr.winners.push(winner);
        // console.log("make draw");
        // console.log(dr.winners);
        saveWinner(winner);
      });
    }

    function saveWinner(winner){
      let win = {};
      win.custDni = winner.dni;
      win.lotteryId = dr.activeLottery.id;

      for (var i = 0; i < dr.availableCustomers.length; i++) {
        if(dr.availableCustomers[i].custDni === win.custDni){
          dr.availableCustomers.splice(i, 1);
        }
      }

      // DrawService.setWinner(win).then(function(response){
      //   for (var i = 0; i < dr.availableCustomers.length; i++) {
      //     if(dr.availableCustomers[i].custDni === win.custDni){
      //       dr.availableCustomers.splice(i, 1);
      //     }
      //   }
      // });
    }

    function complete(){
      dr.draw = false;
    }

  }]);
