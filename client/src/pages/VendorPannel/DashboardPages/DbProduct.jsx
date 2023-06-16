import React, { useState, useEffect } from 'react'
import { faEye, faPenAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DeleteProduct, getSingleUser, getVendorIdByProduct } from '../../../Utils/APIs';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Triangle } from 'react-loader-spinner';

const DbProduct = ({ Vendor }) => {
  const navigate = useNavigate()
  const [vendorproduct, setvendorproduct] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const [totalRecords, settotalRecords] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [vendorpromain, setvendorpromain] = useState([])
  const [search, setsearch] = useState("");

  useEffect(() => {
    GetProductAPI()
  }, [itemOffset])

  const GetProductAPI = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const {
          data: { vendors, total },
        } = await getVendorIdByProduct(res.data.user.vendor, 5, itemOffset + 1, search);
        settotalRecords(Math.ceil(total / 5));
        setisLoading(false);
        setvendorproduct(vendors);
      } else {
        setvendorproduct([]);
      }
    } catch (error) {
      toast(error);
    }
  }

  const onClickDeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      try {
        await DeleteProduct(id);
        toast.success("product deleted successfully");
      } catch (error) {
        toast.error("error while deleting product");
      } finally {
        GetProductAPI();
      }
    }
    GetProductAPI()
  };

  useEffect(() => {
    GetVendorProductAPI()
  }, [])

  const GetVendorProductAPI = async () => {
    try {
      const res = await getVendorIdByProduct(Vendor.vendor);
      setvendorpromain(res.data.vendors);
    } catch (error) {
      toast(error);
    }
  }

  const viewproduct = (productinfo) => {
    navigate(`/productlist/${productinfo}`)
  }

  const GoToNewProduct = () => {
    navigate(`/newproduct`)
  }

  const EditProduct = (editproduct) => {
    navigate(`/editproduct/${editproduct}`)
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setItemOffset(newOffset);
  };

  return (
    <div className='dbproduct-main-wrapper'>
      <div className='dbproduct-header'>
        <div>All {vendorpromain?.length || 0}</div>
        <button className='addnew-pro-btn' onClick={GoToNewProduct}><FontAwesomeIcon icon={faPlus} />add new product</button>
      </div>
      <div className="dbproduct-info">
        <div className='dbpro-search-cat'>
          <div className='dbproduct-category'>
            <select name="product_cat" id="product_cat" className="product_cat dokan-form-control chosen">
              <option value="">– All category –</option>
              {vendorproduct.length ? vendorproduct.map((element) => {
                return <option key={element.id} value={element._id}>{element.title}</option>
              }) : <p>no products yet</p>}
            </select>
            <button className='filter-product-btn' type='submit'>filter</button>
          </div>
          <form action="">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder="Search product..."
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </form>
        </div>
        <div className='pb-5'>
          <div className="table-responsive dbproduct-table dbpromain-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>color</th>
                  <th className='text-center'>InStock</th>
                  <th className='text-center'>WithDiscount Price</th>
                  <th className='text-center'>Original Price</th>
                  <th className='text-center'>Date</th>
                  <th className='text-end'>Edit</th>
                  <th className='text-end'>View</th>
                  <th className='text-end'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {vendorproduct?.length && !isLoading ? vendorproduct
                  .filter(
                    (element) =>
                      element.title
                        .toLowerCase()
                        .includes(search)
                  )
                  .map((element) => {
                    const date = moment(element.createdAt).utc().format("DD/MM/YYYY");
                    return <tr key={element.id}>
                      <td className='dbpro-img'>
                        <img src={element.image[0]} alt="img" className='img-fluid' />
                      </td>
                      <td className='text-center'>{element.title}</td>
                      <td className='text-center'>{element.attributes}</td>
                      <td className='text-center'><div className='instock'>{element.countInStock} In stock</div></td>
                      <td className='text-center'>${element.withDiscount}</td>
                      <td className='text-center'>${element.originalPrice}</td>
                      <td className='text-center'>{date}</td>
                      <td className='text-end vendorpro-delete' onClick={() => EditProduct(element._id)}>
                        <FontAwesomeIcon icon={faPenAlt} />
                      </td>
                      <td className="text-end vendorpro-delete" onClick={() => viewproduct(element._id)}>
                        <FontAwesomeIcon icon={faEye} />
                      </td>
                      <td className='text-end vendorpro-delete' onClick={() => onClickDeleteHandler(element._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  }) : !isLoading && <p>no vendor products yet</p>}
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
    </div>
  )
}

export default DbProduct