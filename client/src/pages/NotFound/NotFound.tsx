import React from 'react'
import classes from './notfound.module.css'



import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    const homepage = () =>{
       navigate('/')
    }
  return (
      <div>
          <div className={classes.notfoundBackground}>
             
              <div className={classes.homepage} onClick={homepage}>Home Page</div>
          </div>
      </div>
  )
}

export default NotFound