var stack = function(){
	this.datas = [];
}


stack.prototype.isEmpty = function(){
		return this.datas.length==0?true:false;
}
stack.prototype.length = function(){
	return this.datas.length;
}
stack.prototype.push = function(element){

	this.datas.push(element);
	console.log("-------------------------------------------------------------");
	console.log("push ",element);
	console.log("-------------------------------------------------------------");
	this.print();

}
stack.prototype.pop = function(){
	element = this.peek();
	this.datas.pop();
	console.log("-------------------------------------------------------------");
	console.log("pop!");
	console.log("return",element);
	console.log("-------------------------------------------------------------");
	this.print();
	return element;
}
stack.prototype.peek = function(){
	element = this.datas[this.datas.length-1]==undefined?null:this.datas[this.datas.length-1];
	return element;
}
stack.prototype.toArray = function(){
	return this.datas;
}
stack.prototype.print = function(){
	var tmp = this.datas;
	for(i=tmp.length-1;0<=i;i--){
		console.log("│ "+this.datas[i]+" │");
	}
	console.log("└---┘");
}

stack.prototype.delAll = function(){
	this.datas = [];
}

S = new stack();

S.push(3);
S.push(5);
S.push(1);
S.push(6);

S.pop();

S.pop();

S.push(9);
S.push(8);

module.exports = stack;