("use client");
import React from "react";
import { Card, Button } from "flowbite-react";

const Newsitem =(props)=> {
    
    return (
      <Card horizontal imgSrc={props.imgurl}>
        
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>{props.heading}</p>
        </h5>
        <h2 className="font-semibold">Published on: {new Date(props.date).toGMTString()}</h2>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          <p>
            {props.description}
          </p>
        </div>
        <Button className="w-fit m-auto" gradientMonochrome="cyan">
        <a href={props.newsurl} target="#" >Click here for news</a>
        </Button>
      </Card>
    );
  }

export default Newsitem;
