import React from 'react'
import "./Footer.css"
function Footer() {
  return (
  <>
  <div className="footer">
  <div className="footer-wrap m-h-45">
    <div className="cell-footer">
      <h1>Estate Tribe</h1>
      <div className="line-under"></div>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eaque!</p>
      <div className="buttons-footer">
        <div className="circle-link">
          <a href=""><i className="fa fa-facebook"></i></a>
        </div>
        <div className="circle-link">
          <a href=""><i className="fa fa-twitter"></i></a>
        </div>
        <div className="circle-link">
          <a href=""><i className="fa fa-pinterest"></i></a>
        </div>
        <div className="circle-link">
          <a href=""><i className="fa fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div className="sub-cells-footer">
<div className="subcell-footer">
<h1>Rent</h1>
<div className="line-under"></div>
<a href=""><h4>Apartments</h4></a>
<a href=""><h4>Houses</h4></a>
<a href=""><h4>Office</h4></a>
<a href=""><h4>Land</h4></a>

</div>
<div className="subcell-footer">
<h1>Sell</h1>
<div className="line-under"></div>
<a href=""><h4>Apartments</h4></a>
<a href=""><h4>Houses</h4></a>
<a href=""><h4>Office</h4></a>
<a href=""><h4>Land</h4></a>

</div>
<div className="subcell-footer">
<h1>Estate tribe</h1>
<div className="line-under"></div>
<a href=""><h4>About</h4></a>
<a href=""><h4>Contact Us</h4></a>

</div>
<div className="subcell-footer">
<h1>Customers</h1>
<div className="line-under"></div>
<a href=""><h4>For Sellers</h4></a>
<a href=""><h4>For Agents</h4></a>

</div>
    </div>
  </div>
  <div className="bottom-footer-copywrite">
    <div className="line-under"></div>
   <div className="cont-flex">
    <p>Copyright © 2023 Estate Tribe.</p>
    <p>Made By ShaPages</p>
   </div>
  </div>

</div>






</>
  )
}

export default Footer