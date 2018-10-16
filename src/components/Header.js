import React, { Component } from 'react';
import listOfTitles from '../data/titleData';
import slugify from '../utils/slugify';
import charGenerator from '../utils/charGenerator';
import idGenerator from '../utils/charGenerator';
import isDuplicateTitle from '../utils/duplicateTitleCheck.js';
import { TextField } from './helpers/TextField';
import pencil from '../assets/pencil.svg';
import checkmark from '../assets/checkmark.svg';
import x from '../assets/x.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      currentTitle: '',
      currentSlug: '',
      currentId: '',
      userIsEditing: false,
      list: []
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
  }

  componentDidMount() {

    this.fetchTitles(); // mimic backend service call

    this.hydrateStateWithLocalStorage(); 

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
    
  }

  componentWillUnmount() {
    // remove event listener when user leaves/refreshes the page
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage(); // saves state before component unmounts
  }

  // simulate API fetch from server
  fetchTitles() {
    this.setState({ list: listOfTitles });
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in the current application state.
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  toggleEditing() {
    this.setState(
      (state, props) => ({ userIsEditing: !state.userIsEditing })
    );
  }

  updateInput(key, value) {
    this.setState({ [key]: value }); // update onchange input state
  }

  keyPress(e, id) {
    if (e.key === 'Enter') { // handle the enter key
      this.saveTitle(id);
    }
  }

  saveTitle(id) {

    // if id already exists, edit it.
    if (id.length) {
      let titleCopy = this.state.newTitle.slice(), // copy title 
          slugCopy = slugify(titleCopy); // slugify that title

      const list = [...this.state.list]; // copy current list of items

      // find the matching index using id, then update the matching object.
      var index = list.findIndex(title => title.id === id);

      // if title is a duplicate, add 5 char generator to slug
      if ( isDuplicateTitle(list, titleCopy).length ) {
        list[index].title = titleCopy;
        list[index].slug = slugCopy + '-' + charGenerator();
      } else {
        list[index].title = titleCopy;
        list[index].slug = slugCopy;
      }

      console.warn(`New edited list`, list);

      // update the state with the changes
      this.setState((state, props) => ({
        list,
        newTitle: '',
        userIsEditing: !state.userIsEditing,
        currentTitle: list[index].title,
        currentSlug: list[index].slug,
        currentId: list[index].id
      }));
    } 
    // Create a new title
    else {

      let titleCopy = this.state.newTitle.slice(); // copy new title from state
      const list = [...this.state.list]; // copy current list of items

      let newTitleObj;

      // if title is a duplicate, add 5 char generator to slug
      if ( isDuplicateTitle(list, titleCopy).length ) {
        newTitleObj = {
          id: idGenerator(),
          slug: slugify(titleCopy) + '-' + charGenerator(),
          title: titleCopy,
        };
      } else {
        // otherwise just slugify
        newTitleObj = {
          id: idGenerator(),
          slug: slugify(titleCopy),
          title: titleCopy,
        };
      }

      // add the new title object to the current list
      list.push(newTitleObj);

      // update the state with the changes
      this.setState((state, props) => ({
        list,
        newTitle: '',
        userIsEditing: !state.userIsEditing,
        currentTitle: list[list.length - 1].title,
        currentSlug: list[list.length - 1].slug,
        currentId: list[list.length - 1].id
      }));
    }
  }

  deleteItem(id) { // this is something extra in case we need to delete from db.
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted, return updated list
    const updatedList = list.filter(item => item.id !== id);
    let nextTitleObj = updatedList[updatedList.length - 1];
    
    // update the state with the changes
    this.setState((state, props) => ({
      list: updatedList,
      newTitle: '',
      currentTitle: nextTitleObj.title,
      currentSlug: nextTitleObj.slug,
      currentId: nextTitleObj.id
    }));
  }

  render() {
    const { 
      newTitle,
      currentTitle,
      currentSlug,
      currentId,
      userIsEditing 
    } = this.state;

    let headerContent;

    if (userIsEditing) {
      headerContent = (
        <div className="bottom edit-mode">
          <div>
            <img
              onClick={ this.toggleEditing }
              src={ x } className="icon x" alt="x icon" 
            />
            { newTitle.length
              ? (<img
                  onClick={ () => this.saveTitle(currentId) }
                  src={ checkmark } alt="checkmark icon"
                  className="icon checkmark"
                />)
              : (<img src={ checkmark } className="icon checkmark grey" alt="checkmark icon" />)
            }
          </div>
          <div className="input-wrapper">
            <input
              type='text'
              placeholder={ currentTitle }
              value={ newTitle }
              className="Copernicus-font header-text edit-mode"
              onKeyPress={ e => this.keyPress(e, currentId) }
              onChange={
                e => this.updateInput('newTitle', e.target.value) 
              }
            />
            <p className="marginBottomNone"> 
              <span className="grey-B2B2B2">slug:</span>{' '}
              { newTitle.length
                  ? (<span className="grey-666666">
                      { slugify (newTitle) }
                    </span>)
                  : currentSlug.length
                    ? currentSlug
                    : <i> please enter a post title</i>
              }
            </p>
          </div>
        </div>    
      );
    } else {
      headerContent = (
        <div className="bottom edit-mode" onClick={ this.toggleEditing }>
          <img src={ pencil } className="icon pencil" alt="pencil icon" />
          <TextField
            className="Copernicus-font header-text"
            highlightText="highlight padding2"
            text={ currentTitle || 'Click to edit title' }
          />
        </div>
      );
    }

    return (
      <div className='Header'>
        { headerContent }
      </div>
    );
  }
}

export default Header;