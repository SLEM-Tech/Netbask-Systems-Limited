import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";
import { FiCheckCircle, FiShield, FiTruck, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="text-3xl text-primary-100" />,
    title: "Quality Products",
    description:
      "We source only premium, guaranteed appliances from trusted global brands.",
  },
  {
    icon: <FiTruck className="text-3xl text-primary-100" />,
    title: "Nationwide Delivery",
    description:
      "Fast, secure, and reliable shipping to all states across Nigeria.",
  },
  {
    icon: <FiUsers className="text-3xl text-primary-100" />,
    title: "Customer Support",
    description:
      "Our dedicated team is always ready to assist you post-purchase.",
  },
  {
    icon: <FiCheckCircle className="text-3xl text-primary-100" />,
    title: "Competitive Prices",
    description:
      "We offer the best market rates without compromising on quality.",
  },
];

const page = () => {
  return (
    <AppLayout>
      <main className="bg-white mx-auto pt-28 md:pt-32 pb-16 slg:pb-32 font-sans">
        {/* Header Section */}
        <section className="flex w-full flex-col items-center pt-8 slg:pt-16 gap-4 px-6 text-center max-w-4xl mx-auto">
          <h3 className="font-black text-3xl md:text-5xl tracking-tighter text-slate-900">
            About <span className="text-primary-100">Netbask</span>
          </h3>
          <p className="text-base slg:text-lg text-slate-500 max-w-2xl leading-relaxed mt-2">
            Nigeria&apos;s premier distributor of high-quality electronics, home
            comforts, and office equipment.
          </p>
        </section>

        {/* Hero Image Section */}
        <section className="w-full max-w-[1200px] mx-auto px-4 slg:px-16 mt-10">
          <div className="relative w-full aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
            <Picture
              src="/images/about-hero.png"
              alt="Netbask Systems Limited Warehouse and Showroom"
              className="w-full h-full object-cover"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
              <span className="bg-primary-100 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Since 2024
              </span>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="grid slg:grid-cols-2 gap-12 lg:gap-20 mt-16 lg:mt-24 px-6 slg:px-16 max-w-[1200px] mx-auto items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="w-12 h-0.5 bg-primary-100"></span>
              <span className="text-xs font-black uppercase tracking-widest text-primary-100">
                Our Story
              </span>
            </div>
            <h3 className="slg:text-4xl text-3xl font-black text-slate-900 leading-tight">
              Welcome to Netbask Systems Limited
            </h3>
            <div className="space-y-4 text-sm slg:text-base leading-[1.8] text-slate-600">
              <p>
                Netbask Systems Limited is a leading distributor in Nigeria. We
                offer a wide range of high-quality appliances designed to meet
                the diverse needs of our modern customers.
              </p>
              <p>
                From essential <strong>Kitchen & Laundry Appliances</strong> to
                robust <strong>Office Equipment</strong>, we provide everything
                you need to build a functional space. We also specialize in{" "}
                <strong>Home Comforts</strong> (air conditioners, heaters, fans)
                and premium <strong>Home Entertainment Equipment</strong> like
                TVs, sound systems, and multimedia devices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
              <div className="size-12 rounded-2xl bg-primary-100/10 flex items-center justify-center text-primary-100 font-black text-xl">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Our Mission</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                To enrich lives by providing reliable, energy-efficient, and
                innovative appliances to every Nigerian home and workplace.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col gap-4 hover:-translate-y-1 transition-transform mt-0 sm:mt-8">
              <div className="size-12 rounded-2xl bg-primary-100/10 flex items-center justify-center text-primary-100 font-black text-xl">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Our Vision</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                To be the most trusted and ubiquitous household brand for
                electronics distribution across the African continent.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-20 lg:mt-32 px-6 slg:px-16 max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900">
              Why Choose Us
            </h3>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              We don&apos;t just sell products; we deliver peace of mind and
              long-lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-slate-50 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-primary-100/20 hover:shadow-xl hover:shadow-primary-100/5 transition-all">
                <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-lg">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default page;
