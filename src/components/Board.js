import React, { Component } from 'react';
import CardList from './CardList';

const data = [
  {
    id: 0,
    title: 'Product Backlog',
    cards: [
      { id: 0, description: 'This is my first card...', tags: ['Priority: Low', 'Front-end'] },
      { id: 1, description: 'This is a test', tags: ['Priority: Low'] },
      { id: 2, description: 'This is a test', tags: null },
    ]
  },
  {
    id: 1,
    title: 'Work In Progress',
    cards: [
      { id: 0, description: 'A card for my second list', tags: ['Priority: Low', 'Front-end'] },
      { id: 1, description: 'Another one!', tags: ['Priority: Medium', 'API', 'Database'] }
    ]
  },
  {
    id: 2,
    title: 'Done',
    cards: [
      { id: 0, description: 'A card for my third list', tags: ['Priority: High', 'Payment', 'API'] },
      { id: 1, description: 'Another one!', tags: null }
    ]
  },
];

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      nextCardIndex: -1,
      nextListIndex: -1
    };

    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
  }

  componentWillMount() {
    // Compute next index
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].cards.length;
    }
    // Init state with data
    this.setState({ 
      lists: data, 
      nextCardIndex: sum + 1,
      nextListIndex: data.length + 1
    });
  }

  handleAddList() {
    let lists = [...this.state.lists];
    lists.push({
      id: this.state.nextListIndex,
      title: 'New list',
      cards: []
    });
    this.setState({ lists, nextListIndex: this.state.nextListIndex + 1 });
  }

  handleRemoveList(listId) {
    let lists = [...this.state.lists];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === listId) {
        lists.splice(i, 1);
        this.setState({ lists });
        return;
      }
    }
  }

  handleAddCard(listId) {
    let lists = [...this.state.lists];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === listId) {
        lists[i].cards.push({
          id: this.state.nextCardIndex,
          description: 'New card'
        });
        this.setState({ lists, nextCardIndex: this.state.nextCardIndex + 1 });
        return;
      }
    }
  }

  handleRemoveCard(listId, cardId) {
    let lists = [...this.state.lists];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === listId) {
        for (let j = 0; j < lists[i].cards.length; j++) {
          if (lists[i].cards[j].id === cardId) {
            lists[i].cards.splice(j, 1);
            this.setState({ lists });
            return;
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="board">
        <ol className="board-lists">
          {
            this.state.lists.map(list => (
              <li key={list.id}>
                <CardList 
                  data={list}
                  onAddCard={this.handleAddCard}
                  onRemoveCard={this.handleRemoveCard}
                  onRemoveList={this.handleRemoveList}
                />
              </li>
            ))
          }
          <li>
            <button 
              className="board-button"
              onClick={this.handleAddList}
            >
              + Add a list
            </button>
          </li>
        </ol>
      </div>
    );
  }
};

export default Board;
