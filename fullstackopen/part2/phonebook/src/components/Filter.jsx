const Filter = (props) => {
  const {newSearch, handleSearchChange} = props;
  return (
    <>
      <input value={newSearch} 
        onChange={handleSearchChange} 
        placeholder='Pesquise na lista'></input>
    </>
  );
}

export default Filter