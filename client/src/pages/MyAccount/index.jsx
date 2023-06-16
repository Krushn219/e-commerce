import React from 'react'
import './style.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChalkboard, faImage } from '@fortawesome/free-solid-svg-icons'
import { LOGOUT_REQUEST } from '../../store/actions/types'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getSingleUser } from '../../Utils/APIs'
import { useState, useEffect } from 'react'
import ViewModalSignIn from '../../Components/ViewModalSignIn'
import OrderHistory from '../OrderHistory'
import Store from '../VendorSettings/Store'
import OrderHistoryDetail from '../OrderHistoryDetail'
import Wishlist from '../Wishlist'
import EditAccount from '../../Components/EditAccount'
import ViewModalsmLogin from '../../Components/ViewModalsmLogin'
import UpdateAddress from '../UpdateAddress'

const MyAccount = () => {
	const { addressid, orderid } = useParams()
	const [vendorid, setvendorid] = useState("")
	const dispatch = useDispatch()
	const [modalShow, setModalShow] = useState(false);
	const [ModalLoginShow, setModalLoginShow] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const [activetab, setactivetab] = useState(0)

	const setTab = (id) => {
		setactivetab(id)
		if (id === 0) {
			navigate(`/profile`)
		} else if (id === 1) {
			navigate(`/order-history`)
		} else if (id === 2) {
			navigate(`/wishlist`)
		} else if (id === 3) {
			navigate(`/orderhistory-detail/${orderid}`)
		} else if (id === 4) {
			navigate(`/edit-account`)
		} else if (id === 5) {
			navigate(`/update-address/${addressid}`)
		}
	}

	useEffect(() => {
		if (location.pathname === `/profile`) {
			setactivetab(0)
		} else if (location.pathname === `/order-history`) {
			setactivetab(1)
		} else if (location.pathname === `/wishlist`) {
			setactivetab(2)
		} else if (location.pathname === `/orderhistory-detail/${orderid}`) {
			setactivetab(3)
		} else if (location.pathname === `/edit-account`) {
			setactivetab(4)
		} else if (location.pathname === `/update-address/${addressid}`) {
			setactivetab(5)
		}
	}, [location.pathname])

	useEffect(() => {
		GetUserAPI()
	}, [])

	const logout = () => {
		dispatch({ type: LOGOUT_REQUEST });
		navigate(`/`)
	};

	useEffect(() => {
		GetUserAPI()
	}, [])

	const GetUserAPI = async () => {
		try {
			const res = await getSingleUser();
			setvendorid(res.data.user.vendor);
		} catch (error) {
			toast(error);
		}
	}

	const closeModal = () => setModalShow(false);

	const closeModalLogin = () => setModalLoginShow(false)

	return (
		<>
			<ViewModalSignIn show={modalShow} onHide={closeModal} />
			<ViewModalsmLogin show={ModalLoginShow} onHide={closeModalLogin} />
			<div className="vendor-pannel-dashboard">
				<div className="container">
					<div className="py-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									My Account
								</li>
							</ol>
						</nav>
					</div>
					<div className='my-account-wrapper'>
						<div className="row">
							<div className="col-lg-3">
								<div className="vendor-pannel-sidebar">
									<ul className="dashboard-menu">
										<li className={activetab === 0 ? 'db-link active' : 'db-link'} onClick={() => setTab(0)}><FontAwesomeIcon icon={faChalkboard} />Profile</li>
										<li className={activetab === 1 ? 'db-link active' : 'db-link'} onClick={() => setTab(1)}><FontAwesomeIcon icon={faImage} />Order History</li>
										<li className={activetab === 2 ? 'db-link active' : 'db-link'} onClick={() => setTab(2)}><FontAwesomeIcon icon={faCartShopping} />Wishlist</li>
										<li className='p-0'><button type='button' className='back-account mb-0 m-0 w-100 py-3' onClick={() => { logout(); setModalShow(true); setModalLoginShow(true) }}>Sign out</button></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-9">
								<div className='dashboard-pages'>
									{activetab === 0 && <Store setTab={(id) => setTab(id)} />}
									{activetab === 1 && <OrderHistory setTab={(id) => setTab(id)} />}
									{activetab === 2 && <Wishlist setTab={(id) => setTab(id)} />}
									{activetab === 3 && <OrderHistoryDetail setTab={(id) => setTab(id)} />}
									{activetab === 4 && <EditAccount setTab={(id) => setTab(id)} />}
									{activetab === 5 && <UpdateAddress setTab={(id) => setTab(id)} />}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='text-center ms-0 mt-3'>
					{vendorid ? <Link to='/vendor-dashboard'><button type='button' className='back-account'>Back to Vendor Dashboard</button></Link> : ''}
				</div>
				<div className='text-center ms-0'>

				</div>
			</div>
		</>
	)
}

export default MyAccount