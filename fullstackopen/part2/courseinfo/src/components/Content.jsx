import { useState } from "react";
import Part from "./Part";

const Content = ({parts}) =>{

    const totalExercises = (parts.reduce((n, {exercises}) => n + exercises, 0));

    return(
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part}></Part>
            )}
            <Exercises total={totalExercises}></Exercises>
        </div>
    );
}


const Exercises = ({total}) =>{
    return (
        <h4>Total of {total} exercises</h4>
    );
}

export default Content;