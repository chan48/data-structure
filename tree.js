var queue = require('./queue.js');
var stack = require('./stack.js');

var tree = function(){
	this.root = null;
}

var NODE = function(element,parent){
	this.data = element;
	this.left = null;
	this.right = null;
}

tree.prototype.add = function(element,node){
	//루트 부터 시작
	var node = node||this.root;

	//루트가 null, 즉 트리가 비어있을 경우
	if(this.root == null){
		this.root = new NODE(element);
	}

	//루트가 비어있지 않을 경우
	else{
		if(element<node.data){
			if(node.left == null){
				node.left = new NODE(element);
			}
			else{
				this.add(element,node.left);
			}
		}
		else if(element>=node.data){
			if(node.right == null){
				node.right = new NODE(element);
			}
			else{
				this.add(element,node.right);

			}
		}
	}

	console.log("-------------------------------------------------------------");
	console.log("insert ",element);
	console.log("-------------------------------------------------------------");
	this.print();
}

tree.prototype.del = function(element,node){
	node = node||this.root;
	// console.log(target);
	console.log("-------------------------------------------------------------");
	console.log("del "+element);
	console.log("-------------------------------------------------------------");

	target = null;
	parent = null;
	selected_node = null;
    

	var S = new stack();
    this.search2(S,element);
    // S.print();
    target = S.pop();
    parent == null;
    if(!S.isEmpty()){
	    parent = S.pop();
    }

	this.renewDH(target);

	left_parent = target;
	left_node = target.left;
	if(left_node){
		while(left_node.right){
			left_node = left_node.right;
		}
	}

	right_parent = target;
	right_node = target.right;
	if(right_node){
		while(right_node.left){
			right_parent = right_node;
			right_node = right_node.left;

		}
	}

	left_depth = left_node==null?0:left_node.depth;
	right_depth = right_node==null?0:right_node.depth;



	if(target.height == 1){
		if(parent == null){
			this.root = null;
		}
		else if(parent.left == target){
			parent.left = null;
		}
		else{
			parent.right = null;
		}	
	}
	else if(left_depth>right_depth){
		selected_node = left_node;
		selected_parent = left_parent;
		if(left_depth == 1){
			selected_node.right = target.right;
			if(parent == null){
				this.root = selected_node;
			}
			else if(parent.left == target){
				parent.left = selected_node;
			}
			else{
				parent.right = selected_node;				
			}
		}
		else if(left_depth >= 2){
			selected_parent.right = selected_node.left;
			selected_node.left = target.left;
			selected_node.right = target.right;
			if(parent == null){
				this.root  = selected_node;
			}
			else if(parent.left == target){
				parent.left = selected_node;
			}
			else{
				parent.right = selected_node;				
			}
		}
	}

	else if(left_depth<=right_depth){
		selected_node = right_node;
		selected_parent = right_parent;
		if(right_depth == 1){
			selected_node.left = target.left;
			if(parent == null){
				this.root = selected_node;
			}
			else if(parent.left == target){
				parent.left = selected_node;
			}
			else{
				parent.right = selected_node;				
			}
		}
		else if(right_depth >= 2){
			selected_parent.left = selected_node.right;
			selected_node.left = target.left;
			selected_node.right = target.right;
			if(parent == null){
				this.root  = selected_node;
			}
			else if(parent.left == target){
				parent.left = selected_node;
			}
			else{
				parent.right = selected_node;				
			}
		}
	}

    this.print();

}

tree.prototype.search = function(element, node){
	var node = node||this.root;

	target = null;
	if(node.data == element){
		target = node;
	}
	else if(element < node.data){
		target = this.search(element,node.left);
	}
	else{
		target = this.search(element,node.right);
	}

	return target;

}


tree.prototype.search2 = function(stack,element,node){
	var node = node||this.root;
	stack.push(node);

	if(node.data == element){
	}
	else if(element < node.data){
		this.search2(stack,element,node.left);
	}
	else{
		this.search2(stack,element,node.right);
	}
}


tree.prototype.setDepth = function(node,depth){
	var node = node||this.root;
	var depth = depth||0;
	node.depth = depth;


	if(node.right != null){
		this.setDepth(node.right,depth+1);
	}
	if(node.left != null){
		this.setDepth(node.left,depth+1);
	}
	// console.log("data : "+node.data+", depth : "+node.depth);

	return node.depth;
}

	// S = new stack();
tree.prototype.setHeight = function(node,stact){
	//출력과 삭제 연산 시 사용

	var node = node||this.root;
	//javascript scope 특성 때문에 stack을 사용하여 해당 노드의 높이를 계산
	var S = stact||(new stack());

	if(node.left != null){
		S.push(this.setHeight(node.left,S));
	}
	else{
		S.push(0);
	}
	// node_right = 0;
	if(node.right != null){
		S.push(this.setHeight(node.right,S));
	}
	else{
		S.push(0);
	}

	height = 0;

	node_right = S.pop();
	node_left = S.pop();
	if(node_left>=node_right){
		height = node_left+1;
	}
	else if(node_left < node_right){
		height = node_right+1;
	}

	node.height = height;

	if(node.depth == 0){
		S= null;
	}
	return height;

}

tree.prototype.renewDH = function(node){
	this.setDepth(node);
	this.setHeight(node);
}

tree.prototype.toArray = function(){
	//height 초기화
	this.renewDH();

	//전위 순회를 통한 부모노드 부터 출력
	//root를 시작으로 queue에서 뽑아내어 자식노드를 다시 queue에 넣는다.
	//반복하여 모든 노드를 가져온다.
	var tmp = new queue();
	//위의 모든 과정을 누적하여 기록한다. null일경우에는 '-'로 표시한다.
	var node_list = new queue();

	//단말 노드를 제외한 모든 노드를 순회
	//->단말노드의 부모 노드의 연산 = 단말노드 기록
	var times = Math.pow(2,this.root.height-1)-1;
	if(this.root != null){
		tmp.enqueue(this.root);
		node_list.enqueue(this.root.data);
	}
//	console.log("times",times);

	while(times--){

		node = tmp.dequeue();

		if(node == null){
			tmp.enqueue(null);
			tmp.enqueue(null);
			node_list.enqueue("-");
			node_list.enqueue("-");
		}
		else{
			if(node.left != null){
				tmp.enqueue(node.left);
				node_list.enqueue(node.left.data);
			}
			else{
				tmp.enqueue(null);
				node_list.enqueue("-");			
			}


			if(node.right != null){
				tmp.enqueue(node.right);
				node_list.enqueue(node.right.data);
			}
			else{
				tmp.enqueue(null)
				node_list.enqueue("-");			
			}			
		}
	}
	//node_list.showAllElement();
	return node_list.toArray();
}

tree.prototype.print = function(){

// line = 4
//라인별 반복횟수 및 간격 패턴
// times = 2,4,8,16
// inv = 8,4,2,1

	this.renewDH();
	arr = this.toArray();
	height = this.root.height;


	index = 0;
	times = 1;


	for(i = 0;i<height;i++){
		str = '';
		times *= 2;
		inv = Math.pow(2,height)/times;

		if(i){

			for(j = 0,s = 0;j<times;j++){
				if(j%2){
					if(s%2){
						str+="＼";
					}
					else{
						str+="/";
					}
					s++;
				}
				for(k = 0;k<inv;k++){
					str += '\t';
				}
			}
			console.log(str);
		}
		str = '';
		for(j = 0;j<times;j++){
			if(j%2){
				str+=arr[index++];
			}
			for(k = 0;k<inv;k++){
				str += '\t';
			}
		}

		console.log(str);

	}

}
var T = new tree();
T.add(7);
T.add(4);
T.add(3);
// T.add(1);
// T.add(5);
T.add(8);
T.add(9);
// T.add(6);
T.add(4.5);
T.add(7.8);
// T.add(7.9);

T.del(7);
T.del(8);
T.del(4);
T.del(4.5);
T.del(3);

