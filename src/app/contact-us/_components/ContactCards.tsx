"use client";
import ContactCard from "@src/components/Cards/ContactCard";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

const ContactCards = () => {
  const contactCardData = [
    {
      id: 1,
      title: "Email Us",
      type: "email",
      icon: <RxEnvelopeClosed className="text-primary text-2xl xl:text-4xl" />,
      additionalText: "adebolaomowunmi37@gmail.com",
    },
    {
      id: 2,
      title: "Call Us",
      icon: <FiPhoneCall className="text-primary text-2xl xl:text-4xl" />,
      type: "tel",
      additionalText: "9022642455",
    },
    {
      id: 3,
      title: "Location",
      type: "text",
      icon: <IoLocationOutline className="text-primary text-2xl xl:text-4xl" />,
      description:
        "BADMUS KEMISOLA LATIFAT, 20, EBUWAWA STREET, AGA, LAGOS STATE, NIGERIA",
    },
    // Add more contact card data here if needed
  ];
  return (
    <>
      {contactCardData?.map((card) => (
        <ContactCard
          key={card.id}
          isLoading={false}
          type={card.type}
          title={card.title}
          icon={card.icon}
          additionalText={card.additionalText}
          // additionalText2={card.additionalText2}
          description={card.description}
        />
      ))}
    </>
  );
};

export default ContactCards;
