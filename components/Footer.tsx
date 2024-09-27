export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 develetter.
      </p>
      <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
        <a className="text-xs hover:underline underline-offset-4" href="#">
          서비스 약관
        </a>
        <a className="text-xs hover:underline underline-offset-4" href="#">
          개인정보 처리방침
        </a>
      </nav>
    </footer>
  )
}
