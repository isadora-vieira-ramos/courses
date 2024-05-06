const Person = (props) => {
  const {person, deletePhone} = props;
  return (
    <>
      <p key={person.id}>{person.name} - {person.number} <button onClick={deletePhone}>Delete</button></p>
    </>
  );
}

export default Person