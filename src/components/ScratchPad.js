import React, { useState } from "react";

const data = [
  {
    id: 1,
    firstName: "Mickey",
    lastName: "Mouse",
    tags: [{ id: 1, label: "mouse" }]
  },
  {
    id: 2,
    firstName: "Donald",
    lastName: "Duck",
    tags: [{ id: 1, label: "duck" }]
  },
  {
    id: 3,
    firstName: "Minnie",
    lastName: "Mouse",
    tags: [
      { id: 1, label: "mouse" },
      { id: 2, label: "cool" }
    ]
  }
];

const StudentsContainer = ({ students = data }) => {
  const [searchByTagsValue, setSearchByTagsValue] = useState("");
  const [localStudents, setLocalStudents] = useState(students);

  const onSubmitTag = (label, id) => {
    const index = localStudents.findIndex((student) => student.id === id);
    if (index !== -1) {
      const newStudents = [...localStudents];
      newStudents[index] = {
        ...newStudents[index],
        tags: [...newStudents[index].tags, { id: Date.now(), label }]
      };
      setLocalStudents(newStudents);
    }
  };

  return (
    <>
      <input
        value={searchByTagsValue}
        placeholder="Search by tag"
        onChange={(e) => setSearchByTagsValue(e.target.value)}
      />
      {localStudents.length &&
        localStudents
          .filter((student) =>
            shouldStudentDisplay(student.tags, searchByTagsValue)
          )
          .map((student) => (
            <Student
              key={student.id}
              student={student}
              onSubmitTag={onSubmitTag}
            />
          ))}
    </>
  );
};

const Student = ({ student, style, onSubmitTag }) => (
  <div style={style}>
    <h5>
      {student.firstName} {student.lastName}
    </h5>
    <Tags
      tags={student.tags}
      onSubmitTag={onSubmitTag}
      studentId={student.id}
    />
    <hr />
  </div>
);

const Tags = ({ tags, onSubmitTag, studentId }) => {
  const [newTagLabel, setNewTagLabel] = useState("");
  return (
    <>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.label}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitTag(newTagLabel, studentId);
          setNewTagLabel("");
        }}
      >
        <input
          placeholder="Add tag"
          value={newTagLabel}
          onChange={(e) => setNewTagLabel(e.target.value)}
        />
      </form>
    </>
  );
};

const shouldStudentDisplay = (tags, searchByTagsValue) => {
  if (!searchByTagsValue) {
    return true;
  }
  return tags.findIndex(({ label }) => label === searchByTagsValue) !== -1;
};

export default StudentsContainer;
