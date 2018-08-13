'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:ModelCtrl
 * @description
 * # ModelCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('modelCtrl', ['ProductService', '$uibModalInstance', "params", function (ProductService, $uibModalInstance, params) {
    var mc = this;
    mc.models = params.models;
    // mc.newModalFlag = false;
    mc.model = {};

    initModelDialog();

    function initModelDialog(){
      // console.log(mc.models);
      mc.model.name = '';
      mc.model.description = '';
      mc.model.chance = '';
      mc.newModalFlag = false;
      mc.editModalFlag = false;
    }

    mc.saveModel = function(model){
      ProductService.CreateNewModel(model).then(function(modelCreated){
        if(modelCreated.success === false){
          alert(modelCreated.message);
          return;
        }else{
          mc.models.push(modelCreated);
          initModelDialog();
        }
      });
    }

    mc.updateModel = function(updatedModel){
      ProductService.UpdateModel(updatedModel).then(function(modelUpdated){
        // console.log(modelUpdated);
        for (var i = 0; i < mc.models.length; i++) {
          if(mc.models[i].name === modelUpdated.name){
            mc.models[i].description = modelUpdated.description;
            mc.models[i].chance = modelUpdated.chance;
            initModelDialog();
            return;
          }
        }
      });
    }

    mc.closeSaveModel = function(){
      initModelDialog();
    }

    mc.deleteModel = function(modelName){
      if(confirm("Are you sure Delete  model " + modelName)){
        // console.log("delete " + modelName);
        ProductService.DeleteModel(modelName).then(function(res){
          if(res === 200){
            for (var i = 0; i < mc.models.length; i++) {
              if(mc.models[i].name === modelName){
                mc.models.splice(i, 1);
                return;
              }
            }
          }
        });
      } else {
        // console.log("don't delete " + modelName);
      }
    }

    mc.editModel = function(model){
      mc.newModalFlag = true;
      mc.editModalFlag = true;
      // console.log("should edit model:");
      // console.log(model);
      mc.model.name = model.name;
      mc.model.description = model.description;
      mc.model.chance = model.chance;
    }


    mc.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

    mc.addNewModel = function () {
      mc.newModalFlag = true;
    };

  }]);
