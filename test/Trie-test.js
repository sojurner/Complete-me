import { expect } from "chai";
import Trie from '../lib/Trie';
import fs from 'fs';

describe('Trie', () => {
  let trie;
  
  beforeEach(() => {
    trie = new Trie();
  })

  it('exist it shall', () => {
    expect(trie).to.exist;
  })

  it('a root it shall have', () => {
    expect(trie.root).to.exist
  })

  it('zero elements, it shall begin with', () => {
    expect(trie.wordCount).to.equal(0);
  })

  describe('Insert', () => {

    it('exists, the method shall', () => {
      expect(trie.insert).to.exist;
    })

    it('insert a word, it shall', () => {
    
      trie.insert('me');

      expect(trie.root.child.m.letter).to.equal('m');
      expect(trie.root.child.m.child.e.letter).to.equal('e');
    });
    
    it('end of word it shall signify', () => {
      
      trie.insert('we');

      expect(trie.count()).to.equal(1);
      expect(trie.root.child.w.endOfWord).to.equal(null);
      expect(trie.root.child.w.child.e.endOfWord).to.equal('we');
    })
  });

  describe('Count', () => {
    
    it('exists, the method shall', () => {
      expect(trie.count).to.exist;
    })

    it('should be able to count multiple words', () => {
      
      trie.insert('mike');

      expect(trie.count()).to.equal(1);

      trie.insert('and');

      expect(trie.count()).to.equal(2);

      trie.insert('benjuhmin');

      expect(trie.count()).to.equal(3);

      trie.insert('suck')

      expect(trie.count()).to.equal(4);
    })

    it('duplicate words, it shall not count', function() {
      
      expect(trie.count()).to.equal(0);
      
      trie.insert('pizza');
      
      expect(trie.count()).to.equal(1);
      
      trie.insert('pizza');

      expect(trie.count()).to.equal(1);
    })

    it('number of words in the trie, it shall track', () => { 
      const array = ['did', 'you', 'know', 'that', 'velcro', 'has']
      
      trie.populate(array)

      expect(trie.count()).to.equal(6)
    })
  });

  describe('Suggest and Find', () => {

    it('exists, the method shall', () => {
      expect(trie.suggest).to.exist;
    })

    it('exists, the method shall', () => {
      expect(trie.find).to.exist;
    })

    it('offer suggestions from word prefix, it shall', () => {
      
      trie.insert('paul');
      trie.insert('paulie');
      trie.insert('paulina');

      expect(trie.count()).to.equal(3);
      expect(trie.suggest('pau')).to.deep.equal(['paul', 'paulie', 'paulina']);

      trie.insert('to')
      trie.insert('tim');
      trie.insert('tommy');
      trie.insert('tommay');

      expect(trie.count()).to.equal(7);
      expect(trie.suggest('to')).to.deep.equal(['to', 'tommy', 'tommay']);
    })
  });

  describe('Populate', () => {

    it('exists, the method shall', () => {
      expect(trie.populate).to.exist;
    })

    it('an array of words it shall accept', () => {
      const array = ['slammer', 'the', 'brogrammer', 'mashing', 'keys', 'like', 'a', 'sledgehammer']
      
      trie.populate(array)

      expect(trie.count()).to.equal(8)
    })

    it('the dictionary of apple, it shall harness', () => {
      const text = '/usr/share/dict/words';
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');
      
      trie.populate(dictionary);

      expect(trie.count()).to.equal(234371)

      trie.suggest('ridiculous')
      
      expect(trie.suggest('ridiculous')).to.deep.equal(['ridiculous', 'ridiculously', 'ridiculousness']);
    })
  })

  describe('Delete', () =>{

    it('shall delete a word from the trie and decrement word count', () => {
      
      trie.insert('stars')
      trie.insert('star')
      trie.insert('starstruck')
      trie.delete('stars')
      
      expect(trie.suggest('sta')).to.deep.equal(['star', 'starstruck'])
      expect(trie.count()).to.deep.equal(2)
    })
  })
})