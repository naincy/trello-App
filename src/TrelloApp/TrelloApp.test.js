const { createStore } = require('redux');
const TrelloApp = require('./');
const should = require('chai').should();

describe('TrelloApp', function() {
  it('should ADD_CARD', function() {
    const currState = {
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [{
          id: '11',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '12',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    }

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '11',
        text: 'ghi'
      }
    };

    const store = createStore(TrelloApp, currState);
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal('ghi');
  });

  describe('EDIT_BOARD', function() {
    let store, currState;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };
      const action = {
        type: 'EDIT_BOARD',
        payload: 'New Board Name'
      }
      store = createStore(TrelloApp, currState);
      store.dispatch(action);
    });
    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property name', function() {
      store.getState().currentBoard.should.have.property('name');
    })
    it('name should be "New Board Name"', function() {
      store.getState().currentBoard.name.should.equal('New Board Name');
    })
    it('should not change Lists', function() {
      store.getState().currentBoard.should.have.property('lists');
      store.getState().currentBoard.lists.should.deep.equal(currState.currentBoard.lists);
    })
  });

  describe('CREATE_LIST', function() {
    let store, currState, newlist;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name',
            cards: []
          }]
        }
      };
      newlist = {
        id: '444',
        name: 'new list',
        cards: [],
      };
      const action = {
        type: 'CREATE_LIST',
        payload: {
          newlist,
          pos: 1,
      }
    };
      store = createStore(TrelloApp, {...currState});
      store.dispatch(action);
    });
    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property lists', function() {
      store.getState().currentBoard.should.have.property('lists');
    })
    it('Lists count should increase by 1', function() {
      store.getState().currentBoard.lists.length.should.equal(currState.currentBoard.lists.length + 1);
    })
    it('should have new list at pos 1', function() {
      store.getState().currentBoard.lists[1].should.deep.equal(newlist);
    })
  });

  describe('EDIT_LIST', function() {
    let store, currState;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '12',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };
      
      const action = {
        type: 'EDIT_LIST',
        payload: {
          name: "New Name",
          id: '12',
      }
    };
      store = createStore(TrelloApp, {...currState});
      store.dispatch(action);
    });
    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property lists', function() {
      store.getState().currentBoard.should.have.property('lists');
    })
    it('lists should have a list with id 12 ', function() {
      let id = false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '12') {
          id = true;
        }
      });
      id.should.equal(true);
    });
    it('name of list with id 12 should be "New Name"', function() {
      let cl;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '12') {
          cl = list;
        }
      });
      cl.name.should.equal('New Name');
    })
  });

  describe('MOVE_LIST', function() {
    let store, currState, newlists;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };
      
      const action = {
        type: 'MOVE_LIST',
        payload: {
          fromPos: 0,
          toPos: 1,
        }
      };

      newlists= [{
        id: '112',
        name: 'Some List Name 1',
        cards: []
      },
      {
        id: '111',
        name: 'Some List Name',
        cards: [{
          id: 'abc',
          text: 'def'
        }, {
          id: 'abc1',
          text: 'def1'
        }]
      }]
      store = createStore(TrelloApp, {...currState});
      store.dispatch(action);
    });
    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property lists', function() {
      store.getState().currentBoard.should.have.property('lists');
    })
    it('list item position should be as expected list', function() {
      store.getState().currentBoard.lists.should.deep.equal(newlists);
    })
  })

  describe('EDIT_CARD', function() {
    let store, currState;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };
      
      const action = {
        type: 'EDIT_CARD',
        payload: {
          cardId:'abc',
          listId:'111',
          text: 'Text Input'
        }
      };

      store = createStore(TrelloApp, {...currState});
      store.dispatch(action);
    });
    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property lists', function() {
      store.getState().currentBoard.should.have.property('lists');
    })
    it('lists should have a list with id 111 ', function() {
      let id = false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '111') {
          id = true;
        }
      });
      id.should.equal(true);
    });
    it('list with id 111 should have card with ID abc', function() {
      let id = false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '111') {
          list.cards.forEach(card => {
            if(card.id==='abc'){
              id = true;
            }
          })
        }
      });
      id.should.equal(true);
    });

    it('card with ID abc should have name "New Text"', function() {
      let name = '';
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '111') {
          list.cards.forEach(card => {
            if(card.id==='abc'){
              name = card.text;
            }
          })
        }
      });
      name.should.equal('Text Input');
    });
  })

  describe('MOVE_CARD', function(){
    let store, currState;
    before(function() {
      currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };
      
      const action = {
        type: 'MOVE_CARD',
        payload: {
          cardId:'abc',
          fromListId:'111',
          toListId:'112',
        }
      };

      store = createStore(TrelloApp, {...currState});
      store.dispatch(action);
    });

    it('should have property currentBoard', function() {
      store.getState().should.have.property('currentBoard');
    })
    it('currentBoard should have property lists', function() {
      store.getState().currentBoard.should.have.property('lists');
    })
    it('lists should have a list with id 111 & 112 ', function() {
      let id = false, hasSecondId=false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '111') {
          id = true;
        }
        if( list.id === '112') {
          hasSecondId = true;
        }
      });
      id.should.equal(true);
      hasSecondId.should.equal(true);
    });

    it('list with id 112 should have card with ID abc', function() {
      let id = false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '112') {
          list.cards.forEach(card => {
            if(card.id==='abc'){
              id = true;
            }
          })
        }
      });
      id.should.equal(true);
    });

    it('list with id 111 should not have card with ID abc', function() {
      let id = false;
      store.getState().currentBoard.lists.forEach(list => {
        if(list.id === '111') {
          list.cards.forEach(card => {
            if(card.id==='abc'){
              id = true;
            }
          })
        }
      });
      id.should.equal(false);
    });

  })
});