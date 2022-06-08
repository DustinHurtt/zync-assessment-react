import React from "react";
import { useState } from "react";
import axios from "axios"
import useCollapse from 'react-collapsed';


function Students() {

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [tagSearch, setTagSearch] = useState("")
  const [ isExpanded, setExpanded ] = useState(false);
  const { getCollapseProps } = useCollapse({ isExpanded });
  const [open, setOpen] = useState([])
  const [tag, setTag] = useState("")

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

  React.useEffect(() => {
    getStudents()
      }, []);

  let handleOnClick= () => {
      
      setExpanded(!isExpanded);
  }
    
  let getStudents = () => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((results) => {setStudents(results.data.students)
        results.data.students.forEach((student) => student.tags = [])
        })

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

  const tagSearchChange = (e) => {
    setTagSearch(e.target.value);
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

  
  const handleTagChange = (e) => {
    setTag(e.target.value);
  };


  const addNewTag = (e, key) => {

    const index = students.findIndex((student) => student.id === key);

    if (index !== -1) {
      const newStudents = [...students];
      newStudents[index] = {
        ...newStudents[index],
        tags: [...newStudents[index].tags,  e ]
      };
      setStudents(newStudents);
    } 
  
  }

  return (


  <div className="studentsList">

    <div className="scroll">

      <input name="search" type="text" placeholder="Search by Name" value={search} onChange={handleSearchChange} />
      <input name="tags" type="text" placeholder="Search by Tag" value={tagSearch} onChange={tagSearchChange} />

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
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewTag(tag, student.id);
                      setTag("");
                      e.target.reset();
                    }}
                    key={student.id}
                  >
                    <input
                      onChange={handleTagChange}
                      type="text"
                      name="tag"
                      placeholder="Add a Tag"
                      key={student.id}
                      value={student.tag}
                    ></input>
                  </form>
                </div>

              </div>

              <button
                className="expand-btn"
                onClick={() => toggleOpen(student.id)}>
                {open.includes(student.id) ? "-" : "+"}
              </button>
            </div>

            <div className="collapsible">
              <div {...getCollapseProps()}>
                <div className="content">

                  {open.includes(student.id) ? (
                    <div className="grades-list">

                      {student.grades.map((grade, i) => {
                        return (
                          <div>
                            <p key={grade.id}>
                              Test {i + 1}: &nbsp;&nbsp; {grade}%
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            
            <div>
              <p>
                {student.tags.map((tag, i) => (
                  <button key={i} onClick={()=>setTagSearch(tag)}><span>{tag}</span></button>

                ))}
              </p>
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