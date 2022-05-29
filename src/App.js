
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Circle from './component/Circle';

function App() {
  let circle_data=[{color:"yellow",id:1},{color:"green",id:2},{color:"red",id:3},
    {color:"blue",id:4},{color:"brown",id:5}]
  const [shooted_baloon,setShootedBaloon]=useState([])

  const [data,setData]=useState(circle_data)
  
  const [inp_shoot,setInpShoot]=useState(null)
  const sortBaloons=(data)=>{
    data.sort((a,b)=>a.id-b.id)
  }
  sortBaloons(data)
  const  handleShoot=async (id)=>{
  //console.log(circle_data,"circle data before del")
  // circle_data.splice(id-1,1)
    setShootedBaloon([...shooted_baloon,...data.splice(id-1,1)])
    setInpShoot(null)
    //let del=await axios.delete(`http://localhost:3001/original_baloons/${id}`)
   // console.log(del)
  //  axios.post("http://localhost:3001/shooted_baloons",del)

   //setData(circle_data)
   //console.log(circle_data,"circle data after del")
   //circle_data=data
  }
  const handleOnChange=(num)=>{
    //console.log(num,circle_data.length)
    if(num>circle_data.length){
      alert("Baloons are not Enough")
    }else{
      setInpShoot(num)
    }
  }
  return (
    <>
    <div style={{margin:"auto",width:"250px"}}>
      <input id='inp' maxLength="1" onChange={(e)=>{
        handleOnChange(e.target.value)
        
      }} />
      <button onClick={()=>{handleShoot(inp_shoot)}}>shoot</button>
    </div>
    <div className="App" style={{display:'flex',gap:"100px",marginTop:"50px",marginLeft:"50px",height:"fit-content"}}>
      
      <div style={{height:"200px", width:"550px" ,border:"1px solid red",marginTop:"15%",display:'flex',gap:'10px',alignItems:'center'}}>
        {shooted_baloon.map(baloon=>{
          return <div key={baloon.id} onClick={()=>{
            let indexOfTargetBaloon=shooted_baloon.indexOf(baloon)
            setData([...data,...shooted_baloon.splice(indexOfTargetBaloon,1)])
            
          }}>
            <Circle color={baloon.color} />
          </div>
        })}
      </div>
      <div style={{width:"200px",height:'auto',border:"1px solid red",display:'flex',flexDirection:'column',gap:"15px",alignItems:'center'}}>
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
