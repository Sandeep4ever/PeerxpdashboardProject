import React, { useState, useEffect } from "react";
import axios from "axios";
const Link_page = () => {
  const [totallinks, settotallinks] = useState();
  const [interLinks, setInterLinks] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
      );
      return res;
    };
    getData().then((res) => {
      if (res.data.posts.length > 0) {
        let countfeatureImg = 0;
        let countUrl = 0;
        //total links  count
        res.data.posts.filter((listdata) => {
          if (listdata.feature_image !== "") {
            countfeatureImg++;
          }
          if (listdata.url !== "") {
            countUrl++;
          }
        });
        let totallink = countfeatureImg + countUrl;
        settotallinks(totallink);
      }
      // inter links and external links count and show in list
      let internalLinks = 0;
      res.data.posts.forEach((item) => {
        if (item.url.includes("https://ghost-blog.ipxp.in/")) {
          if (!internalLinks.includes(item.url)) {
            setInterLinks((prev) => [...prev, item.url]);
          }
        } else {
          if (!externalLinks.includes(item.url)) {
            setExternalLinks((prev) => [...prev, item.url]);
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">
                  Number of Total Links in all posts{" "}
                </h5>{" "}
                <span>{totallinks}</span>
                <h5 className="card-title">
                  Number of Number of External Links{" "}
                </h5>{" "}
                <span>{externalLinks.length}</span>
                <h5 className="card-title">Number of Enternal Links </h5>{" "}
                <span>{interLinks.length}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">List of Broken Internal Links</h5>
                <ul>
                  {interLinks && interLinks.length > 0 ? (
                    interLinks.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })
                  ) : (
                    <li>No Any broken internal links available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">List of Broken External Links</h5>
                <ul>
                  {externalLinks && externalLinks.length > 0 ? (
                    externalLinks.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })
                  ) : (
                    <li>No Any broken external links available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Link_page;
