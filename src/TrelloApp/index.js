function TrelloApp(currentState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currentState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currentState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currentState, {
        currentBoard: Object.assign({}, currentState.currentBoard, {
          lists: [
            ...currentState.currentBoard.lists.slice(0, index),
            newList,
            ...currentState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      const name = action.payload;
      return Object.assign({}, currentState, {
        currentBoard: Object.assign({}, currentState.currentBoard, {
          name,
        })
      })
    case 'CREATE_LIST':
      const nlist = action.payload.newlist;
      const pos = action.payload.pos;
      const newState = { 
        ...currentState, 
        currentBoard: {
          ...currentState.currentBoard,
          lists: [
            ...currentState.currentBoard.lists.slice(0, pos),
            nlist,
            ...currentState.currentBoard.lists.slice(pos)
          ]
        }
      };
      console.log(currentState.currentBoard.lists);
      console.log(newState.currentBoard.lists);

      return { ...newState }
    case 'EDIT_LIST':
      const newName = action.payload.name;
      const neState = { 
        ...currentState, 
        currentBoard: {
          ...currentState.currentBoard,
          lists: [
            ...currentState.currentBoard.lists
          ]
        }
      };
      let e_l, e_l_idx;
      neState.currentBoard.lists.forEach( (element, idx) => {
        if(element.id === action.payload.id) {
          e_l = element;
          e_l_idx = idx;
        }
      });
      e_l.name = newName;
      neState.currentBoard.lists.splice(e_l_idx, 1, e_l);
      return neState;

    case 'MOVE_LIST':
      const item = currentState.currentBoard.lists[action.payload.fromPos];

      const mvList = [
        ...currentState.currentBoard.lists.slice(0, action.payload.fromPos),
        ...currentState.currentBoard.lists.slice(action.payload.fromPos+1)
      ];

      return {
        ...currentState,
        currentBoard: {
          ...currentState.currentBoard,
          lists:[
            ...mvList.slice(0, action.payload.toPos),
            item,
            ...mvList.slice(action.payload.toPos),
          ]
        }
      }


    case 'EDIT_CARD':
      const ecList = currentState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const ecCard = ecList.cards.find( card => card.id === action.payload.cardId);
      const ecIndex = currentState.currentBoard.lists.indexOf(ecList);
      const ecCardIdx = ecList.cards.indexOf(ecCard);

      return {
        ...currentState,
        currentBoard: {
          ...currentState.currentBoard,
          lists: [
            ...currentState.currentBoard.lists.slice(0, ecIndex),
            {
              ...ecList,
              cards: [
                ...ecList.cards.slice(0, ecCardIdx),
                {
                  ...ecCard,
                  text: action.payload.text
                },
                ...ecList.cards.slice(ecCardIdx+1)
              ]
            },
            ...currentState.currentBoard.lists.slice(ecIndex+1),
          ]
        }
      }

    case 'MOVE_CARD':
      const fromlist = currentState.currentBoard.lists.find( list => list.id === action.payload.fromListId);
      const fromlistIdx = currentState.currentBoard.lists.indexOf(fromlist);

      const card = fromlist.cards.find( card => card.id === action.payload.cardId );
      const cardidx = fromlist.cards.indexOf(card);
      
      const finFromList = {
        ...fromlist,
        cards: [
          ...fromlist.cards.slice(0, cardidx),
          ...fromlist.cards.slice(cardidx + 1)
        ]
      };

      const tolist = currentState.currentBoard.lists.find( list => list.id === action.payload.toListId);
      const tolistIdx = currentState.currentBoard.lists.indexOf(tolist);

      const finToList = {
        ...tolist,
        cards: [
          ...tolist.cards,
          card
        ]
      }
      let mcLists;
      if(fromlistIdx < tolistIdx) {
        mcLists = [
          ...currentState.currentBoard.lists.slice(0, fromlistIdx),
          finFromList,
          ...currentState.currentBoard.lists.slice(fromlistIdx + 1, tolistIdx),
          finToList,
          ...currentState.currentBoard.lists.slice(tolistIdx + 1)
        ];
      } else if(fromlistIdx < tolistIdx) {
        mcLists = [
          ...currentState.currentBoard.lists.slice(0, tolistIdx),
          finToList,
          ...currentState.currentBoard.lists.slice(tolistIdx + 1, fromlistIdx),
          finFromList,
          ...currentState.currentBoard.lists.slice(fromlistIdx + 1)
        ];
      }

      return {
        ...currentState,
        currentBoard: {
          ...currentState.currentBoard,
          lists: [
            ...mcLists
          ]
        }
      }
    case 'SET_CURRENT_BOARD':
      return Object.assign({}, {
        currentBoard: action.payload
      });
    case 'SET_BOARDS_LIST':
      console.log('new Boards List:', action.payload);
      return Object.assign({}, {
        boardsList: action.payload
      });  
      
    default:
      return currentState;
  }
}

module.exports = TrelloApp;