import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import axios from "axios";

import ReactGA from 'react-ga';

function Statistics() {
  const { REACT_APP_IP,REACT_APP_BACKEND_PORT } = process.env;
  const [membersCount, setmembersCount] = useState("");
  const [projectsCount, setprojectsCount] = useState("");
  const [subjectsCount, setsubjectsCount] = useState("");
  const [allprojectsCount, setallprojectsCount] = useState(0);
  const [visitorsCount, setvisitorsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/statisticsONSite/`
        );

        setvisitorsCount(response.visitors);
        setmembersCount(response.membersCount);
        setprojectsCount(response.projectsCount);
        setsubjectsCount(response.subjectsCount);
        setallprojectsCount(response.allProjects);
        // console.log("response", response);
      } catch (error) {
        // console.error(error.message);
      }

      // try {
      //   const { data: response } = await axios.get(
      //     `https://api.countapi.xyz/hit/beah-tec.com/515a9ab4-defa-415c-a20f-c7126b43c9ab`
      //   );
      //   setvisitorsCount(response.value);

      // } catch (error) {
      //   // console.error(error.message);
      // }

      // 
    };

    fetchData();
  }, []);
  // console.log(" setprojectsCount", projectsCount);

  return (
    <div className="statis">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
            <div className="py-4 statis-card">
              <div className="d-flex align-items-center">
                <img src={`/image/visitor.png`} />
                <div className="ms-2">
                  <CountUp
                    className="mb-0 count-title blue-color"
                    end={visitorsCount}
                    duration={3}
                  />
                  <p className="mb-0 count-title">زائر</p>
                </div>
              </div>
            </div>
          </div>
          {/* endcol */}

          <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
            <div className="py-4 statis-card">
              <div className="d-flex align-items-center">
                <img src={`/image/project.png`} />
                <div className="ms-2">
                  <CountUp
                    className="mb-0 count-title blue-color"
                    end={allprojectsCount}
                    duration={3}
                  />
                  <h2 className="mb-0  count-title">فكرة تم تسليمها</h2>
                </div>
              </div>
            </div>
          </div>
          {/* endcol */}

          <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
            <div className="py-4 statis-card">
              <div className="d-flex align-items-center">
                <img src={`/image/univirsty.png`} />
                <div className="ms-2">
                  <CountUp
                    className="mb-0 count-title blue-color"
                    end={projectsCount}
                    duration={3}
                  />
                  <h2 className="mb-0  count-title">مشروع</h2>
                </div>
              </div>
            </div>
          </div>
          {/* endcol */}

          <div className="col-lg-3 col-md-6 col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
            <div className="py-4 statis-card">
              <div className="d-flex align-items-center">
                <img src={`/image/member.png`} />
                <div className="ms-2">
                  <CountUp
                    className="mb-0 count-title blue-color"
                    end={membersCount}
                    duration={3}
                  />
                  <h2 className="mb-0  count-title">عضو</h2>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="statis">
  //     <div className="container">
  //       <div className="row">
  //         <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
  //           <div className="py-4 statis-card">
  //             <div className="d-flex align-items-center">
  //               <img src={`/image/visitor.png`} />
  //               <div className="ms-2">
  //                 <CountUp
  //                   className="mb-0 count-title blue-color"
  //                   end={0}
  //                   duration={3}
  //                 />
  //                 <p className="mb-0 count-title">زائر</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* endcol */}
  //         <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
  //           <div className="py-4 statis-card">
  //             <div className="d-flex align-items-center">
  //               <img src={`/image/project.png`} />
  //               <div className="ms-2">
  //                 <CountUp
  //                   className="mb-0 count-title blue-color"
  //                   end={projectsCount}
  //                   duration={3}
  //                 />
  //                 <h2 className="mb-0  count-title">مشروع</h2>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* endcol */}
  //         <div className="col-lg-3 col-md-6  col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
  //           <div className="py-4 statis-card">
  //             <div className="d-flex align-items-center">
  //               <img src={`/image/univirsty.png`} />
  //               <div className="ms-2">
  //                 <CountUp
  //                   className="mb-0 count-title blue-color"
  //                   end={subjectsCount}
  //                   duration={3}
  //                 />
  //                 <h2 className="mb-0  count-title">موضوع</h2>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {/* endcol */}
  //         <div className="col-lg-3 col-md-6 col-sm-6 mb-lg-0 mb-4 d-flex justify-content-center">
  //           <div className="py-4 statis-card">
  //             <div className="d-flex align-items-center">
  //               <img src={`/image/member.png`} />
  //               <div className="ms-2">
  //                 <CountUp
  //                   className="mb-0 count-title blue-color"
  //                   end={membersCount}
  //                   duration={3}
  //                 />
  //                 <h2 className="mb-0  count-title">عضو</h2>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Statistics;
