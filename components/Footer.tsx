import Link from 'next/link'

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 flex items-center justify-between h-16 px-4 shrink-0 border-t from-muted/30 from-0% to-muted/30 to-50% dark:from-background/10 dark:from-10% dark:to-background/80">
      <p className="text-xs text-gray-500 dark:text-gray-400 mr-4">
        © 2024 develetter.
      </p>
      <nav className="flex gap-2">
        <Link
          href="#"
          className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400 hover:underline underline-offset-4 mr-2"
        >
          서비스 약관
        </Link>
        <Link
          href="#"
          className="text-xs whitespace-nowrap hover:underline underline-offset-4"
        >
          개인정보 처리방침
        </Link>
      </nav>
    </footer>
  )
}
