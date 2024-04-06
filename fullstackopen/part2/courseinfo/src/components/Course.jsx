import Content from './Content';
import Header from './Header'

const Course = ({course}) =>{
    return(
        <div>
           <Header name={course.name}></Header> 
           <Content parts={course.parts}></Content>
        </div>
    );
}

export default Course;