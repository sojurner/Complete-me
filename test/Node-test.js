import { expect } from 'chai';
import Node from '../lib/node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('p');
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('accept and assign a letter to the letter property, it shall', () => {
    expect(node.letter).to.equal('p');
  })

  it('endOfWord property shall be set to null', () => {
    expect(node.endOfWord).to.equal(null);
  })

  it('an empty object the default child property it shall be', () => {
    expect(node.child).to.deep.equal({});
  })
});