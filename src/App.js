
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Circle from './component/Circle';

function App() {
  let circle_data=[{color:"yellow",id:1},{color:"green",id:2},{color:"red",id:3},
    {color:"blue",id:4},{color:"brown",id:5}]
  const [shooted_baloon,setShootedBaloon]=useState([])

  const [data,setData]=useState(circle_data)
  
  const [inp_shoot,setInpShoot]=useState("")
  const sortBaloons=(data)=>{
    data.sort((a,b)=>a.id-b.id)
  }
  sortBaloons(data)
  const  handleShoot=(id)=>{
  //console.log(circle_data,"circle data before del")
  // circle_data.splice(id-1,1)
  if(id===""||id==="0"){
    alert("Input is not valid")
    setInpShoot('')
  }else{
    setShootedBaloon([...shooted_baloon,...data.splice(id-1,1)])
    setInpShoot('')
  }
  }
  const handleOnChange=(num)=>{
    //console.log(num,circle_data.length)
    if(num>data.length){
      alert("Baloons are not Enough")
    }else{
      setInpShoot(num)
    }
  }
  return (
    <>
    <div style={{margin:"auto",width:"250px"}}>
      <input id='inp' maxLength="1" value={inp_shoot} onChange={(e)=>{
        handleOnChange(e.target.value)
        
      }} />
      <button onClick={()=>{handleShoot(inp_shoot)}}>shoot</button>
    </div>
    <div className="App">
      
      <div className='left_box' >
        {shooted_baloon.map(baloon=>{
          return <div key={baloon.id} onClick={()=>{
            let indexOfTargetBaloon=shooted_baloon.indexOf(baloon)
            setData([...data,...shooted_baloon.splice(indexOfTargetBaloon,1)])
            
          }}>
            <Circle color={baloon.color} />
          </div>
        })}
      </div>
      <div className='right_box' >
        {data.map(data=>{
          return <div key={data.id}>
            <Circle  color={data.color}/>
          </div>
        })}
      </div>
    </div>
    </>
  );
}

export default App;
