import React, { useState, useEffect } from "react";
import ReactChart from "./ReactChart";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [totalPostlen, settotalPostlen] = useState("");
  const [totalpages, settotalpages] = useState("");
  const [totalauthor, settotalauthor] = useState("");
  const [totaltags, settotaltags] = useState("");
  const [latestPosts, setlatestPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.all([
        axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
        ),
        axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/pages/?key=22444f78447824223cefc48062"
        ),
        axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062"
        ),
        axios.get(
          "https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062"
        ),
      ]);
      return res;
    };
    getData().then((res) => {
      settotalPostlen(res[0].data.posts.length);
      settotalpages(res[1].data.pages.length);
      settotalauthor(res[2].data.authors.length);
      settotaltags(res[3].data.tags.length);
      let DesendingDatearry = [];
      res[0].data.posts.forEach((item) => {
        if (item.updated_at) {
          let updated_at = item.updated_at.split("T");
          let date = updated_at[0].split("-");
          let updated_at_date = `${date[1]}/${date[2]}/${date[0]}`;
          DesendingDatearry.push({
            updated_at_date,
            title: item.title,
          });
        }
      });
      DesendingDatearry.sort((a, b) => {
        return new Date(b.updated_at_date) - new Date(a.updated_at_date);
      });
      setlatestPosts(DesendingDatearry.slice(0, 5));
    });
  }, []);

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Total No of Posts</h5>
                <p className="card-text">{totalPostlen}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Total No of Pages</h5>
                <p className="card-text">{totalpages}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Total No of Authors</h5>
                <p className="card-text">{totalauthor}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Total No of Tags</h5>
                <p className="card-text">{totaltags}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row postlist mt-3">
          <div className="col-md-8">
            <div className="card only-shadow">
              <div className="card-body">
                <h5 className="card-title">Total No of Tags</h5>
                <ReactChart />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-style">
              <div className="card-body">
                <h5 className="card-title">Latest 5 Published Post list </h5>
                {latestPosts &&
                  latestPosts.map((post, index) => (
                    <div key={index}>
                      <Link
                        to={post?.title}
                        target="_blank"
                        style={{ color: "blue", paddingLeft: "0px" }}
                        className="text-left"
                      >
                        <span className="text-danger">{index + 1}.</span>{" "}
                        {post.title}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
