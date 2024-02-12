import React, { ChangeEvent, useEffect, useState } from "react";
import { City } from "../types";
import { GetCity, GetCityByCountry } from "../utils";
import Dropdown from "./Dropdown";
type PageProps = {
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: City) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: City;
  countryid: number;
  stateid?: number;
  placeHolder?: string;
};

const CitySelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  countryid,
  stateid,
  placeHolder,
}: PageProps) => {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    if (countryid) {
      if(stateid){
        GetCity(countryid, stateid).then((data) => {
          setCities(data);
        });
      }else{
        GetCityByCountry(countryid).then((data) => {
          setCities(data);
        });
      }
    }
  }, [countryid, stateid]);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <Dropdown
          placeHolder={placeHolder}
          options={cities}
          onChange={(value) => {
            if (onChange) {
              onChange(value as City);
            }
          }}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default CitySelect;
