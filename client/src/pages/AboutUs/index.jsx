import React from 'react'
import './style.css'
import aboutMain from '../../assets/Images/about-main.svg'
import { Link } from 'react-router-dom';


const AboutUs = () => {
  return (
    <div className="about-inner-wrappermain">
    	<div className="container">
    		<div className='pt-3'>
    			<nav aria-label="breadcrumb">
    				<ol className="breadcrumb">
    					<li className="breadcrumb-item">
    						<Link to="/">Home</Link>
    					</li>
    					<li className="breadcrumb-item active" aria-current="page">About Us</li>
    				</ol>
    			</nav>
    		</div>
    		<div>
    			<div className='pb-5'>
    				<div className="about-inner-second-wrapper">
    					<div className="row">
    						<div className="col-lg-4 col-md-12 col-sm-12">
    							<div className="about-inner-item">
    								<h2>Our company</h2>
    								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate, aperiam hic autem
    									tempora quisquam quo rem laboriosam ducimus . Lorem ipsum dolor sit amet consectetur adipisicing
    									elit. Dignissimos, aspernatur!</p>
    								<ul>
    									<li>Green Speed Help To Reach Top In Google Search Engine.</li>
    									<li>Top Quality Product.</li>
    									<li>Quick Customer Support.</li>
    									<li>Premium User Friendly UX.</li>
    									<li>100% SEO Friendly Structure.</li>
    								</ul>
    							</div>
    						</div>
    						<div className="col-lg-4 col-md-12 col-sm-12">
    							<div className='about-inner-item text-center'>
    								<div>
    									<h2>Our Team</h2>
    								</div>
    								<div>
    									<img src={aboutMain} alt="img" className='img-fluid' />
    								</div>
    								<div>
    									<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt culpa nemo odit, hic
    										corrupti ipsum omnis quisquam adipisci dolorum et. Quibusdam sit minus vel repudiandae aliquam,
    										ullam, repellendus fugit impedit saepe rem, sed at.</p>
    								</div>
    							</div>
    						</div>
    						<div className="col-lg-4 col-md-12 col-sm-12">
    							<div className="about-inner-item">
    								<h2>Testimonials</h2>
    								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate, aperiam hic autem
    									tempora quisquam quo rem laboriosam ducimus .<span>- john Doe</span></p>
    								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate, aperiam hic autem
    									tempora quisquam quo rem laboriosam ducimus .<span>- Rani Pauri</span></p>
    								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate, aperiam hic autem
    									tempora quisquam quo rem laboriosam ducimus . <span>- Kiran Shah</span></p>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  )
}

export default AboutUs