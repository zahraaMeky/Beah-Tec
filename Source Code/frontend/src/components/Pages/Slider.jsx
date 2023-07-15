import React from 'react'

 function Slider() {
    const {REACT_APP_IP} = process.env;
    return (
    <div>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src={`/image/Asset1.png`} class="d-block w-100" style={{height: '450px'}} alt="..."/>
            </div>
            <div class="carousel-item">
                <img src={`/image/Asset2.png`} class="d-block w-100" style={{height: '450px'}}alt="..."/>
            </div>
            <div class="carousel-item">
                <img src={`/image/Asset3.png`} class="d-block w-100" style={{height: '450px'}}alt="..."/>
            </div>
            <div class="carousel-item">
                <img src={`/image/Asset4.png`}class="d-block w-100" style={{height: '450px'}}alt="..."/>
            </div>
            </div>
  </div>
  </div>
  )
}
export default Slider 