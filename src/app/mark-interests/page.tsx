"use client"

import { NextPage } from "next";
import { useEffect, useState } from "react";
import MarkInterestsForm from "~/components/MarkInterestsForm";
import { ApiResponse, ICategorySelectionCheck, IPagination } from "~/types/api.interface";
import { getCategoriesWithSelectionStatus } from "~/utils/api-requests/categories.requests";

const MarkInterests:NextPage = () => {
    const [categoriesWithSelectionStatus, setCategoriesWithSelectionStatus] = useState<ICategorySelectionCheck[]>([]);
    const [pagination, setPagination] = useState<IPagination>({page: 1, limit: 6});

    useEffect(() => {
        getCategoriesWithSelectionStatus(pagination)
        .then((data: ApiResponse<ICategorySelectionCheck[]>) => {
            console.log("data from getCategoriesWithSelectionStatus api", data);
            setCategoriesWithSelectionStatus(data?.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [pagination]);

    function onPageChange(page: number) {
        setPagination(prev => ({page: page, limit: prev.limit}));
    }
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <MarkInterestsForm
                className="self-start"
                categoriesWithSelectionStatus={categoriesWithSelectionStatus}
                onPageChange={onPageChange}
            />
        </main>
    )
}

export default MarkInterests;