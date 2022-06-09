import React from "react";
import { useState } from "react";
import axios from "axios"
import useCollapse from 'react-collapsed';
import SearchBars from "../components/SearchBars";
import StudentInfo from "../components/StudentInfo";
import Average from "../components/Average";
import Tags from "../components/Tags"


function Students() {

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [tagSearch, setTagSearch] = useState("")
  const [ isExpanded, setExpanded ] = useState(false);
  const { getCollapseProps } = useCollapse({ isExpanded });
  const [open, setOpen] = useState([])


  React.useEffect(() => {
    getStudents()
      }, []);


  let getStudents = () => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((results) => {
          setStudents(results.data.students);
          results.data.students.forEach((student) => (student.tags = []));
        })

      .catch((err) => console.log(err.message));
    };
    
    
  const wholeName = (student) => {
      return student.firstName + " " + student.lastName 
    }
  
  
  const tags = (student) => {
      return student.tags
    }
  
    
  const filtered = !search && !tagSearch
      ? students
      : students.filter((student) =>
          wholeName(student).toLowerCase().includes(search.toLowerCase()) && tags(student).join(" ").toLowerCase().includes(tagSearch.toLowerCase()));


  const toggleOpen= (id) => {
    if (!open.includes(id)) {
        let newOpen = [...open].concat(id)
         setOpen(newOpen)
         handleOnClick()
     
    } else {
        setOpen(open.filter(studenId => studenId !== id))
        handleOnClick()
    }
  }


  let handleOnClick= () => {  
      setExpanded(!isExpanded);
  }
    

  return (


  <div className="studentsList">

    <div className="scroll">
    
      <SearchBars search={search}  tagSearch={tagSearch} setSearch={setSearch} setTagSearch={setTagSearch} />


    {filtered.map((student) => {
        return (
          <div className="cardContainer" key={student.id}>
            <div className="studentCard">
              <div className="card">
                <div>
                  <div
                    className="studentImg"
                    style={{ backgroundImage: `url(${student.pic})` }}
                  ></div>
                </div>

                <div className="studentInfo">
                  <StudentInfo student={student} />

                  <Average student={student} getCollapseProps={getCollapseProps} open={open}/>

                  <Tags students={students} setStudents={setStudents} student={student} setTagSearch={setTagSearch}/>

                </div>
              </div>

              <button className="expand" onClick={() => toggleOpen(student.id)}>
                {open.includes(student.id) ? "-" : "+"}
              </button>
            </div>

            <hr
              style={{
                color: "gray",
                width: "100%",
                border: "none",
                borderBottom: "1px solid",
              }}
            />
          </div>
        );
      })}


    </div>



  </div>

  );
}

export default Students;