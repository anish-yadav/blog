import { Facebook, Instagram, Youtube } from "react-feather";

const Footer = () => {
  return (
    <div className="lg:px-48 px-4 py-8 flex justify-between">
      <h6 className="text-sm">Copyright &copy; 2021 John Doe company Ltd.</h6>
      <div className="grid grid-cols-3 gap-6">
        <Facebook size={16} className="cursor-pointer" />
        <Instagram size={16} className="cursor-pointer" />
        <Youtube size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
