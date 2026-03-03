"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { usePathname } from "next/navigation";
import Picture from "../picture/Picture";
import { logoImage } from "@public/images";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "@node_modules/react-icons/bi";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;

  const socialIcons = [
    {
      id: 1,
      icon: <BiLogoFacebook className="text-lg" />,
      link: "#",
    },
    {
      id: 2,
      icon: <BiLogoTwitter className="text-lg" />,
      link: "#",
    },
    {
      id: 3,
      icon: <BiLogoLinkedin className="text-lg" />,
      link: "#",
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Featured", href: "/category" },
    { label: "About", href: "/about-us" },
    { label: "Blogs", href: "/faq" },
    { label: "Contact us", href: "/contact-us" },
  ];

  const footerData: footerDataProps[] = [
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Create Account",
          href: firstName ? "/user/account-details" : "/user/register",
        },
        {
          label: firstName ? "Log Out" : "Login",
          href: firstName ? "" : "/user/login",
          function: firstName ? signOut : () => {},
        },
        {
          label: firstName ? "Change Password" : "Forget Password",
          href: firstName ? "/user/change-password" : "/user/forget-password",
        },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
        { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
        { label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
        { label: "Refund Policy", href: "/terms-of-use?refund-policy" },
      ],
    },
  ];

  const staggerDelay = 0.15;

  return (
    <footer className="w-full bg-[#1C1C1E]">
      {/* ─── Main Footer Content ─── */}
      <div className="max-w-[1256px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-20 sm:pb-8">
        {/* Logo */}
        {/* Left - Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <Picture
            src={logoImage}
            alt="Netbask Logo"
            className="w-10 sm:w-12 md:w-16 h-auto object-contain"
          />
        </Link>

        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {/* About Column */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              About
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We provide high-quality, innovative computer accessories that
              combine performance, durability, and style. Our mission is to
              enhance your productivity, gaming, and everyday computing
              experience with products you can trust.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors hover:text-[#7C3AED] ${
                      pathname === link.href ?
                        "text-[#7C3AED]"
                      : "text-gray-400"
                    }`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              {footerData[0].title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerData[0].links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={link.function}
                    className="text-sm text-gray-400 hover:text-[#7C3AED] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              {footerData[2].title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerData[2].links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#7C3AED] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-[1256px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Copyright - {currentYear}- All rights reserved
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((item, index) => (
              <motion.a
                href={item.link}
                key={item.id}
                className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-[#7C3AED] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * staggerDelay,
                  duration: 0.4,
                }}>
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
