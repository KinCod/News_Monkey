import React,{useState,useEffect} from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

const News = (props)=> {

  //making states for each componenet
  const [articles,setArticles] = useState([]);
  const [totalResults,setTotalResults] = useState(0);
  const [page,setpage] = useState(1);
  const [loading,setloading] = useState(true);
  const [progress,setprogress] = useState(0);

  const update = async () => {
    setprogress(15)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pagesize=${props.pagesize}`;
    let data = await fetch(url);

    setloading(true);
    setprogress(40);

    const parseddata = await data.json();

    setprogress(70);
    ///ye parsed data directly ab use ho skta hai just like upar articles ki tarah

    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setloading(false)

    setprogress(100)
  };

  useEffect(()=>{
    document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - NewsMonkey`;
    
    update();    //when bracket empty it runs for once
    setpage(page+1)
  },[])         //ye bracket btata hai k kis component k change ya occur hone se ye effect k andar ka run ho

  const nextt = () => {
    const a = Math.ceil(totalResults / props.pagesize);
    console.log(a);
    if (page + 1 > a) {
      alert("Last Page");
    } else {
      setpage(page+1)
      update()
    }
  };

  const prev = () => {
    if (page <= 1) {
      alert("FirstPage");
    } else {
      setpage(page-1)
      update()
    }
  };

    const fetchNextUsers =async () => {
    setpage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pagesize=${props.pagesize}`;
    
    
    let data = await fetch(url);
    
    const parseddata = await data.json();

    setArticles(articles.concat(parseddata.articles))
    setTotalResults(parseddata.totalResults)
    setloading(false)
  }

    return (
      <>
      <LoadingBar
        color='#f11946'
        progress={progress} 
      />

      <div className="text-center">
        <div className="text-center">
          
          <h1 className="text-center font-vina mt-5 font-semibold text-4xl text-sky-800">
            News Monkey - Top{" "}
            {props.category.charAt(0).toUpperCase() +
              props.category.slice(1)}{" "}
            Headlines
          </h1>
          {/* {this.state.loading && <Loading />} */}
        </div>

        <InfiniteScroll
          dataLength={articles.length} 
          next={fetchNextUsers}
          hasMore={articles.length !== totalResults} //kab tak fetch krna hai kitna data aur hai
          loader={<Loading />}
        >
          {!loading &&
            articles.map((element) => {
              //using map we're looping through the object and accessing
              //a single element each time

              //idhar niche were returning on element at a time to the class accessing the component
              return (
                <span
                  className=" inline-flex     
            text-center my-10 sm:mb-80 md:mb-20 justify-center h-80 mx-10"
                >
                  <Newsitem
                    date={element.publishedAt}
                    key={element.url}
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://picsum.photos/200/300"
                    }
                    newsurl={element.url}
                    heading={element.title ? element.title.slice(0, 80) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 100)
                        : " "
                    }
                  />
                </span>
              );
            })}
        </InfiniteScroll>

        {/* <div className="w-screen text-center container flex justify-around">
          <button
            type="button"
            onClick={prev}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-red-300 dark:hover:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 order-1"
          >
            &larr; Previous
          </button>

          <button
            type="button"
            onClick={nextt}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br hover:ring-4 hover:outline-none hover:ring-teal-300 dark:hover:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 order-2"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
      </>
    );
  }

News.propTypes = {
  pagesize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

News.defaultProps = {
  pagesize: 8,
  country: "in",
  category: "general",
};

export default News;
