import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 relative">
      <div className="app-container mx-auto w-full flex items-center justify-betweeen px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex flex-1 text-right flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm w-full">
            © {new Date().getFullYear()} TicketFlow.{" "}
            <span className="max-sm:hidden">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
