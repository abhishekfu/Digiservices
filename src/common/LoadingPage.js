import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../assets/animations/loading.json';
import animationData1 from '../assets/animations/leisure.json';


export default function LoadingPage({type}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:type==='loading' ? animationData:animationData1 ,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
   
      <div style={{ margin: "100px 0 0 550px", width: "400px", height: "400px" }}>
        <Lottie options={defaultOptions}
          height={300}
          width={300}
        />
      </div>
    
  )
}
LoadingPage.defaultProps={
  type:'loading'
}


 