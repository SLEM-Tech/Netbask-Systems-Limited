"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import TrustBadges from "./TrustBadges";
import OfferSaleBanner from "./OfferSaleBanner";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  // Fetch featured/popular products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?featured=true&per_page=6&orderby=date&order=desc",
        );
        if (response?.data) {
          setFeaturedProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative w-full h-[calc(100vh)] -mt-[130px] slg:-mt-[110px] overflow-hidden">
        {/* The Background Image */}
        <Picture
          src={heroBg}
          alt="Brand New Collection"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Content Overlay — Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-[130px] slg:pt-[110px]">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-semibold tracking-tight">
            Let's Help you get your <br />
            right Accessories.
          </h1>
          <p className="mt-6 text-sm md:text-lg text-white/70 max-w-lg leading-relaxed">
            Shop the best products for your computer from top brands in the
            industry
          </p>
          <Link
            href="/category"
            className="mt-8 inline-block bg-[#7F5AF0] hover:bg-[#7F5AF0] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products Section — Dark Theme */}
      <div className="w-full bg-[#0D0D1A] py-10 sm:py-16">
        <div className="max-w-[1256px] mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 tracking-tight">
            Featured Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {latestProducts.length > 0 ?
              latestProducts.slice(0, 6).map((product: ProductType) => {
                const price = parseInt(product?.price || "0");
                const slugDesc = convertToSlug(product?.name);
                const ID = product?.id?.toString();
                const cartItem = getItem(ID);
                const rating =
                  product?.average_rating ?
                    parseFloat(product.average_rating)
                  : 4;
                const fullStars = Math.floor(rating);
                const halfStar = rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-[#1C1C2E] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#7C3AED]/50 transition-all">
                    {/* Image Container */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="relative aspect-square bg-white flex items-center justify-center p-4">
                      <Picture
                        src={product?.images?.[0]?.src}
                        alt={product?.name}
                        className="object-contain w-[85%] h-[85%] group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col gap-1.5">
                      <Link
                        href={`/home-item/product/${slugDesc}-${product.id}`}
                        className="text-sm font-medium text-gray-200 line-clamp-1 leading-snug hover:text-white transition-colors"
                        dangerouslySetInnerHTML={{ __html: product?.name }}
                      />
                      <span className="text-[#E2A400] font-bold text-sm">
                        {price ?
                          <FormatMoney2 value={price} />
                        : "N/A"}
                      </span>
                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: fullStars }).map((_, i) => (
                          <span
                            key={`full-${i}`}
                            className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                        {halfStar && (
                          <span className="text-yellow-400 text-sm">★</span>
                        )}
                        {Array.from({ length: emptyStars }).map((_, i) => (
                          <span
                            key={`empty-${i}`}
                            className="text-gray-500 text-sm">
                            ☆
                          </span>
                        ))}
                      </div>

                      {/* Add / Remove Cart Button */}
                      {price > 0 && (
                        <button
                          onClick={() =>
                            cartItem ?
                              removeItem(ID)
                            : addItem({
                                id: ID,
                                name: product?.name,
                                price,
                                quantity: 1,
                                image: product?.images?.[0]?.src,
                              })
                          }
                          className={`w-full text-xs sm:text-sm font-bold py-2.5 rounded transition-colors cursor-pointer mt-1 ${
                            cartItem ?
                              "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                          }`}>
                          {cartItem ? "Remove from cart" : "Add to cart"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            : /* Loading Skeleton */
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-[#1C1C2E] rounded-xl overflow-hidden">
                  <div className="aspect-square bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-3/4" />
                    <div className="h-4 bg-gray-600 rounded w-1/2" />
                    <div className="h-3 bg-gray-600 rounded w-1/3" />
                  </div>
                </div>
              ))
            }
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/category"
              className="border border-[#7C3AED] text-white text-sm font-medium px-8 py-2.5 rounded-md hover:bg-[#7C3AED] transition-colors">
              See more
            </Link>
          </div>
        </div>
      </div>
      <OfferSaleBanner />
    </>
  );
};

export default AllCategorySection;
