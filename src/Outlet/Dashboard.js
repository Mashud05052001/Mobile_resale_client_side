import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import { useRole } from '../CustomHook/useRole';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    // console.log(user?.email, user?.reloadUserInfo?.providerUserInfo[0]?.providerId)
    const [role, isRoleLoading] = useRole(user?.email, user?.reloadUserInfo?.providerUserInfo[0]?.providerId)
    // console.log(role, isRoleLoading)

    return (
        <section className='relative'>
            <Navbar />
            <div className='px-5 border-2 rounded-xl mb-5'>
                {
                    role === 'admin' &&
                    <div className='text-center grid grid-cols-3 font-semibold -mx-5'>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/allSeller'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center my-3'>All Seller</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/allBuyer'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>All Buyer</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/reportedItems'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>Reported Items</span>
                        </NavLink>
                    </div>
                }
                {
                    role === 'seller' &&
                    <div className='text-center grid grid-cols-3 font-semibold -mx-5'>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/addProduct'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center my-3'>Add A Products</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/products'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>My Products</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/buyers'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>My Buyers</span>
                        </NavLink>
                    </div>
                }
                {
                    role === 'buyer' &&
                    <div className='text-center grid grid-cols-2 font-semibold -mx-5'>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/orders'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center my-3'>My orders</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/dashboard/wishlist'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>My Wishlist</span>
                        </NavLink>
                        {/* <NavLink className={({ isActive }) => isActive ? '' : 'bg-primary/50'}
                            to='/'>
                            <span className='rounded-sm text-sm sm:text-base flex justify-center  my-3'>Reported Items</span>
                        </NavLink> */}
                    </div>
                }
            </div>
            <div >
                <Outlet />

            </div>
        </section>
    );
};

export default Dashboard;