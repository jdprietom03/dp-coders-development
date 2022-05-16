import Line from "../../icons/Line";

const getDifficulty = (difficulty: string) => {
    
    switch (parseInt(difficulty)) {
        case 1:
            return "Easy";
        case 2:
            return "Medium";
        case 3:
            return "Hard";
        default:
            return "Unknown";
    }
};

const ProblemSetTable:React.FC<{ problems?: any }> = ({ problems }) => {
  return (
    <div className="problem-set">
      <div className="categories"></div>
      <div className="filter">
        <div className="filter-group"></div>
      </div>
      <div className="problem-set-table">
        <div className="table-header">
          <div className="header-col s-col1">
            <div className="title">Status</div>
          </div>
          <div className="header-col s-col2 filterable">
            <div className="title">Title</div>
            <span className="action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M18.695 9.378L12.83 3.769a1.137 1.137 0 00-.06-.054c-.489-.404-1.249-.377-1.7.06L5.303 9.381a.51.51 0 00-.16.366c0 .297.27.539.602.539h12.512a.64.64 0 00.411-.146.501.501 0 00.028-.762zM12.77 20.285c.021-.017.042-.035.062-.054l5.863-5.609a.5.5 0 00-.028-.762.64.64 0 00-.41-.146H5.743c-.332 0-.601.242-.601.54a.51.51 0 00.16.365l5.769 5.606c.45.437 1.21.464 1.698.06z"></path>
              </svg>
            </span>
          </div>
          <div className="header-col s-col1 filterable">
            <div className="title">Acceptance</div>
            <span className="action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M18.695 9.378L12.83 3.769a1.137 1.137 0 00-.06-.054c-.489-.404-1.249-.377-1.7.06L5.303 9.381a.51.51 0 00-.16.366c0 .297.27.539.602.539h12.512a.64.64 0 00.411-.146.501.501 0 00.028-.762zM12.77 20.285c.021-.017.042-.035.062-.054l5.863-5.609a.5.5 0 00-.028-.762.64.64 0 00-.41-.146H5.743c-.332 0-.601.242-.601.54a.51.51 0 00.16.365l5.769 5.606c.45.437 1.21.464 1.698.06z"></path>
              </svg>
            </span>
          </div>
          <div className="header-col s-col1 filterable">
            <div className="title">Difficulty</div>
            <span className="action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M18.695 9.378L12.83 3.769a1.137 1.137 0 00-.06-.054c-.489-.404-1.249-.377-1.7.06L5.303 9.381a.51.51 0 00-.16.366c0 .297.27.539.602.539h12.512a.64.64 0 00.411-.146.501.501 0 00.028-.762zM12.77 20.285c.021-.017.042-.035.062-.054l5.863-5.609a.5.5 0 00-.028-.762.64.64 0 00-.41-.146H5.743c-.332 0-.601.242-.601.54a.51.51 0 00.16.365l5.769 5.606c.45.437 1.21.464 1.698.06z"></path>
              </svg>
            </span>
          </div>
          <div className="header-col s-col1 filterable">
            <div className="title">Recommended</div>
            <span className="action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M18.695 9.378L12.83 3.769a1.137 1.137 0 00-.06-.054c-.489-.404-1.249-.377-1.7.06L5.303 9.381a.51.51 0 00-.16.366c0 .297.27.539.602.539h12.512a.64.64 0 00.411-.146.501.501 0 00.028-.762zM12.77 20.285c.021-.017.042-.035.062-.054l5.863-5.609a.5.5 0 00-.028-.762.64.64 0 00-.41-.146H5.743c-.332 0-.601.242-.601.54a.51.51 0 00.16.365l5.769 5.606c.45.437 1.21.464 1.698.06z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="table-body">
          {
            problems && problems.map((problem: any, index: number) => {
                const { problem_id, title, difficulty } = problem;
                return (
                    <div className="row" key={problem_id}>
                        <div className="col status noattempt" style={{ width: "44.94px" }}>
                            <Line />
                        </div>
                        <div className="col title" style={{ width: "303.84px" }}>
                            <a href={`/problem/${problem_id}`}>{problem_id} {title}</a>
                        </div>
                        <div className="col" style={{ width: "109.98px" }}> 55.86 %</div>
                        <div className={`col difficulty_${difficulty}`} style={{ width: "86.96px" }}>{getDifficulty(difficulty)}</div>
                        <div className="col" style={{ width: "133.94px" }}>Yes</div>
                    </div>
                )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ProblemSetTable;