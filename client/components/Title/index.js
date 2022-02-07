import React from "react";
import  './styles.scss';

export default function Title ({ first, second }) {
  return (
    <div className="title">
      <h1 className="title_first-word">{first}</h1>
      <h1 className="title_second-word">{second}</h1>
    </div>
  );
}