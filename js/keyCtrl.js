/**
 * Created by pierremarot on 25/05/2014.
 */
var keyCtrl = function($scope,$state){
    $scope.handler = function(e){
        if(e.keyCode === 76 || e.charCode === 76){
            if($state.current.name.split("list").length > 1){
                $state.go("main");
            }else{
                $state.go("list.quest");
            }
        }
    }
};