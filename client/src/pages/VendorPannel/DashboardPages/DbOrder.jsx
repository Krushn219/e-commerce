import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment/moment'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Triangle } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { DeleteOrder, getAllOrders, getOrderDelivered, getOrderPending, getOrderShipping, getSingleUser, getVendorOrderWithoutPagination } from '../../../Utils/APIs'

const DbOrder = () => {
  const [vendororder, setvendororder] = useState([])
  const [vendororderP, setvendororderP] = useState([])
  const [orderdelivered, setorderdelivered] = useState({})
  const [ordershipping, setordershipping] = useState({})
  const [orderpending, setorderpending] = useState({})
  const [orderId, setOrderId] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const [totalRecords, settotalRecords] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [orderCount, setorderCount] = useState()

  var date = new Date()
  const currentdate = moment(date).utc().format("DD/MM/YYYY");

  useEffect(() => {
    GetOrderDeliveredAPI()
    GetOrderShippingAPI()
    GetOrderPendingAPI()
    OrderallAPI()
    GetVendorOrderAPI()
    GetVendororderCount()
  }, [])

  const GetVendorOrderAPI = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const {
          data: { allVendors, total },
        } = await getVendorOrderWithoutPagination(res.data.user?.vendor);
        settotalRecords(Math.ceil(total / 5));
        setisLoading(false);
        setvendororder(allVendors);
        setvendororderP(allVendors.slice(0, 5))
      } else {
        setvendororder([]);
      }
    } catch (error) {
      toast(error);
    }
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setvendororderP(vendororder.slice((newOffset * 5), ((vendororder.length - (newOffset * 5) > 5) ? (newOffset * 5) + 5 : (newOffset * 5) + (vendororder.length - (newOffset * 5)))))
    setItemOffset(newOffset);
  };

  const onClickDeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this order")) {
      try {
        await DeleteOrder(id);
        toast.success("order deleted successfully");
      } catch (error) {
        toast.error("error while deleting order");
      } finally {
        GetVendorOrderAPI();
      }
    }
    GetVendorOrderAPI()
  };

  const GetOrderDeliveredAPI = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const res2 = await getOrderDelivered(res.data.user.vendor);
        setorderdelivered(res2.data.allvendor[0]);
      } else {
        setorderdelivered([]);
      }
    } catch (error) {
      toast(error);
    }
  }

  const GetVendororderCount = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const res2 = await getVendorOrderWithoutPagination(res.data.user.vendor);
        setorderCount(res2.data.allVendors);
      } else {
        setorderCount([]);
      }
    } catch (error) {
      toast(error);
    }
  }

  const GetOrderShippingAPI = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const res2 = await getOrderShipping(res.data.user.vendor);
        setordershipping(res2.data.allvendor[0]);
      } else {
        setordershipping([]);
      }
    } catch (error) {
      toast(error);
    }
  }

  const GetOrderPendingAPI = async () => {
    try {
      const res2 = await getOrderPending();
      setorderpending(res2.data.allorder);
    } catch (error) {
      toast(error);
    }
  }

  const OrderallAPI = async () => {
    try {
      const res = await getAllOrders();
      setOrderId(res.data.orders);
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className='vendor-order-wrapper'>
      <div className='vendor-order-detail'>
        <p>All ({orderCount?.length || 0}) | Completed ({orderdelivered?.quantity || 0}) | Processing ({orderpending?.length || 0}) | Shipping ({ordershipping?.quantity || 0})</p>
      </div>
      <div className='vendor-order-info'>
        <div className='vendor-order-date'>
          <span>{currentdate}</span>
        </div>
        {/* <div className='main-export-btns'>
          <button className='export-btn export-btn1'>Export All</button>
          <button className='export-btn'>Export Filtered</button>
        </div> */}
      </div>
      <div className='pb-5'>
        <div className="table-responsive dbproduct-table dborder-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th className='text-center'>Name</th>
                <th className='text-center'>Quantity</th>
                <th className='text-center'>Price</th>
                <th className='text-center'>Original Price</th>
                <th className='text-end'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {vendororderP.length && !isLoading ? vendororderP.map((element) => {
                return <tr key={element.id}>
                  <td className='dborder-img'><img src={element?.productId?.image[0]} className='img-fluid' alt='img' /></td>
                  <td className='text-center'>{element?.productId?.title}</td>
                  <td className='text-center'>{element?.quantity}</td>
                  <td className='text-center'>${element?.productId?.withDiscount}</td>
                  <td className='text-center'>${element?.productId?.originalPrice}</td>
                  <td className='text-end' onClick={() => onClickDeleteHandler(orderId[1]._id)}><FontAwesomeIcon icon={faTrash} /></td>
                </tr>
              }) : !isLoading && <p className='ps-3'>no orders yet</p>
              }
              <tr>
                <td colSpan="10">
                  {isLoading && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Triangle color="var(--theme-color)" />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
            <tr>
              <td colspan="7">
                <ReactPaginate
                  pageCount={totalRecords}
                  onPageChange={handlePageClick}
                  disabledClassName="disabled"
                  previousLabel="previous"
                  nextLabel="next"
                  breakLabel="..."
                  breakClassName="break-me"
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  subContainerClassName="pages pagination"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DbOrder