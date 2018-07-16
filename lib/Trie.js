import Node from './node.js';

export default class Trie {
  constructor() {
    this.root = new Node(null);
    this.wordCount = 0;
  }

  insert(string) {
    let stringToArray = [...string];
    let currentNode = this.root;

    stringToArray.forEach((letter, i, arr) => {
      if (!currentNode.child[letter]) {
        currentNode.child[letter] = new Node(letter);
      } 
      currentNode = currentNode.child[letter];
      if (i === arr.length - 1 && !currentNode.endOfWord) {
        currentNode.endOfWord = string;
        this.wordCount++;
      }
    });
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let currentNode = this.root;
    let arr = [];

    for (let i = 0; i < word.length; i++) {
      if (currentNode.child[word[i]]) {
        currentNode = currentNode.child[word[i]];
      }
    }
    this.find(currentNode, arr);
    return arr;
  } 
 
  find(node, arr) {		
    if (node.endOfWord) {
      arr.push(node.endOfWord);
    }
    for (let children in node.child) {
      this.find(node.child[children], arr);
    }
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word.toLowerCase());
    });
  }
}