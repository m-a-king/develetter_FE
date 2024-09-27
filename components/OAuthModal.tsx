import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

interface OAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OAuthModal({ isOpen, onClose }: OAuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>소셜 계정으로 가입하기</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => console.log("GitHub 로그인")}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub로 계속하기
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log("Twitter 로그인")}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter로 계속하기
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log("LinkedIn 로그인")}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn으로 계속하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
