
export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-5 py-6 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} Etsy Analyzer. Built for shop research.
      </p>
    </footer>
  );
}
