"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface VerifyPopupProps {
  id: number
  isDialogOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void
  header: string
  description: React.ReactNode
  yesText: string
  noText: string
  handleConfirm: (verify: boolean) => Promise<void>
}

export default function VerifyPopup({
  id,
  isDialogOpen,
  setIsDialogOpen,
  header,
  description,
  yesText,
  noText,
  handleConfirm,
}: VerifyPopupProps) {
  const [yesLoading, setYesLoading] = useState(false)
  const [noLoading, setNoLoading] = useState(false)

  const handleClick = async (verify: boolean) => {
    try {
      await handleConfirm(verify)

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error verifying anime:", error)
    } finally {
      if (verify) setYesLoading(false)
      else setNoLoading(false)
    }
  }

  if (id < 0) return null

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription className="py-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => handleClick(true)}>
            {yesLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {yesText}
          </Button>
          <Button variant="destructive" onClick={() => handleClick(false)}>
            {noLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {noText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
