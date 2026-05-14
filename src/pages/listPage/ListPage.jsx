import React from 'react'
import './listPage.scss'
import { dummyData } from '../../lib/dummyData.js'
import Filter from '../../components/filter/Filter.jsx'
import Card from '../../components/card/Card.jsx'
import Map from '../../components/map/Map.jsx'

const ListPage = () => {
    const data = dummyData
    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {data.map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">
                <Map items={data}/>
            </div>
        </div>
    )
}

export default ListPage
