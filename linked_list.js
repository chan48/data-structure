var linkedList = function(){
	this.length = 0;
	this.headNode = new node(null);
}


var node = function(element){
	this.data = element;
	this.next = null;
}

linkedList.prototype.add = function(element,position){
	
	//position이 null일 경우 마지막위치로
	var position = position==undefined?this.length+1:position;
	
	//입력값으로 node 생성

	var newNode = new node(element);

	var preNode = this.headNode;
	for(i = 1;i<position;i++){
		preNode = preNode.next;
	}
	newNode.next = preNode==null?null:preNode.next;
	preNode.next = newNode;

	this.length++;

	console.log("-------------------------------------------");
	console.log("add",element);
	console.log("position",position);
	console.log("-------------------------------------------");
	this.print();
}

linkedList.prototype.remove = function(position){

	var ret = null;
	var position = position==undefined?0:position;
	if(this.isEmpty()){
		console.log("list is Empty");
	}
	else if(position<this.length){
		var preNode = this.headNode;

		for(i = 0;i<position;i++){
			preNode = preNode.next;
		}
		ret = preNode.next.data;
		preNode.next = preNode.next.next;
		
		this.length--;
	}
	else{
		console.log("index error");
	}

	console.log("-------------------------------------------");
	console.log("position",position);
	console.log("remove",ret);
	console.log("-------------------------------------------");
	this.print();
	return ret;
}


linkedList.prototype.peek = function(position){

	var ret = null;
	var position = position==undefined?0:position;
	if(this.isEmpty()){
		console.log("list is Empty");
	}
	else if(position<this.length){
		var preNode = this.headNode;

		for(i = 0;i<position;i++){
			preNode = preNode.next;
		}
		ret = preNode.next.data;

	}
	else{
		console.log("index error");
	}

	return ret;
}

linkedList.prototype.print = function(position){
	var str = "linkedList : ";
	var node = this.headNode.next;
	while(node != null){
		str += node.data;
		str += " -> ";
		node = node.next;
	};
	console.log(str);
}


linkedList.prototype.isEmpty = function(){
	var ret = false;
	if(!this.length){
		ret = true;
	}

	return ret;
}

list = new linkedList();

list.add(1);

list.add(2);

list.add(3);

list.add(3,1);

list.add(1);

list.remove();
list.remove(3);