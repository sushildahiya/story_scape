import React from 'react'
import errorImg from '../../assets/images/404.svg'
function ErrorPage() {
  return (
    <div>
      <img src={errorImg} alt="404" width="400" height="400"/>
    </div>
  )
}

export default ErrorPage

