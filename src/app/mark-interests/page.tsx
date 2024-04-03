"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import MarkInterestsForm from "~/components/MarkInterestsForm";
import { useDebounce, usePreventInitialEffect } from "~/hooks/common";
import {
  ApiResponse,
  IAlterCategories_SelectionStatus,
  ICategorySelectionCheck,
  IPagination,
} from "~/types/api.interface";
import {
  getCategoriesWithSelectionStatus,
  updateCategoresSelectionStatus,
} from "~/utils/api-requests/categories.requests";

const MarkInterests: NextPage = () => {
  const [categoriesWithSelectionStatus, setCategoriesWithSelectionStatus] =
    useState<ICategorySelectionCheck[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 6,
  });
  const [
    showLoadingCircleInMarkInterestForm,
    setShowLoadingCircleInMarkInterestForm,
  ] = useState<boolean>(false);
  const [alteredCategores, setAlteredCategores] = useState<
    ICategorySelectionCheck[]
  >([]);

  const updateCategoriesDebouce = useDebounce(
    () => {
      if (alteredCategores.length === 0) return;

      const catPayload: ICategorySelectionCheck[] = [];
      for (const altCat of alteredCategores) {
        const obj = categoriesWithSelectionStatus.find(
          (item) => item.id === altCat.id,
        );
        if (obj?.selected !== altCat.selected) {
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
      const requestBody: IAlterCategories_SelectionStatus = {
        categories: catPayload,
      };

      updateCategoresSelectionStatus(requestBody)
        .then((data) => {
          console.log("response from updateCategoresSelectionStatus", data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setAlteredCategores([]);
        });
    },
    2000,
    [alteredCategores, categoriesWithSelectionStatus],
  );

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
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setShowLoadingCircleInMarkInterestForm(false);
      });
  }, [pagination]);

  function onPageChange(page: number) {
    setPagination((prev) => ({ page: page, limit: prev.limit }));
  }

  function onCategoryCheckBoxChanged(id: string, checked: boolean) {
    setAlteredCategores((prev) => {
      const newState = [...prev];
      const index = newState.findIndex((item) => item.id === id);
      if (index === -1) {
        newState.push({
          id: id,
          name: "",
          selected: checked,
        });

        return newState;
      }

      newState[index] = {
        id: id,
        name: "",
        selected: checked,
      };

      return newState;
    });
  }

  return (
    <main className=" flex h-screen w-screen  justify-center pt-[40px]">
      <MarkInterestsForm
        className="self-start"
        categoriesWithSelectionStatus={categoriesWithSelectionStatus}
        onPageChange={onPageChange}
        isLoadingCircleVisible={showLoadingCircleInMarkInterestForm}
        totalPageCount={17}
        onCategoryCheckBoxChange={onCategoryCheckBoxChanged}
      />
    </main>
  );
};

export default MarkInterests;
