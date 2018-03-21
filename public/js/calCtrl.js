

var myCal = angular.module("myCal",[]);
myCal.controller("calCtrl", function($scope){
	$scope.displayTotal= "";
	$scope.num ="";
	$scope.newNum="";
	$scope.operator='';

	$scope.addOperator=function(operator){
		
		if($scope.num != "" && $scope.displayTotal != "Error"){
			$scope.operator = operator;
			$scope.newNum = $scope.num;
			$scope.num = "";	
			$scope.displayTotal= "0";
		}

	}

	$scope.equal = function(){
		if($scope.num == "")
		{
			return;
		}

		if($scope.operator=='+'){$scope.num = parseFloat((parseFloat($scope.newNum,10) + parseFloat($scope.num,10)).toFixed(2))}
		else if($scope.operator=='-'){$scope.num = parseFloat((parseFloat($scope.newNum,10) - parseFloat($scope.num,10)).toFixed(2))}
		else if($scope.operator=='*'){$scope.num = parseFloat((parseFloat($scope.newNum,10) * parseFloat($scope.num,10)).toFixed(2))}
		else if($scope.operator=='/'){$scope.num = parseFloat((parseFloat($scope.newNum,10) / parseFloat($scope.num,10)).toFixed(2))}
		
		if($scope.num.toString().length >15){
			$scope.displayTotal = "Error";
		}
		else{
			$scope.displayTotal = $scope.num;
			$scope.newNum = $scope.num;
		
		}
		
		$scope.operator='';

	}


	$scope.number = function(num){
		if(($scope.num == "" && num == "0")){
			return;
		}
		if(typeof $scope.num !=="string"){$scope.num =""}
		$scope.num += num;
		if($scope.num.toString().length>15){
			$scope.displayTotal = "Error"
		}
		else{
			$scope.displayTotal = $scope.num;
		}
	};


	$scope.clear = function(){
		$scope.num = "";
		$scope.displayTotal="";
	};


	$scope.keydown = function(event){
		if(event.keyCode == 96){
			$scope.number(0);
		}
		if(event.keyCode == 97){
			$scope.number(1);
		}
		if(event.keyCode == 98){
			$scope.number(2);
		}
		if(event.keyCode == 99){
			$scope.number(3);
		}
		if(event.keyCode == 100){
			$scope.number(4);
		}
		if(event.keyCode == 101){
			$scope.number(5);
		}
		if(event.keyCode == 102){
			$scope.number(6);
		}

		if(event.keyCode == 103){
			$scope.number(7);
		}

		if(event.keyCode == 104){
			$scope.number(8);
		}

		if(event.keyCode == 105){
			$scope.number(9);
		}

		if(event.keyCode == 67){
			$scope.clear();
		}

		if(event.keyCode == 13){
			$scope.equal();
		}
		if(event.keyCode == 106){
			$scope.addOperator('*')
		}
		if(event.keyCode == 109){
			$scope.addOperator('-')
		}
		if(event.keyCode == 107){
			$scope.addOperator('+')
		}
		if(event.keyCode == 111){
			$scope.addOperator('/')
		}
	}
	
})




var todo = angular.module("todo",[]);
todo.controller("todoCtrl",function($scope){
	//$scope.items=["a","b","c"]

	$scope.items=[
	{title:"Complete my angular app", done:false},
	{title:"Learn how to use heroku", done:false},
	{title:"Grocery shop", done:false},
	{title:"Exercise for 30 mins", done:false},
	]

	$scope.error = "";
	
	$scope.addItem = function(){
		if(!$scope.item){return;}

		if($scope.items.findIndex(function(item){ return item.title == $scope.item}) != -1){
			$scope.error = "Item exits"
			return;
		}

		$scope.items.push({title:$scope.item,done:false})
		$scope.item ="";



	}

	$scope.clearCompleted = function(){
		$scope.items = $scope.items.filter(function(item){
			return !item.done
		})

	}

})





angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById("calApp"), ["myCal"]);
  
});   