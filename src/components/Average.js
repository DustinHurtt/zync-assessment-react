import React from "react"; 


const Average = (props) => {



    let average = (numbers) => {
        return numbers.reduce((x,y) => Number(x)+Number(y))/numbers.length
      }

    return (
      <div>
        <p>Average: {average(props.student.grades)}%</p>

        <div className="collapsible">
          <div {...props.getCollapseProps()}>
            <div className="content">
              {props.open.includes(props.student.id) ? (
                <div className="grades-list">
                  {props.student.grades.map((grade, i) => {
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
      </div>
    );

}

export default Average