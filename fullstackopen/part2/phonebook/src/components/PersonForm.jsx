const PersonForm = (props) => {
  const {addName, newName, newPhone, handleNameChange, handlePhoneChange} = props;
  return (
    <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  );
}

export default PersonForm