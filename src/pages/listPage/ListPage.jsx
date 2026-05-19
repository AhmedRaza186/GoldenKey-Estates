import React, { Suspense } from 'react'
import './ListPage.scss'
import Filter from '../../components/filter/Filter.jsx'
import Card from '../../components/card/Card.jsx'
import Map from '../../components/map/Map.jsx'
import { Await, useLoaderData } from 'react-router-dom'

const ListPage = () => {
    const data = useLoaderData();

    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading properties...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                postResponse.data.map((item) => (
                                    <Card key={item.id} item={item} />
                                ))
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading map...</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading map!</p>}
                    >
                        {(postResponse) => <Map items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default ListPage;
