import Image from "next/image";
import Link from "next/link";

interface FooterLinkProps {
  title: string;
  links: { href: string; text: string }[];
}

const FooterLink: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="flex flex-col gap-6">
    <h1 className="font-medium text-lg">{title}</h1>
    {links.map((link, index) => (
      <Link key={index} href={link.href}>
        {link.text}
      </Link>
    ))}
  </div>
);

const Footer = () => {
  const companyLinks = [
    { href: "", text: "About Us" },
    { href: "", text: "Careers" },
    { href: "", text: "Press" },
    { href: "", text: "Affiliates" },
    { href: "", text: "Contact" },
  ];

  const shopLinks = [
    { href: "", text: "New Arrivals" },
    { href: "", text: "Accessories" },
    { href: "", text: "Men" },
    { href: "", text: "Women" },
    { href: "", text: "All Products" },
  ];

  const helpLinks = [
    { href: "", text: "Customer Service" },
    { href: "", text: "My Account" },
    { href: "", text: "Find a Store" },
    { href: "", text: "Legal & Privacy" },
    { href: "", text: "Gift Card" },
  ];

  const socialLogos = [
    { src: "/42.jpg", alt: "Logo 1" },
    { src: "/43.jpg", alt: "Logo 2" },
    { src: "/44.jpg", alt: "Logo 3" },
    { src: "/45.png", alt: "Logo 4" },
    { src: "/46.png", alt: "Logo 5" },
  ];

  return (
    <footer className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">E-commerce</div>
          </Link>
          <p>3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United States</p>
          <span className="font-semibold">hello@.dev</span>
          <span className="font-semibold">+1 234 567 890</span>
          <div className="flex gap-6">
            {socialLogos.map((logo, index) => (
              <Image key={index} src={logo.src} alt={logo.alt} width={35} height={16} />
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <FooterLink title="COMPANY" links={companyLinks} />
          <FooterLink title="SHOP" links={shopLinks} />
          <FooterLink title="HELP" links={helpLinks} />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>Be the first to get the latest news about trends, promotions, and much more!</p>
          <div className="flex">
            <input type="text" placeholder="Email address" className="p-4 w-3/4" />
            <button type="submit" className="w-1/4 bg-lama text-white">
              JOIN
            </button>
          </div>
          <span className="font-semibold">Secure Payments</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div>© 2024 e-commerce</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div>
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div>
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

