import React,{ useState, useEffect } from 'react'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './DashboardPages/Dashboard'
import DbOrder from './DashboardPages/DbOrder'
import DbProduct from './DashboardPages/DbProduct'
import Settings from './DashboardPages/Settings'
import Withdraw from './DashboardPages/Withdraw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCalendar, faCartShopping, faChalkboard, faCircleXmark, faCogs, faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import EditAccount from '../../Components/EditAccount'
import { getSingleUser } from '../../Utils/APIs'
import { toast } from 'react-toastify'
import { LOGOUT_REQUEST } from '../../store/actions/types'
import { useDispatch } from 'react-redux'

const VendorPannel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const [Vendor, setvendor] = useState({})
  const [activetab, setactivetab] = useState(0)

  const setTab = (id) => {
    setactivetab(id)
    if (id === 0) {
      navigate(`/vendor-dashboard`)
    } else if (id === 1) {
      navigate(`/vendor-products`)
    } else if (id === 2) {
      navigate(`/vendor-orders`)
    } else if (id === 3) {
      navigate(`/vendor-withdraw`)
    } else if (id === 4) {
      navigate(`/vendor-settings`)
    } else if (location.pathname === `/edit-account-details`) {
      setactivetab(5)
    }
  }

  useEffect(() => {
    if (location.pathname === `/vendor-dashboard`) {
      setactivetab(0)
    } else if (location.pathname === `/vendor-products`) {
      setactivetab(1)
    } else if (location.pathname === `/vendor-orders`) {
      setactivetab(2)
    } else if (location.pathname === `/vendor-withdraw`) {
      setactivetab(3)
    } else if (location.pathname === `/vendor-settings`) {
      setactivetab(4)
    } else if (location.pathname === `/edit-account-details`) {
      setactivetab(5)
    }
  }, [location.pathname])

  useEffect(() => {
    GetUserAPI()
  }, [])

  const GetUserAPI = async () => {
    try {
      const res = await getSingleUser();
      setvendor(res.data.user);
    } catch (error) {
      toast(error);
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT_REQUEST });
  };

  const goToVendor = () => {
    navigate(`/vendor/${Vendor.vendor}`)
  }

  return (
    <div className="vendor-pannel-dashboard">
      <div className="container">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
        <div className="row pb-5">
          <div className="col-lg-3">
            <div className="vendor-pannel-sidebar">
              <ul className="dashboard-menu">
                <li className={activetab === 0 ? 'db-link active' : 'db-link'} onClick={() => setTab(0)}><FontAwesomeIcon icon={faChalkboard} />Dashboard</li>
                <li className={activetab === 1 ? 'db-link active' : 'db-link'} onClick={() => setTab(1)}><FontAwesomeIcon icon={faImage} />Products</li>
                <li className={activetab === 2 ? 'db-link active' : 'db-link'} onClick={() => setTab(2)}><FontAwesomeIcon icon={faCartShopping} />Orders</li>
                <li className={activetab === 3 ? 'db-link active' : 'db-link'} onClick={() => setTab(3)}><FontAwesomeIcon icon={faCalendar} />Withdraw</li>
                <li className={activetab === 4 ? 'db-link active' : 'db-link'} onClick={() => setTab(4)}><FontAwesomeIcon icon={faCogs} />Settings</li>
                <div className='vendor-icons'>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} onClick={goToVendor} />
                  <Link to='/edit-account-details'><FontAwesomeIcon icon={faUser} className={activetab === 5 ? 'vendor-user-icon db-link active' : 'vendor-user-icon db-link'} onClick={() => setTab(5)} /></Link>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={logout} className='log-out' />
                </div>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className='dashboard-pages'>
              {activetab === 0 && <Dashboard setTab={(id) => setTab(id)} Vendor={Vendor} />}
              {activetab === 1 && <DbProduct setTab={(id) => setTab(id)} Vendor={Vendor} />}
              {activetab === 2 && <DbOrder setTab={(id) => setTab(id)} />}
              {activetab === 3 && <Withdraw setTab={(id) => setTab(id)} />}
              {activetab === 4 && <Settings setTab={(id) => setTab(id)} />}
              {activetab === 5 && <EditAccount setTab={(id) => setTab(id)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorPannel