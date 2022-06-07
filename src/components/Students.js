import React from "react";
import axios from "axios"
import useCollapse from 'react-collapsed';


function Students() {

  const [students, setStudents] = React.useState([])
  const [search, setSearch] = React.useState("")
  const [ isExpanded, setExpanded ] = React.useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [open, setOpen] = React.useState([])

  const toggleOpen= (id) => {
    if (open.includes(id)) {
     setOpen(open.filter(sid => sid !== id))
    } else {
     let newOpen = [...open]
     newOpen.push(id)
     console.log("id", id)
     setOpen(newOpen)
     console.log("set", setOpen)
     console.log("new", newOpen)
     console.log("open", open)
    }
  }


  React.useEffect(() => {
    getStudents()
      }, []);

//   let handleOnClick= () => {
//       setExpanded(!isExpanded);
//       console.log("expanded", isExpanded)
//   }
    
  let getStudents = () => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((results) => {setStudents(results.data.students) 
        console.log(results.data)})

      .catch((err) => console.log(err.message));
                }  

  let average = (numbers) => {
    return numbers.reduce((x,y) => Number(x)+Number(y))/numbers.length
  }

  let uppercase = (word) => {
    return word.toUpperCase()
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const wholeName = (student) => {
    return student.firstName + " " + student.lastName
  }

  const filtered = !search
    ? students
    : students.filter((student) =>
        wholeName(student).toLowerCase().includes(search.toLowerCase())
      );


  return (


  <div className="studentsList">

    <div className="scroll">

      <input type="text" placeholder="Search by Name" value={search} onChange={handleSearchChange} />

    {filtered.map((student) => {
        return (
          <div className="cardContainer" key={student.id}>
            <div className="studentCard">
              <div
                className="studentImg"
                style={{ backgroundImage: `url(${student.pic})` }}
              ></div>

              <div className="studentInfo">
                <h3>
                  {uppercase(student.firstName)} {uppercase(student.lastName)}
                </h3>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>Average: {average(student.grades)}%</p>

                <div className={!student.isExpanded ? "expanded" : "collapsed"}>
                  <p id="detail">asdlkjasdlkj</p>
                </div>
              </div>

              {/* <button
                className="expand_btn"
                onClick={() => handleOnClick()}
                id="expand_btn"
              >
                +
              </button> */}

              <button className="expand-btn" onClick={() => toggleOpen(student.id)}>{open.includes(student.id) ? '-' : '+'}</button>
            </div>

            <div className="collapsible">
              <div {...getCollapseProps()}>
                <div className="content">
                    {/* {student.grades.map((grade, i) =>{
                        return (
                            <div>
                                <p>Test{i+1}: &nbsp;&nbsp; {grade}%</p>
                            </div>
                        )
                    })} */}

                    {open.includes(student.id) ? 
                        (
                            <div className="grades-list">
                            {student.grades.map((grade, i) => {return (<div><p key={grade.id}>Test {i + 1}: {grade}%</p></div> )})}
                            </div>) 

                        : null}
                        
                </div>
              </div>
            </div>

            <hr />
          </div>
        );
      })}


    </div>



  </div>

  );
}

export default Students;