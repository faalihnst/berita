import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import '/assets/style.css';
// import './assets/font-awesome.min.css';

export default function Homepage() {
  //aciganti
  const [value, setValue] = useState({
    news: [],
    title: "",
    date: "",
    link: "",
    category: "",
  });

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/berita-app/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX news:<http://example.co.id/ns/newsdata>
            SELECT DISTINCT ?title ?date ?link ?category 
            WHERE {
            ?news news:title ?title.
            ?news news:date ?date.
            ?news news:link ?link.
            ?news news:category ?category;
            FILTER contains(?category,"${value.title}")
    }`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((news, index) =>
        formatter(news, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        news: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (news, index) => {
    return {
      id: index,
      title: news.title.value,
      date: news.date.value,
      link: news.link.value,
      category: news.category.value,
    };
  };

  const handleChangeTitle = (event) => {
    setValue({
      ...value,
      title: event.target.value,
    });
  };

  const handleChangeNpm = (event) => {
    setValue({
      ...value,
      npm: event.target.value,
    });
  };

  const handleChangeName = (event) => {
    setValue({
      ...value,
      nama: event.target.value,
    });
  };

  const handleChangeYear = (event) => {
    setValue({
      ...value,
      tahun: event.target.value,
    });
  };

  const handleChangeMajor = (event) => {
    setValue({
      ...value,
      peminatan: event.target.value,
    });
  };

  const content = value.news.map((news) => (
    <div className="container">
      <div key={news.id}>
        <div className="col-md-10">
          <div className="title">
            <a href={`${news.link}`}>{news.title}</a>
          </div>
          <div class="row">
            <div class="col-md-2">{news.category}</div>
            <div class="col-md-2">{news.date}</div>
          </div>
        </div>
      </div>
    </div>
  ));
  // Layout
  return (
    <body>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Skripsi Finder
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <header id="header">
        {/* Nav */}
        <div id="nav">
          {/* Main Nav */}
          <div id="nav-fixed">
            <div className="container">
              {/* logo */}
              <div className="nav-logo">
                <a href="index.html" className="logo">
                  <img src="./img/logo.png" alt="" />
                </a>
              </div>
              {/* /logo */}
              {/* nav */}
              <ul className="nav-menu nav navbar-nav">
                <li>
                  <a href="category.html">News</a>
                </li>
                <li>
                  <a href="category.html">Popular</a>
                </li>
                <li className="cat-1">
                  <a href="category.html">Web Design</a>
                </li>
                <li className="cat-2">
                  <a href="category.html">JavaScript</a>
                </li>
                <li className="cat-3">
                  <a href="category.html">Css</a>
                </li>
                <li className="cat-4">
                  <a href="category.html">Jquery</a>
                </li>
              </ul>
              {/* /nav */}
              {/* search & aside toggle */}
              <div className="nav-btns">
                <button className="aside-btn">
                  <i className="fa fa-bars" />
                </button>
                <button className="search-btn">
                  <i className="fa fa-search" />
                </button>
                <div className="search-form">
                  <input
                    className="search-input"
                    type="text"
                    name="search"
                    placeholder="Enter Your Search ..."
                  />
                  <button className="search-close">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
              {/* /search & aside toggle */}
            </div>
          </div>
          {/* /Main Nav */}
          {/* Aside Nav */}
          <div id="nav-aside">
            {/* nav */}
            <div className="section-row">
              <ul className="nav-aside-menu">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="about.html">About Us</a>
                </li>
                <li>
                  <a href="#">Join Us</a>
                </li>
                <li>
                  <a href="#">Advertisement</a>
                </li>
                <li>
                  <a href="contact.html">Contacts</a>
                </li>
              </ul>
            </div>
            {/* /nav */}
            {/* widget posts */}
            <div className="section-row">
              <h3>Recent Posts</h3>
              <div className="post post-widget">
                <a className="post-img" href="blog-post.html">
                  <img src="./img/widget-2.jpg" alt="" />
                </a>
                <div className="post-body">
                  <h3 className="post-title">
                    <a href="blog-post.html">
                      Pagedraw UI Builder Turns Your Website Design Mockup Into
                      Code Automatically
                    </a>
                  </h3>
                </div>
              </div>
              <div className="post post-widget">
                <a className="post-img" href="blog-post.html">
                  <img src="./img/widget-3.jpg" alt="" />
                </a>
                <div className="post-body">
                  <h3 className="post-title">
                    <a href="blog-post.html">
                      Why Node.js Is The Coolest Kid On The Backend Development
                      Block!
                    </a>
                  </h3>
                </div>
              </div>
              <div className="post post-widget">
                <a className="post-img" href="blog-post.html">
                  <img src="./img/widget-4.jpg" alt="" />
                </a>
                <div className="post-body">
                  <h3 className="post-title">
                    <a href="blog-post.html">
                      Tell-A-Tool: Guide To Web Design And Development Tools
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            {/* /widget posts */}
            {/* social links */}
            <div className="section-row">
              <h3>Follow us</h3>
              <ul className="nav-aside-social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-google-plus" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-pinterest" />
                  </a>
                </li>
              </ul>
            </div>
            {/* /social links */}
            {/* aside nav close */}
            <button className="nav-aside-close">
              <i className="fa fa-times" />
            </button>
            {/* /aside nav close */}
          </div>
          {/* Aside Nav */}
        </div>
        {/* /Nav */}
      </header>
      {/* /Header */}

      {/* <div className="header">
        <h1>
            Welcome to Skripsi Finder!
        </h1>
        <p id="desc">Skripsi Finder adalah Website<b> Pencarian Skripsi </b>Mahasiswa Teknik Informatika Unpad</p> */}

      {/* Search Form  */}
      {/* <form>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  setValue={value.title}
                  placeholder="Judul Skripsi"
                  type="text"
                  id="titleBar"
                  onChange={handleChangeTitle}
                />
              </div>
            </div>
            <div className="grid-container">
              <div className="row">
                <div className="col">
                  <input
                    setValue={value.nama}
                    placeholder="Penulis"
                    type="text"
                    id="nameBar"
                    onChange={handleChangeName}
                  />
                </div>
                <div className="col" id="studID">
                  <input
                    setValue={value.npm}
                    placeholder="NPM Penulis"
                    type="text"
                    id="npmBar"
                    onChange={handleChangeNpm}
                  />
                </div>
              </div>
            </div>
          </div> */}

      {/* Filter Tahun */}
      {/* <div className="row">
            <select setValue={value.tahun} className="dropdown" id="tahun" onChange={handleChangeYear}>
              <option value="">Tahun</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </select>
          </div> */}

      {/* Filter Peminatan */}
      {/* <div className="row">
            <select setValue={value.peminatan} className="dropdown" id="peminatan" onChange={handleChangeMajor}>
              <option value="">Bidang Minat</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Jaringan Komputer">Jaringan Komputer</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>
          <div className="row">
            <input
                type="button"
                className="button"
                id="search"
                value="Search"
                onClick={getData}
            />
          </div>
        </form>
      </div> */}

      {/* Hasil Pencarian */}
      <div class="result">
        <h5>Hasil Pencarian Skripsi</h5>
        <div>{content}</div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-copyright">&copy; 2020 Skripsi Finder</div>
      </footer>
    </body>
  );
}
