import React from 'react'
import { Link } from 'react-router-dom'
import privacypolicy from '../../assets/Images/privacy-policy.svg'

const PrivacyPolicy = () => {
  return (
    <div className='privacy-policy-wrapper terms-condition-use-wrapper'>
	<div className="container">
		<div className='pt-3'>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
				</ol>
			</nav>
		</div>
		<div className='terms-condition-use-main-wrapper'>
			<div className='terms-codition-use-wrapper2'>
				<div className='text-center terms-of-use-img'>
					<img src={privacypolicy} alt="img" className='img-fluid' />
				</div>
				<div className='terms-title'>
					<h4>Demo Template Privacy Policy</h4>
				</div>
				<div>
					<h5>Transaction and Account Security</h5>
					<p>We know how important account security is to you, and we've taken several steps to help keep your Amazon Payments account information secure. There are also some steps you can take to protect your personal information and your account.</p>
				</div>
				<div>
					<h5 className='mt-4'>What is the most secure method of payment?</h5>
					<p>Credit cards offer users a high-security level, as financial institutions protect their account holders. However, when it comes to online payment types precisely, PayPal is one of the safest forms of payment today. The platform offers reliable and safe checkout capabilities from millions of websites where your card information and account details are never stored.</p>
				</div>
				<div>
					<h5 className='mt-4'>Payment Processing vs Payment Gateway</h5>
					<p>Payment processing is the method by which transactions are facilitated. Payment processors include card readers and point of sale systems that communicate the financial information between a merchant and the customer’s bank account. As a business owner, you will need to know how to use payment processors to accept credit card payments for successful card processing.</p>
					<p className='mt-3'>These systems are able to process all types of payment methods, including your business’ gift card transactions.</p>
				</div>
				<div>
					<h5 className='mt-4'>EMV-Enabled Credit Cards</h5>
					<p className='mt-3'>Also called “chip and PIN” or “chip and signature” cards, these smart credit cards are designed to be more secure than traditional cards that require only a user’s signature.</p>
					<p className='my-3'>Pros: These cards have an integrated chip that creates a new authentication code for every transaction, so it adds an additional layer of payment security. Also, the cards can’t be “cloned,” which is a hacker’s way of stealing information from a traditional card’s magnetic strip and making a new card.</p>
					<p className='mb-4'>Cons: Even though many retailers have readers that can accept these cards, and federal law has motivated the shift by transferring payment fraud liability from the credit card issuer to the merchant processing the payment, not every restaurant, shop, or venue has the technology to read them. You can still use the cards by swiping and giving your signature, but you’ll miss out on the extra security the chips provide.</p>
				</div>
                <div>
					<h5>Bank Checks</h5>
					<p className='mt-4'>With online banking growing in popularity over the last decade, many people write only a few checks per year, and that may be a good thing. Banks are attempting to put more payment security controls in place, but check scams are still far too common.</p>
					<p className='my-3'>Pros: For one-time payments (such as magazine subscriptions, charity donations, or monetary wedding gifts), checks can be a convenient payment method.</p>
					<p className='mb-4'>Cons: Checks not only feature your name and address but also your bank account and bank routing numbers. Worse, they give identity thieves an example of your signature. Because of this, you should send checks only to people or companies you trust, and regularly review your bank transactions to look for fraudulent check amounts.</p>
				</div>
			</div>
		</div>
	</div>
    </div>
  )
}

export default PrivacyPolicy
