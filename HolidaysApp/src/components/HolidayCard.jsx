// HolidayCard.jsx
import React from 'react'

const HolidayCard = ({ holidays }) => {
  return (
    <div className='mt-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                holidays && holidays.length > 0 ?
                    holidays.map((c, index) => (
                        <div className="rounded-lg bg-white p-4" key={index}>
                            <h2 className='text-center text-2xl font-semibold'>{c.name}</h2>
                            <p className='text-center'><i className="ri-calendar-line"></i> {new Date(2000, c.date.datetime.month - 1, 1).toLocaleString('default', { month: 'long' })} {c.date.datetime.day} {c.date.datetime.year}</p>
                            <span className='mt-5 block text-lg'>{c.description}</span>
                        </div>
                    ))
                :
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                        No holidays found for the selected criteria.
                    </p>
                </div>
            }
        </div>
    </div>
  )
}

export default HolidayCard