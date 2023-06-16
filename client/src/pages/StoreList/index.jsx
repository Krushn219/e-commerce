import React, { useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import grid from '../../assets/Images/grid2.svg'
import StoreList1 from '../../Components/StoreList1'
import StoreList2 from '../../Components/StoreList2'
import { getVendor } from '../../Utils/APIs'
import { toast } from 'react-toastify'

const StoreList = () => {
  const [activetab, setactiveTab] = useState(1)
  const [filter, setfilter] = useState(false)
  const [storelist, setstorelist] = useState([])
  const [search, setsearch] = useState("");

  const FilterOpen = () => {
    setfilter(!filter)
  }

  useEffect(() => {
    GetallVendorAPI()
  }, [])

  const GetallVendorAPI = async () => {
    try {
      const res = await getVendor();
      setstorelist(res.data.vendors);
    } catch (error) {
      toast(error);
    }
  }

  return (
    <div className="category-main-wrapper vendor-storelist-wrapper">
      <div className="container">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Store List
              </li>
            </ol>
          </nav>
        </div>
        <div className='vendor-list-wrapper pb-5'>
          <div className='d-flex align-items-center justify-content-between main-list-wrap'>
            <div className='d-flex align-items-center'>
              <div className='store-filter-btn d-flex align-items-center' onClick={FilterOpen}>
                <FontAwesomeIcon icon={faList} />
                <button>filter</button>
              </div>
              <p className='total-storing'>Total Store Showing {storelist?.length}</p>
            </div>
            <div className="d-flex">
              <div className="dropdown-category d-flex align-items-center">
                <p>Sort By : </p>
                <select className="ms-2">
                  <option>Default</option>
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                </select>
              </div>
              <p className='mb-0 d-flex align-items-center list-icons'>
                <img
                  className={activetab === 0 ? "grid-img active" : "grid-img"}
                  onClick={() => setactiveTab(0)}
                  src={grid}
                  alt="img"
                />
                <FontAwesomeIcon
                  icon={faList}
                  className={activetab === 1 ? "grid-img active" : "grid-img"}
                  onClick={() => setactiveTab(1)}
                />
              </p>
            </div>
          </div>
          <div className='vendor-search-wrapper'>
            <div className={filter ? 'vendor-search-form active' : 'vendor-search-form'}>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Search Vendors"
                  onChange={(e) => setsearch(e.target.value)} />
                <button type="submit">Apply</button>
              </div>
            </div>
          </div>
          <div className="vendor-store-main-wrapper pt-4">
            <div className="row" >
              {activetab === 0 && <StoreList1 storelist={storelist} search={search} />}
            </div>
            {activetab === 1 && <StoreList2 storelist={storelist} search={search} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreList
