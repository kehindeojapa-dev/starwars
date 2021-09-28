import { useState, useEffect, useRef, useReducer } from "react";
import { reducer } from "./reducer";

function Characters({ charactersData }) {
  //State for characters detail
  const [actors, setActors] = useState([]);
  const [sortHeight, setSortHeight] = useState(false);
  const [sortName, setSortName] = useState(false);

  //Data for state management
  const charactersDetail = {
    actors: actors,
    filteredData: actors,
  };
  const [state, dispatch] = useReducer(reducer, charactersDetail);

  // Reference to access selection choice
  const genderType = useRef(null);
  // function to carry out gender filter
  const showGender = (e) => {
    e.preventDefault();
    const genderID = genderType.current.options.selectedIndex;
    dispatch({
      type: "GENDER_FILTER",
      value: genderID,
    });
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //Get all actors detail
    if (actors?.length === 0) {
      for (let i = 0; i < charactersData.length; i++) {
        fetch(`${charactersData[i]}`)
          .then((res) => res.json())
          .then(
            (result) => {
              let holder = result;
              actors?.push(holder);
              if (actors?.length === charactersData.length) {
                setIsLoaded(true);
              }
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      }
    }
  }, [actors, charactersData]);

  let height = [];
  state.actors?.map((actor) => height.push(Number(actor.height)));
  const heightTotal = height.reduce((a, b) => a + b, 0);

  const getFeetInches = (heightTotal) => {
    //get measurement in feets(170 => 5.577427821)
    const initialFeet = heightTotal / 30.48;
    //floor feet measurement(5.577427821 => 5)
    const finalFeet = Math.floor(initialFeet);
    //subtract flooredfeet from initialfeet to get data for inches measurement
    //(.577427821)
    const initialInch = initialFeet - finalFeet;
    //get measurement for inches(rounded)
    //(.577427821 * 12 => 6.93)
    const finalInch = (initialInch * 12).toFixed(2);
    return `${heightTotal} cm (${finalFeet}ft/${finalInch}in)`;
  };

  const sortByName = () => {
    if (sortName === false) {
      state.actors.reverse();
      setSortName(true);
    } else {
      state.actors.reverse();
      setSortName(false);
    }
  };

  const sortByHeight = () => {
    if (sortHeight === false) {
      state.actors?.sort((a, b) => a.height - b.height);
      setSortHeight(true);
    } else {
      state.actors?.sort((a, b) => b.height - a.height);
      setSortHeight(false);
    }
  };

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="characters">
        <form className="characters__filter" onSubmit={showGender}>
          <select name="gender" ref={genderType}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="submit"
            value="filter"
            className="characters__filterbtn"
          />
        </form>

        <div className="characters__list">
          <table>
            <thead>
              <th onDoubleClick={sortByName} className="characters__list__sort">
                Name
              </th>
              <th>Gender</th>
              <th
                onDoubleClick={sortByHeight}
                className="characters__list__sort"
              >
                Height
              </th>
            </thead>
            <tbody>
              {state.actors?.map((actor) => (
                <tr key={actor?.name}>
                  <td>{actor?.name}</td>
                  <td>{actor?.gender}</td>
                  <td>{actor?.height}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>{state.actors?.length} characters</td>
                <td>{getFeetInches(heightTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default Characters;
