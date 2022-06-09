import React from "react";  

const StudentInfo = (props) => {

    let uppercase = (word) => {
        return word.toUpperCase()
      }

    return (
      <div>
        <h1 className="headline">
          {uppercase(props.student.firstName)} {uppercase(props.student.lastName)}
        </h1>
        <p>Email: {props.student.email}</p>
        <p>Company: {props.student.company}</p>
        <p>Skill: {props.student.skill}</p>
      </div>
    );

}

export default StudentInfo