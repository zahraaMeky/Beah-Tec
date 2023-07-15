import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import axios from "axios";
function HackGallarySlider() {
    const [Images, setImages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
              `https://www.beah-tec.com:80/hackathon/`
            );
            setImages(response.images);
            // console.log("response", response);
    
          } catch (error) {
          }
        };
        fetchData();
      }, []);

      const ImagesGallaryActive = Images.slice(0,1).map((img, i) => {
        return (
            <img className="img-thumbnail" style={{objectFit:'cover',height:"350px", width:"100%"}} src={"https://www.beah-tec.com:80/media/"+img} alt="" loading="lazy" />
        );
      });
      const ImagesGallary = Images.map((img, i) => {
        return (
        
            <div class="carousel-item">
                <img  className="img-thumbnail" style={{objectFit:'cover',height:"350px", width:"100%"}} src={"https://www.beah-tec.com:80/media/"+img} alt="" loading="lazy" />
                {/* <LazyLoadImage 
                    src={"https://www.beah-tec.com:80/media/"+img}
                    style={{objectFit:'cover',height:"250px", width:"100%"}}
                    // PlaceholderSrc={PlaceholderImage}
                    effect="blur"
                /> */}
            </div>

        );
      });
    return(
        <div id="gallaries" className="cvertical carousel slide mb-4" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
           {ImagesGallaryActive}
          </div>
            {ImagesGallary}
        </div>
      </div>
    )
}
export default HackGallarySlider;