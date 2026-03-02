"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShoppingCart,
  FiBookmark,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "@node_modules/react-icons/fa";
import { BiUser } from "@node_modules/react-icons/bi";
import { ImSpinner2 } from "@node_modules/react-icons/im";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;

    startTransition(() => {
      router.push(`/search?${searchValue}`);
    });
  };

  const userDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <BiUser />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-[#0D0D1A] z-[100] fixed top-0 shadow-lg transition-all">
        {/* Desktop Header */}
        <div className="hidden slg:flex items-center justify-between w-full py-3 max-w-[1440px] px-8 mx-auto">
          {/* Left - Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.15em] text-[#7C3AED] uppercase shrink-0">
            LOGO
          </Link>

          {/* Center - Nav Links */}
          <nav className="flex items-center gap-8">
            {headerNavLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition relative group ${
                  pathname === link.href ?
                    "text-[#7C3AED]"
                  : "text-gray-300 hover:text-white"
                }`}>
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Right - Search + Shop Now + Icons */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-[160px] h-9 text-sm bg-transparent border border-gray-600 rounded-md px-3 pr-8 text-white placeholder-gray-400 outline-none focus:border-[#7C3AED] transition-colors"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                <FiSearch className="text-sm" />
              </button>
            </div>

            {/* Shop Now Button */}
            <Link
              href="/category"
              className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors whitespace-nowrap">
              Shop Now
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-2 border-l border-gray-700 pl-4">
              {/* User Dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button className="flex items-center cursor-pointer group outline-none focus:ring-0 text-gray-300 hover:text-white transition">
                      <FiUser className="text-lg" />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right bg-white border border-gray-200 rounded-2xl shadow-xl p-1.5 z-[110] outline-none">
                        <div className="px-3 py-2 mb-1 border-b border-gray-100">
                          <p className="text-xs text-gray-400">Logged in as</p>
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {wc_customer_info?.first_name}
                          </p>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          {userDropDownLinks.map((item) => (
                            <Menu.Item key={item.id}>
                              {({ active }) => (
                                <button
                                  onClick={(e) => {
                                    if (item.onClick) {
                                      e.preventDefault();
                                      item.onClick();
                                    } else if (item.href) {
                                      router.push(item.href);
                                    }
                                  }}
                                  className={`${
                                    active ?
                                      "bg-gray-50 text-gray-900"
                                    : "text-gray-600"
                                  } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors`}>
                                  <span className="text-lg">{item.icon}</span>
                                  {item.label}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={`${
                                active ? "bg-red-50" : ""
                              } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 font-bold transition-colors mt-1`}>
                              <FiLogOut /> Log Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>

              {/* Cart */}
              <div
                className="relative cursor-pointer group"
                onClick={onOpenCart}>
                <FiShoppingBag className="text-lg text-gray-300 group-hover:text-white transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 size-4 bg-[#7C3AED] text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accent line - subtle purple gradient */}
        <div className="hidden slg:block h-[2px] bg-gradient-to-r from-[#7C3AED]/40 via-[#7C3AED] to-[#7C3AED]/40" />

        {/* Mobile Header (Hidden on Laptop) */}
        <div className="slg:hidden flex flex-col w-full px-3 sm:px-5 py-3 gap-3 bg-[#0D0D1A] border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerVisible(true)}
                className="p-1 -ml-1 text-white hover:text-[#7C3AED] transition-colors">
                <FiMenu className="text-xl sm:text-2xl" />
              </button>
              <Link
                href="/"
                className="text-base sm:text-lg font-bold tracking-[0.12em] text-[#7C3AED] uppercase">
                LOGO
              </Link>
            </div>

            <button
              onClick={onOpenCart}
              className="relative p-1 text-white hover:text-[#7C3AED] transition-colors">
              <FiShoppingBag className="text-xl sm:text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 size-4 sm:size-4.5 bg-[#7C3AED] rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center text-white border-2 border-[#0D0D1A]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 sm:h-11 text-sm bg-gray-900/50 text-white rounded-xl px-4 pl-10 border border-gray-700 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30 transition-all placeholder:text-gray-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors">
              {isPending ?
                <ImSpinner2 className="size-4 animate-spin text-[#7C3AED]" />
              : <FiSearch className="size-4" />}
            </div>
          </div>
        </div>

        {/* Conditional Bottom Headers */}
        {pathname.includes("/category") ?
          <CategoryPageBottomHeader />
        : pathname.includes("/home-item") ?
          <ProductPageBottomHeader />
        : <HomePageBottomHeader />}
      </header>

      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768 ?
            500
          : "100%"
        }>
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
