// const { assert } = require('chai');
// const Trie = require('../lib/Trie.js');

// describe ('Trie', function () {
// 	const trie = new Trie()
// 	it('Exist it Shall', function() {

		
// 		assert.deepEqual()
// 	});
// 	it('Number of words it shall track', function() {


// 		assert.deepEqual()
// 	});

// 	it('store child nodes, it shall', function() {


// 		assert.deepEqual();
// 	});
// 	describe('Insert', () => {
// 		it('The method shall exist', () => {

// 		})

// 		it('Increment count for duplicate words, it shall not', () => {

// 		})

// 	it('should not create duplicate keys for words starting with same letter', function() {


// 		assert.deepEqual();
// 	})


// 	})
// })

import { expect } from "chai";
import Trie from '../lib/Trie';
import fs from 'fs';

describe('Trie', () => {
	let trie;
	
  beforeEach(() => {
		trie = new Trie();
	})

	it("should exist", () => {
		expect(trie).to.exist;
	});

	it("zero elements, it shall begin with", () => {
		expect(trie.length).to.equal(0);
	});

	describe.skip('insert', () => {

		it("insert a word, it shall", () => {
			trie.insert('me');
			expect(trie.root.child.m.child.e.letter).to.equal("e");
		});

		it("should be able to count one word", () => {
			trie.insert('benjuhmin');
			expect(trie.count()).to.equal(1);
		});

		it("should be able to count multiple words", () => {
			trie.insert('mike');
			expect(trie.count()).to.equal(1);
			trie.insert('sucks');
			expect(trie.count()).to.equal(2);
		});
		
		it("end of word it shall signify", () => {
			trie.insert('we');
			expect(trie.count()).to.equal(1);
			expect(trie.root.child.w.endOfWord).to.equal(null);
			expect(trie.root.child.w.child.e.endOfWord).to.equal(true);
		});
	})

	describe('suggest', () => {

		it("should be able to offer suggestions based on a word prefix", () => {
			trie.insert('paul');
			trie.insert('paulie');
			trie.insert('paulina');
			expect(trie.count()).to.equal(3);
			trie.suggest("pau");
			expect(trie.suggest("pau")).to.deep.equal(['paul', 'paulie', 'paulina']);
		});
	})

	describe.skip('count', () => {
		
		it('exists, the method shall', () => {
			expect(trie.count).to.exist;
		})

		it('number of words in the trie, it shall track', () => {
			const array = ['did', 'you', 'know', 'that', 'velcro', 'has']
			
			trie.populate(array)

			expect(trie.count()).to.equal(6)
		})
	})

	describe.skip('populate', () => {

		it('exists, the method shall', () => {
			expect(trie.populate).to.exist;
		})

		it('an array of words it shall accept', () => {
			const array = ['slammer', 'the', 'brogrammer', 'mashing', 'keys', 'like', 'a', 'sledehammer']
			
			trie.populate(array)

			expect(trie.count()).to.equal(8)
		})

		it('the dictionary of apple, it shall harness', () => {
			const text = "/usr/share/dict/words";
			const dictionary = fs.readFileSync(text).toString().trim().split('\n');
			
			trie.populate(dictionary);

			expect(trie.count()).to.equal(235886)
		})
	})
})