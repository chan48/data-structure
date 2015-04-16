
var queue = function(){
	this.datas = [];
}

queue.prototype.isEmpty = function(){
		return this.datas.length==0?true:false;
}
queue.prototype.length = function(){
	return this.datas.length;
}
queue.prototype.enqueue = function(element){
	this.datas.push(element);
	console.log("-------------------------------------------------------------");
	console.log("enqueue ",element);
	console.log("-------------------------------------------------------------");
	this.print();

}
queue.prototype.dequeue = function(){
	element = this.peek();
	this.datas.shift();
	console.log("-------------------------------------------------------------");
	console.log("dequeue, return ",element);
	console.log("-------------------------------------------------------------");
	this.print();
	return element;
}
queue.prototype.peek = function(){
	element = this.datas[0]==undefined?null:this.datas[0];
	return element;
}
queue.prototype.toArray = function(){
	return this.datas;
}
queue.prototype.print = function(){
	console.log(this.datas);
}

queue.prototype.delAll = function(){
	this.dats = [];
}

Q = new queue();

Q.enqueue(5);
Q.enqueue(3);
Q.dequeue();
Q.enqueue(8);
Q.enqueue(7);
Q.dequeue();
Q.enqueue(9);
Q.enqueue(10);
Q.dequeue();

module.exports = queue;