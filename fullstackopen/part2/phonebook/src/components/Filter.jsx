const Filter = (props) => {
  const {newSearch, handleSearchChange} = props;
  return (
    <>
      <input value={newSearch} 
        style={{width:'100%', padding: '6px 10px', boxSizing: 'border-box'}}
        onChange={handleSearchChange} 
        placeholder='Search on list'></input>
    </>
  );
}

export default Filter