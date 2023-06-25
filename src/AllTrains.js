import React from 'react'
import axios from 'axios'
function AllTrains() {
  const[Trains,setTrains] = React.useState([])
  React.useEffect(()=>{
axios({
    method: "GET",
    url: "http://localhost:5000/train/trains",
  
  }).then((res)=>setTrains(res.data.docs))
  },[])
  return (
    <div>
      {Trains.map((val,ind)=>{
      return <div className='border border-primary my-3'>
          <b>{val['train_name']}</b>
        <p>TrainNumber:{val['trainNumber']}</p>
        <p>Departure Time :{val['DepartureTime']['hours']+val['DepartureTime']['minutes']+val['DepartureTime']['seconds']}</p>
        <p>Available Seats -</p>
        <p>Sleeper:{val['seatsAvailable']['sleeper']}</p>
        <p>AC:{val['seatsAvailable']['AC']}</p>
        <p>Price-</p>
        <p>Sleeper:{val['price']['sleeper']}</p>
         <p>AC:{val['price']['AC']}</p>
         <i>Train might be delayed by {val['delayedBy']} mins</i>
      </div>
      })}
    </div>
  )
}

export default AllTrains
