// The filter() method returns a new array created from all elements that pass a certain test preformed on an original array.
// This helper returns an empty array if no duplicates are found.
// If a duplicate title exists, it will return the duplicate title's object in an array.

const isDuplicateTitle = (list, title) => {
  return list.filter(item => item.title === title);
}

export default isDuplicateTitle;