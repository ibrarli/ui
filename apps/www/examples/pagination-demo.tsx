"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationDemo() {
  const [page, setPage] = React.useState(2)
  const totalPages = 5

  const changePage = (nextPage: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPage(nextPage)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Pagination aria-label="Results pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} disabled={page === 1} onClick={changePage(page - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href={`?page=${number}`}
                aria-label={`Page ${number}`}
                isActive={page === number}
                onClick={changePage(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} disabled={page === totalPages} onClick={changePage(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        Showing results {(page - 1) * 10 + 1}–{page * 10} of 50
      </p>
    </div>
  )
}
