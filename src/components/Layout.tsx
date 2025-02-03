import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-background text-foreground">
			<Navbar />
			<main className="min-h-screen container mx-auto px-4 py-8">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
