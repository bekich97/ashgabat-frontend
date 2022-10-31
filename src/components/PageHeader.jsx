import React from 'react'

export default function PageHeader() {
  return (
    <div className='page-title-wrapper'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <span>{langs["Home"][lang]} / Salgymyz</span>
                </div>
            </div>
        </div>
    </div>
  )
}
