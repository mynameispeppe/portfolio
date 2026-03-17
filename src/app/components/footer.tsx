export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent text-text-secondary">
            <div className="py-4">
                <p className="text-sm md:text-md text-center">
                    &copy; {currentYear} Giuseppe Milazzo
                </p>
            </div>
        </footer>
    );
}