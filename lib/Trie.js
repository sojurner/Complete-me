import Node from './node.js'

export default class Trie {
  constructor() {
    this.length = 0;
    this.wordCount = 0;
    this.root = new Node(null);
  }

  insert(string) {
    let stringToArray = string.toLowerCase().split('');
    let currentNode = this.root;

    stringToArray.forEach((letter, index, array) => {
      if (!currentNode.child[letter]) {
        currentNode.child[letter] = new Node(letter)
      } 
      currentNode = currentNode.child[letter]
      if (index === array.length -1) {
        currentNode.endOfWord = true;
			}
		});
		this.wordCount++
	}

  count() {
    return this.wordCount;
  }

	suggest(word) {
		let currentNode = this.root;
		let array = [];

		for(let i = 0; i < word.length; i++) {
			let currentLetter = word[i];

			if(currentNode.child[currentLetter]){
				currentNode = currentNode.child[currentLetter];
			}	else {
				return ;
			}
		}
		this.find(currentNode, array)
		return array
	}

	find(node, arr) {		
		if (node.endOfWord) {
			arr.unshift(this.getWord());
		}
		for (let childs in node.child) {
			this.find(node.child[childs], arr);
		}
	}

	getWord() {
		let arrayOutput = [];
		let node = this.root

		while (node.endOfWord !== true) {
			arrayOutput.unshift(node.letter);
			node = Object.keys(node).find(key => node[key] === node.letter)
		}
		return arrayOutput.join('');
	};

	populate(dictionary) {
		dictionary.forEach(word => {
			this.insert(word.toLowerCase())
	});
	}
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}