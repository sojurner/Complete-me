// const Trie = require('./lib/Trie.js');
import Trie from './Trie';

// import fs from 'fs';


let trie = new Trie();

const searchBox = document.querySelector('.search-box')
const suggestions = document.querySelector('.suggestion-list')
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

window.onload = function() {
  console.log('ds')
  trie.populate(dictionary)
};

searchBox.addEventListener('input', searchWord)

function searchWord () {
	let searchedWord = searchBox.value
	let suggestList = trie.suggest(searchedWord)
	for(let i = 0; i < suggestList.length; i++) {  
		if(suggestList[i] !== undefined){
		suggestions.prepend(
			`<div class='suggested'>${suggestList[i]}</div>`
		)
		}
	}
}

// module.exports = Trie;