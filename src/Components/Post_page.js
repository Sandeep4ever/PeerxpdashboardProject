import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Post_page = () => {
  const [listwithoutmetaDesc, setlistwithoutmetaDesc] = useState([]);
  const [toolongMetadesc, settoolongMetadesc] = useState([]);
  const [longUrl, setlongUrl] = useState([]);
  const [withoutFeatureImg, setwithoutFeatureImg] = useState([]);
  const [excertbelow250words, setexcertbelow250words] = useState([]);
  const [excertabove80words, setsetexcertabove80words] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
      );
      return res;
    };
    getData().then((res) => {
      if (res.data.posts.length > 0) {
        setlistwithoutmetaDesc([]);
        settoolongMetadesc([]);
        setlongUrl([]);
        setwithoutFeatureImg([]);
        setexcertbelow250words([]);
        setsetexcertabove80words([]);

        res.data.posts.forEach((listdata) => {
          if (listdata.meta_description !== "") {
            if (!listwithoutmetaDesc.includes(listdata)) {
              setlistwithoutmetaDesc((listwithoutmetaDesc) => [
                ...listwithoutmetaDesc,
                listdata,
              ]);
            }
          }
          if (listdata.meta_description === "") {
            if (!toolongMetadesc.includes(listdata)) {
              settoolongMetadesc((itme) => [...itme, listdata]);
            }
          }
          if (listdata.feature_image === "") {
            if (!withoutFeatureImg.includes(listdata)) {
              setwithoutFeatureImg((longUrl) => [...longUrl, listdata]);
            }
          }
          if (listdata.url) {
            let spliturl = listdata.url.split("");
            if (spliturl.length > 40) {
              if (!longUrl.includes(listdata)) {
                setlongUrl((longUrl) => [...longUrl, listdata]);
              }
            }
          }
          if (listdata.excerpt) {
            let splitexcerpt = listdata.excerpt.split(" ");

            if (splitexcerpt.length < 50) {
              if (!excertbelow250words.includes(listdata)) {
                setexcertbelow250words((setexcertbelow250words) => [
                  ...setexcertbelow250words,
                  listdata,
                ]);
              }
            }
            if (splitexcerpt.length > 80) {
              console.log("excert more then 80 words");
              if (!excertabove80words.includes(listdata)) {
                setsetexcertabove80words((longUrl) => [...longUrl, listdata]);
              }
            }
          }
        });
      }
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
                  List of Posts without Meta Description
                </h5>
                {listwithoutmetaDesc && listwithoutmetaDesc.length > 0
                  ? listwithoutmetaDesc.map((listdata, index) => {
                      return (
                        <div key={listdata.id}>
                          <Link to={listdata.url} style={{ color: "blue" }}>
                            {index + 1}: {listdata.slug}
                          </Link>
                        </div>
                      );
                    })
                  : "No Any Posts without Meta Description"}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style mt-2">
              <div className="card-body">
                <h5 className="card-title">
                  Too Long Posts, More than 80 words
                </h5>
                {excertabove80words && excertabove80words.length > 0
                  ? excertabove80words.map((item, index) => {
                      return (
                        <div key={index + 1}>
                          <Link to={item.url} style={{ color: "blue" }}>
                            {index + 1}: {item.title}
                          </Link>
                        </div>
                      );
                    })
                  : "No Posts More then 1500 words"}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-style mt-2">
              <div className="card-body">
                <h5 className="card-title">Too Short Posts, Below 250 words</h5>
                {excertbelow250words && excertbelow250words.length > 0
                  ? excertbelow250words.map((item, index) => {
                      return (
                        <div key={index + 1}>
                          <Link to={item.url} style={{ color: "blue" }}>
                            {index + 1}: {item.title}
                          </Link>
                        </div>
                      );
                    })
                  : "No Posts Below 250 words "}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style mt-2">
              <div className="card-body">
                <h5 className="card-title">
                  List of posts without Featured image
                </h5>
                {withoutFeatureImg && withoutFeatureImg.length > 0
                  ? withoutFeatureImg.map((item, index) => {
                      return (
                        <div key={index + 1}>
                          <Link to={item.url} style={{ color: "blue" }}>
                            {index + 1}: {item.title}
                          </Link>
                        </div>
                      );
                    })
                  : "No Posts without Featured image"}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">
                  Too long URL, More than 40 chara{" "}
                </h5>
                {longUrl && longUrl.length > 0
                  ? longUrl.map((item, index) => {
                      return (
                        <div key={index + 1}>
                          <Link to={item.url} style={{ color: "blue" }}>
                            {index + 1}: {item.title}
                          </Link>
                        </div>
                      );
                    })
                  : "No URL More then 100 chara"}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Too long Meta Description</h5>
                {toolongMetadesc && toolongMetadesc.length > 0
                  ? toolongMetadesc.map((item, index) => {
                      return (
                        <div key={index + 1}>
                          <Link to={item.url} style={{ color: "blue" }}>
                            {index + 1}: {item.title}
                          </Link>
                        </div>
                      );
                    })
                  : "No Meta Description available"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post_page;
