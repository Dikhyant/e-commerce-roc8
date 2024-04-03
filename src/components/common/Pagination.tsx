"use client";

import React, { useEffect, useState } from "react";
import { cn } from "~/utils/misc";

interface PaginationProps {
  count: number;
  page?: number;
  siblingCount?: number;
  className?: string;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  count = 10,
  page: propPage = 1,
  siblingCount = 3,
  className,
  onPageChange,
}) => {
  const [page, setPage] = useState<number>(propPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [page]);

  function onPageClick(pg: number) {
    setPage(pg);
  }

  function onLeftDoubleArrowClick() {
    setPage(1);
  }

  function onLeftArrowClick() {
    setPage((p) => (p - 1 > 0 ? p - 1 : p));
  }

  function onRightDoubleArrowClick() {
    setPage(count);
  }

  function onRightArrowClick() {
    setPage((p) => (p + 1 <= count ? p + 1 : p));
  }

  return (
    <div
      className={cn("flex items-center gap-x-[10px] font-inter ", className)}
    >
      <button
        className="text-[20px] font-[500] text-[#ACACAC]"
        onClick={onLeftDoubleArrowClick}
      >{`<<`}</button>
      <button
        className="text-[20px] font-[500] text-[#ACACAC]"
        onClick={onLeftArrowClick}
      >{`<`}</button>
      {page - 1 > siblingCount ? (
        <label className="text-[20px] font-[500] text-[#ACACAC]">{`...`}</label>
      ) : (
        <></>
      )}
      {new Array(count).fill(0).map((_, index) => {
        if (Math.abs(index + 1 - page) > siblingCount)
          return <React.Fragment key={index}></React.Fragment>;
        const isCurrentPage = index + 1 === page;
        return (
          <button
            className={cn(
              "text-[20px] font-[500]",
              isCurrentPage ? "text-[#000]" : "text-[#ACACAC]",
            )}
            key={index}
            onClick={() => {
              onPageClick(index + 1);
            }}
          >{`${index + 1}`}</button>
        );
      })}
      {count - page > siblingCount ? (
        <label className="text-[20px] font-[500] text-[#ACACAC]">{`...`}</label>
      ) : (
        <></>
      )}
      <button
        className="text-[20px] font-[500] text-[#ACACAC]"
        onClick={onRightArrowClick}
      >{`>`}</button>
      <button
        className="text-[20px] font-[500] text-[#ACACAC]"
        onClick={onRightDoubleArrowClick}
      >{`>>`}</button>
    </div>
  );
};

export default Pagination;
