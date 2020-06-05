import React, { useState } from "react";

import axios from "axios";
import qs from "qs";

export default function Homepage() {
  //aciganti
  const [value, setValue] = useState({
    news: [],
    title: "",
    date: "",
    link: "",
    category: "",
    author: "",
    abstract: "",
  });

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/berita-app/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX news:<http://example.co.id/ns/newsdata>
            SELECT DISTINCT ?title ?date ?link ?category ?abstract ?author
            WHERE {
            ?news news:title ?title.
            ?news news:date ?date.
            ?news news:link ?link.
            ?news news:writtenby ?author.
			    	?news news:abstract ?abstract.
            ?news news:category ?category;
            FILTER contains(lcase(str(?category)), lcase(str("${value.category}")))
            FILTER contains(lcase(str(?title)), lcase(str("${value.title}")))
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
      author: news.author.value,
      abstract: news.abstract.value,
    };
  };

  const titleHandler = (event) => {
    setValue({
      ...value,
      title: event.target.value,
    });
  };

  const categoryHandler = (event) => {
    //handleChangeDate
    setValue({
      ...value,
      category: event.target.value,
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
            <div class="col-md-3">Preview</div>
            <div class="col-md-3">{news.category}</div>
            <div class="col-md-3">{news.date}</div>
            <div class="col-md-3">{news.author}</div>
          </div>
  <div class="row"><div class="">{news.abstract}</div></div>
        </div>
      </div>
    </div>
  ));
  // Layout
  return (
    <body>
      <div className="header">
        <h1>It's BeritApp</h1>

        {/* Search Form  */}
        <form>
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  setValue={value.title}
                  placeholder="Cari Berita"
                  type="text"
                  id="titleBar"
                  onChange={titleHandler}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <input
              type="button"
              className="button col-xs-1 text-center"
              id="search"
              value="Search"
              onClick={getData}
            />
          </div>
        </form>
      </div>

      {/* Hasil Pencarian */}
      <div class="result col-xs-1 text-center">
        <div class="then-right">
          <div class="column-left">
            <h5>Hasil Pencarian</h5>
          </div>
          <div class="column-left"></div>
          <div class="column-left"></div>
          <div class="column-left">
            <div class="dropdown">
              <select
                setValue={value.category}
                className="dropbtn"
                id="category"
                onChange={categoryHandler}
              >
                <option value="">Kategori</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sains">Sains</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Otomotif">Ootomotif</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Properti">Properti</option>
                <option value="Travel">Travel</option>
                <option value="Politik">Politik</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="content col-xs-1 text-center">{content}</div>
      {/* Footer */}
      <footer>
        <div className="footer-copyright">&copy; 2020 BeritApp</div>
      </footer>
    </body>
  );
}
