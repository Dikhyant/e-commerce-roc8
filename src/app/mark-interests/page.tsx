"use client"

import { NextPage } from "next";
import { useEffect, useState } from "react";
import MarkInterestsForm from "~/components/MarkInterestsForm";
import { useDebounce, usePreventInitialEffect } from "~/hooks/common";
import { ApiResponse, IAlterCategories_SelectionStatus, ICategorySelectionCheck, IPagination } from "~/types/api.interface";
import { getCategoriesWithSelectionStatus, updateCategoresSelectionStatus } from "~/utils/api-requests/categories.requests";

const MarkInterests:NextPage = () => {
    const [categoriesWithSelectionStatus, setCategoriesWithSelectionStatus] = useState<ICategorySelectionCheck[]>([]);
    const [pagination, setPagination] = useState<IPagination>({page: 1, limit: 6});
    const [showLoadingCircleInMarkInterestForm, setShowLoadingCircleInMarkInterestForm] = useState<boolean>(false);
    const [alteredCategores, setAlteredCategores] = useState<ICategorySelectionCheck[]>([]);

    const updateCategoriesDebouce = useDebounce(() => {
        const catPayload:ICategorySelectionCheck[] = []
        for(const altCat of alteredCategores) {
            const obj = categoriesWithSelectionStatus.find(item => item.id === altCat.id);
            if(obj?.selected !== altCat.selected) {
                catPayload.push(altCat);
            }
        }
        /* for(let i = 0; i < alteredCategores.length; i++) {
            const id = alteredCategores[i]?.id;
            const obj = categoriesWithSelectionStatus.find(item => item.id === id);
            if(obj?.selected !== alteredCategores[i]?.selected && alteredCategores[i]) {
                // there is a change and needs to be sent to backend
                catPayload.push(alteredCategores[i] as ICategorySelectionCheck);
            }
        } */
        const requestBody: IAlterCategories_SelectionStatus = {categories: catPayload};

        updateCategoresSelectionStatus(requestBody)
        .then(data => {
            console.log("response from updateCategoresSelectionStatus", data);
            // setAlteredCategores([]);
            const newCat = [...categoriesWithSelectionStatus];
            for(const altCat of alteredCategores) {
                for(const nc of newCat) {
                    if(nc.id === altCat.id) {
                        nc.selected = altCat?.selected ?? false
                    }
                }
            }

            /* for(let i = 0; i < alteredCategores.length; i++) {
                const id = alteredCategores[i]?.id
                for(let j = 0; j < newCat.length; j++) {
                    if(newCat[i]?.id === id) {
                        (newCat[i] as ICategorySelectionCheck).selected = (alteredCategores[i] as ICategorySelectionCheck )?.selected
                    }
                }
            } */
            setCategoriesWithSelectionStatus(newCat);
        })
        .catch(error => {
            console.error(error);
        })
    }, 2000, [alteredCategores, categoriesWithSelectionStatus])

    usePreventInitialEffect(() => {
        updateCategoriesDebouce();
    }, [alteredCategores]);

    useEffect(() => {
        setShowLoadingCircleInMarkInterestForm(true);
        getCategoriesWithSelectionStatus(pagination)
        .then((data: ApiResponse<ICategorySelectionCheck[]>) => {
            console.log("data from getCategoriesWithSelectionStatus api", data);
            setCategoriesWithSelectionStatus(data?.data);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setShowLoadingCircleInMarkInterestForm(false);
        })
    }, [pagination]);

    function onPageChange(page: number) {
        setPagination(prev => ({page: page, limit: prev.limit}));
    }

    function onCategoryCheckBoxChanged(id: string, checked: boolean) {

        setAlteredCategores(prev => {
            const newState = [...prev];
            const index = newState.findIndex(item => item.id === id);
            if(index === -1) {
                newState.push({
                    id: id,
                    name: "",
                    selected: checked
                });

                return newState;
            }
            
            newState[index] = {
                id: id,
                name: "",
                selected: checked
            }

            return newState;
        })
    }
    return (
        <main
            className="bg-[#ffffff13] w-screen h-screen flex  justify-center"
        >
            <MarkInterestsForm
                className="self-start"
                categoriesWithSelectionStatus={categoriesWithSelectionStatus}
                onPageChange={onPageChange}
                showLoadingCircle={showLoadingCircleInMarkInterestForm}
                totalPageCount={17}
                onCategoryCheckBoxChange={onCategoryCheckBoxChanged}
            />
        </main>
    )
}

export default MarkInterests;