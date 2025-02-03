const Footer = () => {
	return (
		<footer className="backdrop-blur py-12 supports-[backdrop-filter]:bg-background/0">
			<div className="container mx-auto px-4  text-center text-green-600 dark:text-green-600/70">
				<p>Made with ♥ by Michał Łowkiet. © {new Date().getFullYear()}.</p>
			</div>
		</footer>
	);
};

export default Footer;
