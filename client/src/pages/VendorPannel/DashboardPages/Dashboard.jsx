import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faImage, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getOrderDelivered, getOrderMonth, getOrderPending, getOrderShipping, getProducts, getSingleUser, getVendorIdByProduct, getVendorOrder, getVendorOrderWithoutPagination } from '../../../Utils/APIs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { filterProducts } from '../../../Utils/Data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Sales total",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//     {
//       label: "Number of orders",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]
// };

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};

const options = {
  title: {
    display: true,
    text: "Chart Title"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  }
};

const Dashboard = () => {
  const navigate = useNavigate()

  const [orderdelivered, setorderdelivered] = useState({})
  const [ordershipping, setordershipping] = useState({})
  const [orderpending, setorderpending] = useState({})
  const [vendorOrder, setvendorOrder] = useState()
  const [vendorproduct, setvendorproduct] = useState([])
  const [ordermonth, setordermonth] = useState({ data: [], labels: [] });
  const [Total, setTotal] = useState()
  const [Earning, setEarning] = useState()
  const [availableproduct, setavailableproduct] = useState([])

  useEffect(() => {
    getVendor()
  }, [])

  const getVendor = async  () => {
    getSingleUser().then((res) => {
      GetOrderDeliveredAPI()
      GetOrderPendingAPI()
      GetOrderShippingAPI()
      GetVendorOrderAPI(res.data.user.vendor)
      GetVendorProductAPI(res.data.user.vendor)
      getDataOrderByMonth()
      AvailabilityAPI() 
    });
  }

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

  const goToAddProduct = () => {
    navigate(`/newproduct`)
  }

  const GetVendorOrderAPI = async (id) => {
    try {
      const res = await getVendorOrderWithoutPagination(id);
      setvendorOrder(res.data.allVendors);
    } catch (error) {
      toast(error);
    }
  }

  const GetVendorProductAPI = async (id) => {
    try {
      const res = await getVendorIdByProduct(id);
      setvendorproduct(res.data.vendors);
    } catch (error) {
      toast(error);
    }
  }

  useEffect(() => {
    let total = 0;
    let earnings = 0;
    vendorOrder?.forEach((item) => {
      total += item?.productId?.withDiscount * item.quantity;
      earnings += item?.productId?.originalPrice * item.quantity;
    });
    setTotal(total);
    setEarning(earnings - total)
  }, [vendorOrder]);

  const getDataOrderByMonth = async () => {
    const { data } = await getOrderMonth();
    setordermonth({
      data: data.map((i) => i.Order),
      labels: data.map((i) => toMonthName(i._id.month)),
    });
  };

  const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", {
      month: "long",
    });
  };

  const AvailabilityAPI = async () => {
    try {
      setavailableproduct([]);
      const res = await getProducts("isAvailable=true");
      setavailableproduct(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className='dashboard-wrapper'>
      <div className="row">
        <div className="col-lg-6">
          <div>
            <ul className='db-sale-title'>
              <li>
                <div>Sales</div>
                <p>${Total}</p>
              </li>
              <li>
                <div>Earning</div>
                <p>${Earning}</p>
              </li>
              <li>
                <div>Order</div>
                <p>{vendorOrder?.length}</p>
              </li>
            </ul>
            <div className='db-sale-orders'>
              <div className='db-sale-orders-header'>
                <FontAwesomeIcon icon={faShoppingBag} />Orders
              </div>
              <div className="table-responsive">
                <table>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td className='text-end'>{vendorOrder?.length || 0}</td>
                    </tr>
                    <tr>
                      <td>Completed</td>
                      <td className='text-end'>{orderdelivered?.quantity || 0}</td>
                    </tr>
                    <tr>
                      <td>Processing</td>
                      <td className='text-end'>{orderpending?.length || 0}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td className='text-end'>{ordershipping?.quantity || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='db-sale-orders'>
              <div className='db-sale-orders-header db-sale-products'>
                <div>
                  <FontAwesomeIcon icon={faImage} />Products
                </div>
                <div onClick={goToAddProduct} className='add-new-pro-main'>+ Add New Product</div>
              </div>
              <div className="table-responsive">
                <table>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td className='text-end'>{vendorproduct?.length || 0}</td>
                    </tr>
                    <tr>
                      <td>Live</td>
                      <td className='text-end'>{availableproduct.length || 0}</td>
                    </tr>
                    <tr>
                      <td>Offline</td>
                      <td className='text-end'>{vendorproduct?.length - availableproduct.length || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className='db-sale-orders'>
            <div className='db-sale-orders-header'>
              <FontAwesomeIcon icon={faCalendar} />Sales This Month
            </div>
            <Line
              data={{
                labels: ordermonth.labels,
                datasets: [
                  {
                    label: "Order Month",
                    data: ordermonth.data,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                  },
                ],
              }}
              legend={legend}
              options={options}
              className='canvas-graph img-fluid'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard