const PersonForm = (props) => {
  const {addName, newName, newPhone, handleNameChange, handlePhoneChange} = props;
  return (
    <form onSubmit={addName}>
        <h3>Add New Person</h3>
        <div>
          <input placeholder="Name"
           value={newName} onChange={handleNameChange}
           style={{width:'100%', marginBottom:'10px', padding: '6px 10px', boxSizing: 'border-box'}}/>
        </div>
        <div>
          <input placeholder="Phone" 
          value={newPhone} onChange={handlePhoneChange} 
          style={{width:'100%', marginBottom:'10px', padding: '6px 10px', boxSizing: 'border-box'}}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  );
}

export default PersonForm