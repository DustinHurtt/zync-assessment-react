import React from "react";
import { useState } from "react";  

const Tags = (props) => {

    const [tag, setTag] = useState("")

    const handleTagChange = (e) => {
        setTag(e.target.value);
      };

    const addNewTag = (e, key) => {
        const index = props.students.findIndex((student) => student.id === key);

        if (index !== -1) {
          const thisStudent = [...props.students];
          thisStudent[index] = {
            ...thisStudent[index],
            tags: [...thisStudent[index].tags, e],
          };
          props.setStudents(thisStudent);
        }
      };

    return (

        <div>
        <div>
          <p>
            {props.student.tags.map((tag, i) => (
              <button
                className="tagButton"
                key={i}
                onClick={() => props.setTagSearch(tag)}
              >
                <span>{tag}</span>
              </button>
            ))}
          </p>
        </div>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTag(tag, props.student.id);
              setTag("");
              e.target.reset();
            }}
            key={props.student.id}
          >
            <input
              className="input"
              onChange={handleTagChange}
              type="text"
              name="tag"
              placeholder="Add a Tag"
              key={props.student.id}
              value={props.student.tag}
            ></input>
          </form>
        </div>
      </div>

    )

}

export default Tags