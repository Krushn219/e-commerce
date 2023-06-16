import React,{ useState, useEffect } from 'react'
import '../style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCreditCard, faArrowLeftLong, faHome, faCircleXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import Store from '../../VendorSettings/Store'
import Payment from '../../VendorSettings/Payment'
import { useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../../../store/actions/types';
import { getSingleUser } from '../../../Utils/APIs';
import { toast } from 'react-toastify';

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [activetab, setactivetab] = useState(0)
  const [vendor, setvendor] = useState()

  const setTab = (id) => {
    setactivetab(id)
    if (id === 0) {
      navigate(`/store`)
    } else if (id === 1) {
      navigate(`/payment`)
    }  
  }

  useEffect(() => {
    if (location.pathname === `/store`) {
      setactivetab(0)
    } else if (location.pathname === `/payment`) {
      setactivetab(1)
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
    navigate(`/vendor/${vendor.vendor}`)
  }

  return (
    <div className='vendor-settings-wrapper'>
      <div className="container">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Settings
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="vendor-pannel-sidebar">
              <ul className="dashboard-menu">
                <li className='db-setting'><FontAwesomeIcon icon={faArrowLeftLong} /><Link to='/vendor-dashboard'>Back to Dashboard</Link></li>
                <li className={activetab === 0 ? 'db-link active' : 'db-link'} onClick={() => setTab(0)}><FontAwesomeIcon icon={faHome} />Store</li>
                <li className={activetab === 1 ? 'db-link active' : 'db-link'} onClick={() => setTab(1)}><FontAwesomeIcon icon={faCreditCard} />Payment</li>
                <div className='vendor-icons'>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} onClick={goToVendor} />
                  <Link to='/edit-account-details'><FontAwesomeIcon icon={faUser} className='vendor-user-icon' /></Link>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={logout} />
                </div>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className='dashboard-pages mb-5'>
              {activetab === 0 && <Store setTab={(id) => setTab(id)} />}
              {activetab === 1 && <Payment setTab={(id) => setTab(id)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings