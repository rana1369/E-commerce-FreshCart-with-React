import React, {  useContext, useEffect, useState } from 'react';
import   './Cart.css';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import heart from '../../assets/images/heart-441.png'
import avater from '../../assets/images/anonymous_avatars_grey_circles.jpg';
export default function Cart() {
  const [cartdetails, setCartdetails] = useState(null);
  const [orders, setorders] = useState([]);
  const [wishlist, setwishlist] = useState([]);
  const [Profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);

  const [orderState, setorderState] = useState('Delivered');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [IsselectedOrder, setIsSelectedOrder] = useState(false);
  const [IsOrder, setIsOrder] = useState(true);
  const [IsWish, setIsWish] = useState(false);
  const [IsProfile, setIsProfile] = useState(false);
  const [IsAddress, setIsAddress] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [details, setDetails] = useState('');
  let { getLoggedUserCart } = useContext(cartContext);
  let { getUserOrders } = useContext(cartContext);  
  let { getwishList } = useContext(cartContext);  
  let { addAddress } = useContext(cartContext);  
  let { getAddress } = useContext(cartContext);  

  let { updateCart } = useContext(cartContext); 
  let { RemoveProductFromCart } = useContext(cartContext); 
  const [activeTab, setActiveTab] = useState('');
 
  const handleTabClick = (tabName) => { 
    setActiveTab(tabName);
    if(tabName=== 'order'){   
      setIsOrder(true);
      setIsWish(false); 
      setIsAddress(false);
      setIsProfile(false);
    }
    else if(tabName === 'wishlist'){
      setIsWish(true);
      let response =  getwishList();
      setwishlist(response.data);
      console.log("wishlist",wishlist)
      setIsOrder(false);
      setIsAddress(false);
      setIsProfile(false);
      
    }
    else if(tabName === 'profil'){
      setIsWish(false);
      setIsOrder(false);
      setIsAddress(false);  
      setIsProfile(true);
    }
    else if(tabName === 'addresses'){
      setIsWish(false);
      setIsOrder(false);
      setIsAddress(true);
      setIsProfile(false);
      let response =  getAddress();
      console.log(response)
      setAddress(response.data);
    }
  };

  useEffect(() => {
    getCart();
    getAllOrder();              
  }, []);

  async function getCart() {
    let response = await getLoggedUserCart();
    setCartdetails(response.data.data);
  }

async function AddNewAddress(name,details,phone, city){
  let response = await addAddress(name,details,phone,city);
 if (response.statusMsg === "success") {
  toast.success("Address Added Successfully" ,{duration:1000})
  
}
else{
 toast.error('Fail To Add Address',{duration:1000})
}
}
  async function getAllOrder() {
    if(localStorage.getItem('userId')) {
    const userId= localStorage.getItem('userId');

    let response = await getUserOrders(userId);
     setProfile(response.data[0]?.user)
    
     for(let item in response.data){
      if(item.isDelivered === false){
        stateOrder(false);
     }
     else{
      stateOrder(true);
     } }
    setorders(response.data);
    }
 
    
  }
   function stateOrder(isDelivered){
    if(isDelivered===false)
    {
      setorderState('Delivered')
    }
    else{
      setorderState('Pending')
    }
   }
  const orderDetails= (order) => {
    setIsSelectedOrder(true);
    setSelectedOrder(order);
    
  }
  const orderlist =()=>{
    setIsSelectedOrder(false);

  }
  async function updateProductQuantity(Id, count) {
    let response = await updateCart(Id, count);
   
    if (response?.data?.status === "success") {
      setCartdetails(response.data.data);
    } else {
      toast.error("Failed To Add Product", { duration: 1000 });
    }
  }

  async function deleteProductQuantity(Id) {
    let response = await RemoveProductFromCart(Id);

    if (response?.data?.status === "success") {
      setCartdetails(response.data.data);
      toast.success("Product Deleted successfully", { duration: 1000 });
    } else {
      toast.error("Failed To Delete Product", { duration: 1000 });
    }
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-3 dash">
          <div className="dash-tab ">
            <Link
              className={activeTab === "order" ? "active" : ""}
              onClick={() => handleTabClick("order")}
            >
              <i className="fa-solid fa-bag-shopping fa-lg"></i> Orders
            </Link>
          </div>
          <div className="dash-tab ">
            <Link
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => handleTabClick("wishlist")}
            >
              <i class="fa-regular fa-heart"></i> Wishlist
            </Link>
          </div>
          <div className="dash-tab ">
            <Link
              className={activeTab === "profil" ? "active" : ""}
              onClick={() => handleTabClick("profil")}
            >
              <i class="fa-solid fa-user fa-lg"></i> Profile Info
            </Link>
          </div>
          <div className="dash-tab ">
            <Link
              className={activeTab === "addresses" ? "active" : ""}
              onClick={() => handleTabClick("addresses")}
            >
              <i class="fa-solid fa-location-dot"></i> Addresses
            </Link>
          </div>
        </div>
        {IsOrder ? (
          <div className="col-lg-9 order-table">
            {IsselectedOrder ? (
              <div className="order">
                <div className="d-flex justify-content-between">
                  <h1 className="fw-bold">
                    <i className="fa-solid fa-bag-shopping fa-lg text-main"></i>
                    Order Details
                  </h1>
                  <div>
                    <button
                      onClick={() => orderlist()}
                      className="btn rounded-3 delivered "
                    >
                      Order List
                    </button>
                  </div>
                </div>

                <div id="bar-progress" class="mb-5 mt-lg-0">
                  <div class="step step-active">
                    <span class="number-container d-flex justify-content-center align-items-center">
                      <span class="number">
                        <i class="fa-solid fa-box fa-2xl"></i>
                      </span>
                    </span>
                  </div>
                  <div class="seperator"></div>
                  <div class="step">
                    <span class="number-container d-flex justify-content-center align-items-center">
                      <span class="number">
                        <i class="fa-solid fa-truck fa-2xl"></i>
                      </span>
                    </span>
                  </div>
                  <div class="seperator"></div>
                  <div class="step">
                    <span class="number-container d-flex justify-content-center align-items-center">
                      <span class="number">
                        <i class="fa-solid fa-check fa-2xl"></i>
                      </span>
                    </span>
                  </div>
                </div>

                <div className="cart mb-2">
                  {selectedOrder.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex align-items-center my-1"
                    >
                      <img
                        className="image-item"
                        src={item.product.imageCover}
                      />
                      <h6 className="ms-1">{item.product.title}</h6>
                    </div>
                  ))}
                </div>

                <div className="row ms-1">
                  <div className="cart me-5 col-lg-6 h-50 col-sm-12">
                    <h6 className="fw-bold">Shipping Address</h6>
                    <p>{selectedOrder.shippingAddress.city}</p>
                  </div>
                  <div className="col-lg-5 col-sm-12 cart">
                    <h6 className="fw-bold">Total Summary</h6>
                    <p className="text-black-50 d-flex justify-content-between">
                      <span> tax Price</span>
                      <span>{selectedOrder.taxPrice}</span>
                    </p>
                    <p className="text-black-50 d-flex justify-content-between">
                      <span> Shipping fee</span>
                      <span>{selectedOrder.shippingPrice}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <span>Total Price:</span>{" "}
                      <span>{selectedOrder.totalOrderPrice} L.E</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="order">
                <h1 className="fw-bold">
                  <i className="fa-solid fa-bag-shopping fa-lg text-main"></i>{" "}
                  All Orders
                </h1>

                <div className="tableFixHead">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"># Order</th>
                        <th scope="col">Status</th>
                        <th scope="col">Data</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="align-items-center">
                          <td>{order._id}</td>

                          <td>
                            <div
                              className={
                                orderState === "Pending"
                                  ? "pending rounded-pill text-center h-50"
                                  : "delivered rounded-pill text-center h-50"
                              }
                            >
                              {orderState}
                            </div>
                          </td>
                          <td>{order.createdAt}</td>
                          <td>{order.totalOrderPrice} L.E</td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => orderDetails(order)}
                          >
                            <i
                              class="fa-solid fa-arrow-right mx-4"
                              style={{ color: "silver" }}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                 
                </div>
              </div>
            )}
          </div>
        ) : null}

        {IsWish ? (
          <div className="col-lg-9 wish-table">
            <div className="wish">
              <h1 className="fw-bold">
                <i class="fa-solid fa-heart text-main"></i> My Wish List
              </h1>

              <div className="cart text-center">
                <img className="w-25 " src={heart} alt="brokenHeart" />
                <p className="text-center fw-medium">
                  No Product in Your WishList
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {IsProfile ? (
          <div className="col-lg-9 wish-table">
            <div className="profile">
              <h1 className="fw-bold">
                <i class="fa-solid fa-user fa-lg text-main"></i> My Profile
              </h1>

              <div className="cart text-center">
                <div className="row">
                  <div className="col-lg-3">
                    <img className="w-100" src={avater} alt="avater" />
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label>Name :</label>
                      <input
                        className="border-0 w-75"
                        readOnly
                        value={Profile.name}
                      />
                    </div>
                    <div>
                      <label>E-Mail :</label>
                      <input
                        className="border-0 w-75"
                        readOnly
                        value={Profile.email}
                      />
                    </div>
                    <div>
                      <label>Phone :</label>
                      <input
                        className="border-0 w-75"
                        readOnly
                        value={Profile.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {IsAddress ? (
          <div className="col-lg-9 wish-table">
            <div className="profile">
              <div className="d-flex justify-content-between">
                <h1 className="fw-bold">
                  <i className="fa-solid fa-location-dot text-main"></i> My
                  Addresses
                </h1>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="btn rounded-3 delivered"
                  >
                    <i className="fa-solid fa-plus text-main"></i> Add Address
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            New Address
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div>
                            <div className="row mb-2">
                              <div className="col-lg-6 col-sm-12">
                                <label className="form-label">Name</label>
                                <input
                                  className="form-control"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              <div className="col-lg-6 col-sm-12">
                                <label className="form-label">City</label>
                                <input
                                  className="form-control"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-lg-6 col-sm-12">
                                <label className="form-label">Details</label>
                                <input
                                  className="form-control"
                                  value={details}
                                  onChange={(e) => setDetails(e.target.value)}
                                />
                              </div>
                              <div className="col-lg-6 col-sm-12">
                                <label className="form-label">Phone</label>
                                <input
                                  className="form-control"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            onClick={() =>
                              AddNewAddress(name, details, phone, city)
                            }
                            type="button"
                            className="btn text-white bg-main"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart d-flex justify-content-between">
                <span>{address?.name || 'Office'}</span>
                <span>{address?.details || '437 N. 6th Street'}</span>
                <span>{address?.phone || '1234567890'}</span>
                <div>
                  <span style={{ cursor: 'pointer' }} className='me-2'>
                    <i className="fa-solid fa-pen"></i>
                  </span>
                  <span style={{cursor: 'pointer'}}>
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
    
  
}
