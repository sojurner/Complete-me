module.exports = class Node {
  constructor(letter = '') {
		this.value = letter 
		this.children = {}
		this.endOfString = false;
  }
}