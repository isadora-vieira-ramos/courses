
const Part = ({part}) =>{
    return(
        <div key={part.id}>
            <p>{part.name} {part.exercises}</p>
        </div>
    );
}

export default Part;