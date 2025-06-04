//use of {debouncing in react on text}

// import React, {  useCallback, useState } from 'react'
// import _ from 'lodash';
// export default function App() {

//   const[state, setState]=useState("");
//    const [displayed, setDisplayed] = useState('');

//    const debouncedChangeHandler =useCallback(
//     _.debounce((value) => {
//       setDisplayed(value);
//     }, 1000), // <-- 60,000ms = 1 minute
//     []
//   );

//   return (
//     <div>
//       <input value={state}
//       placeholder='enter something' 
//       onChange={(e)=>{
//         setState(e.target.value)
//         debouncedChangeHandler(e.target.value)
//       }}/>

//     <h1>name {displayed}</h1>
//     </div>
//   )
// }
