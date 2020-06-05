import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

export default function Homepage(){
  //aciganti
  const [value, setValue] = useState({
    news: [],
    title: '',
    date:'',
    link:'',
    category:''
  });

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/berita-app/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const queryData = {
    query:
        `PREFIX news:<http://example.co.id/ns/newsdata>
            SELECT DISTINCT ?title ?date ?link ?category 
            WHERE {
            ?news news:title ?title.
            ?news news:date ?date.
            ?news news:link ?link.
            ?news news:category ?category;
            FILTER contains(?category,"${value.title}")
    }`
  };

  try {
    const { data } = await axios(BASE_URL, {
      method: 'POST',
      headers,
      data: qs.stringify(queryData)
    });
    console.log(data);

    // Convert Data
    const formatted_data = data.results.bindings.map((news, index) => formatter(news, index));
    console.log(formatted_data)

    setValue({
      ...value,
      news: formatted_data
    });
  } catch (err) {
    console.error(err);
  }
}

const formatter = (news, index) => {
    return {
      "id": index,
      "title": news.title.value,
      "date": news.date.value,
      "link": news.link.value,
      "category": news.category.value, 
    }
  }

const handleChangeTitle = event => {
  setValue({
    ...value,
    'title': event.target.value, 
  });
}

const handleChangeNpm = event => { //handleChangeDate
  setValue({
    ...value,
    'npm': event.target.value,
  });
}

//const handleChangeDate = event => {
  //setValue({
    //...value,
    //'date': event.target.value,
  //});
//}


const handleChangeName = event => {
  setValue({
    ...value,
    'nama': event.target.value,  
  });
}

const handleChangeYear = event => {
  setValue({
    ...value,
    'tahun': event.target.value,
  });
}

const handleChangeMajor = event => {
  setValue({
    ...value,
    'peminatan': event.target.value,
  });
}

const content = value.news.map((news) =>
  <div className="container">
    <div key={news.id}>
      <div className="col-md-10">
        <div className="title"><a href={`${news.link}`}>{news.title}</a></div>
        <div class="row">
          <div class="col-md-2">
            {news.category}  
          </div>
          <div class="col-md-2">
            {news.date}
          </div>
        </div>  
      </div>
    </div>
  </div>
)
// Layout
return (
    <body>
      {/* Navbar */}
  <div class="topnav">
    <a><b>Home</b></a>
    <div class="search-container">
      <form action=" ">
        <input type="text" placeholder="Search.." name="search"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>

      <div className="header">
        <h1>
            It's BeritApp
        </h1>
        <p id="desc">Skripsi Finder adalah Website<b> Pencarian Skripsi </b>Mahasiswa Teknik Informatika Unpad</p>

        {/* Search Form  */}
        <form>
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
          </div>

          {/* Filter Tahun */}
          <div className="row">
            <select setValue={value.tahun} className="dropdown" id="tahun" onChange={handleChangeYear}>
              <option value="">Tahun</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </select>
          </div>

          {/* Filter Peminatan */}
          <div className="row">
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
      </div>
        
      {/* Hasil Pencarian */}
      <div class="result">
        <h5>
            Hasil Pencarian Skripsi
        </h5>
        <div>
          {content}
        </div>
      </div>

      {/* Footer */}
        <footer>
          <div className="footer-copyright">&copy; 2020 Skripsi Finder</div>
        </footer>
    </body>
    );
}