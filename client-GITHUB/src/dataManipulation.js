//filters through the fetchedList, and returns the users whose name starts with the input string that the client put in the search bar; happens every time a character is added or deleted from the input bar
export const filterByInput = (fetchedList, inputSearch, searchCategory) => {
    //to call item.firstName where firstName is stored as a string, need to do [firstName], which is equivalent to the .firstName notation!!! item[something] where something is a string is equialent to item.something!!
    const filteredList = fetchedList.filter(item => item[searchCategory].toLowerCase().slice(0,inputSearch.length) === inputSearch.toLowerCase());

    return filteredList;
}