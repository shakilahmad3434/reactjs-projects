import React from 'react'
const NewsItem = ({title, description, src, url}) => {
  return (
  <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth: "360px", overflow:"hidden"}}>
  <img src={src?src:"/images/no-image.png"} style={{height: "200px", width:"340px"}} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,50)}</h5>
    <p className="card-text">{description ? description.slice(0,90): "News current event. It is information about something that has just happpened."}</p>
    <a href={url} className="btn btn-primary">Read More</a>
  </div>
</div>
  )
}

export default NewsItem