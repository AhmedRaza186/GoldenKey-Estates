import './list.scss'
import Card from"../card/Card"
import {dummyData} from"../../lib/dummydata"

function List(){
  return (
    <div className='list'>
      {dummyData.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List