const Node = require('./Node.js');

import fs from 'fs';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

module.exports = class Trie {
  constructor() {
		this.root = new Node(null)
		this.count = 0;
	}

	insert(word) {
		let node = this.root
		for(let i = 0; i< word.length; i++){
			let currentLetter = word[i]
			if(node.children[currentletter]) {
				node = node.children[currentLetter]
			} else {
				let newNode = new Node(currentLetter);
				node.children[currentLetter] = newNode
				node = newNode;
			}
		}
		node.endOfString = true
		this.count ++
	}

	find(word){
		let node = this.root;
		for(let i = 0; i < word.length; i++) {
			let currentLetter = word[i];
			if(node.children[currentLetter]){
				node = node.children[currentLetter]
			}	else {
				return false;
			}
		}
		return true;
	}

	populate(words) {
		words.forEach(word => {this.insert(word)});
	}
}
