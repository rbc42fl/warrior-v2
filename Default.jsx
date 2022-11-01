import React from 'react'

function Default() {

  var s = '';

  while (s != 'steadfast') {
    s = prompt('please enter your password');
    if (s == 'steadfast') {
      window.location.href = 'about.html'; //page to redirect if password entered is correct
    } else {
      alert('Incorrect password-Try again');
    }
  }




  return (
    <div>Default</div>
  )
}

export default default