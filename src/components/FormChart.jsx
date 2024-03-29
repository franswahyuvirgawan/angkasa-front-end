import React, { useRef, useState, useEffect } from "react";
import Buttom from "./Buttom";
import FormInput from "./FormInput";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../redux/actions/FlightAction";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import numeral from "numeral";
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function FormChart() {
  const { token } = useSelector((state) => state.auth);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  let flightId = searchParams.get("flightId");
  let passenger = searchParams.get("passenger");
  let seatClass = searchParams.get("class");
  const { flight, price } = useSelector((state) => state.flight);
  const [filteredItems, setFilteredItems] = useState(null);
  const [data, setData] = useState(null);
  const redirect = useNavigate();
  const URL =
    process.env.REACT_APP_SERVER_URL || "https://angkasa-api.km3ggwp.com/api";
  const [dataPassenger, setDataPassenger] = useState([]);

  const [selectedOptionBank, setSelectedOptionBank] = useState(null);
  const [selectedOptionType, setSelectedOptionType] = useState(null);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    dispatch(getFlight(flightId, seatClass));
  }, [dispatch]);

  // console.log(data);

  const [values, setValues] = useState({
    email: "",
    fullName: "",
    email: "",
    phone: "",
    fullNamePassenger: "",
    typeID: "",
  });

  // console.log(values);
  // console.log(selectedOptionType);
  // console.log(selectedOptionBank);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: "4px 16px",
    }),
    control: (provided, state) => ({
      ...provided,
      padding: "4px 16px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const paymentMethod = [
    { value: "Bank Indonesia (BI)", label: "Bank Indonesia (BI)" },
    {
      value: "Bank Negara Indonesia (BNI)",
      label: "Bank Negara Indonesia (BNI)",
    },
    {
      value: "Bank Rakyat Indonesia (BRI)",
      label: "Bank Rakyat Indonesia (BRI)",
    },
    {
      value: "Bank Tabungan Negara (BTN)",
      label: "Bank Tabungan Negara (BTN)",
    },
    {
      value: "Bank Mandiri",
      label: "Bank Mandiri",
    },
    {
      value: "Bank Central Asia (BCA)",
      label: "Bank Central Asia (BCA)",
    },
    {
      value: "Bank CIMB Niaga",
      label: "Bank CIMB Niaga",
    },
  ];

  const type = [
    { value: "KTP", label: "KTP" },
    {
      value: "Passport",
      label: "Passport",
    },
  ];

  // console.log(options);

  const contactFullName = {
    name: "fullName",
    type: "text",
    placeholder: "Example: Kurt Cobain",
    errorMsg: "Please enter a valid full name",
    label: "Full Name",
  };

  const contactEmail = {
    name: "email",
    type: "text",
    placeholder: "Example: kurt@gmail.com",
    errorMsg: "It should be valid email address",
    label: "Email",
  };

  const contactPhone = {
    name: "phone",
    type: "text",
    placeholder: "Example: 082172xxxx",
    errorMsg: "It should be valid Phone",
    label: "Phone",
  };

  const passengers = {
    id: 1,
    name: "fullName",
    type: "text",
    placeholder: "Example: Kurt Cobain",
    errorMsg: "Please enter a valid full name",
    label: "Full Name",
  };

  const numberID = {
    id: 1,
    name: "number",
    type: "text",
    placeholder: "Enter your identity",
    errorMsg: "It should be valid",
    label: "",
  };

  // console.log(username);

  const onChangeOrder = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChange = (index, name, value) => {
    const newData = dataPassenger?.map((d, i) => {
      if (index === i) {
        return { ...d, [name]: value };
      }
      return d;
    });
    setDataPassenger(newData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${URL}/orders`,
        {
          flightId: [Number(flightId)],
          totalPassengers: Number(passenger),
          contact: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
          },
          passengers: dataPassenger,
          paymentMethod: selectedOptionBank?.value,
          class: seatClass,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(result.data);
      redirect("/check-order");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  useEffect(() => {
    if (Number(passenger) > 0) {
      const passengerData = {
        fullName: "",
        type: "",
        number: "",
      };
      const passengersData = [];
      Array.from({ length: passenger }, () => {
        passengersData.push(passengerData);
      });
      setDataPassenger(passengersData);
    }
  }, [passenger]);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-[24px] mt-[32px] items-start">
        <form
          className="w-full flex-col gap-[24px] flex"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:px-[40px] md:py-[24px] p-[16px] rounded-lg drop-shadow-lg bg-white w-full gap-[8px]">
            <h3 className="text-2xl font-semibold">Orderer Details</h3>
            <div>
              <FormInput
                {...contactFullName}
                value={values[contactFullName.name]}
                onChange={onChangeOrder}
              />
              {errors && (
                <p className="text-red-500">{errors["contact,fullName"]}</p>
              )}
            </div>

            <div>
              <FormInput
                {...contactEmail}
                value={values[contactEmail.name]}
                onChange={onChangeOrder}
              />
              {errors && (
                <p className="text-red-500">{errors["contact,email"]}</p>
              )}
            </div>

            <div>
              <FormInput
                {...contactPhone}
                value={values[contactPhone.name]}
                onChange={onChangeOrder}
              />
              {errors && (
                <p className="text-red-500">{errors["contact,phone"]}</p>
              )}
            </div>
          </div>

          {dataPassenger.map((_, i) => {
            return (
              <>
                <div className="flex flex-col md:px-[40px] md:py-[24px] p-[16px] rounded-lg drop-shadow-lg bg-white w-full gap-[8px] relative z-10">
                  <h3 className="text-2xl font-semibold">Passenger Details</h3>
                  <div>
                    <FormInput
                      key={passengers.id}
                      {...passengers}
                      value={dataPassenger[i].fullName}
                      onChange={(e) => {
                        onChange(i, e.target.name, e.target.value);
                      }}
                    />
                    {errors && (
                      <p className="text-red-500">
                        {errors[`passengers,${i},fullName`]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col my-[8px] gap-[4px]">
                    <h4>KTP/Passport</h4>
                    <div className="">
                      <select
                        className="px-[24px] py-[8px] border w-full flex flex-col my-[8px] gap-[4px] appearance-none"
                        name={"type"}
                        id=""
                        value={dataPassenger[i].type}
                        onChange={(e) => {
                          onChange(i, e.target.name, e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        <option value="KTP">KTP</option>
                        <option value="Passport">Passport</option>
                      </select>
                      {errors && (
                        <p className="text-red-500">
                          {errors[`passengers,${i},type`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <FormInput
                        key={numberID.id}
                        {...numberID}
                        value={dataPassenger[i].number}
                        onChange={(e) => {
                          onChange(i, e.target.name, e.target.value);
                        }}
                      />
                      {errors && (
                        <p className="text-red-500">
                          {errors[`passengers,${i},number`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <div className="flex flex-col md:px-[40px] md:py-[24px] p-[16px] rounded-lg drop-shadow-lg bg-white w-full gap-[8px]">
            <div className="flex flex-col my-[8px] gap-[4px]">
              <h4>Payment Method</h4>
              <div className="my-[4px] relative z-10">
                <Select
                  styles={customStyles}
                  options={paymentMethod}
                  onChange={(selectedOptionBank) => {
                    setSelectedOptionBank(selectedOptionBank);
                  }}
                />
              </div>
              {errors && (
                <p className="text-red-500">{errors["paymentMethod"]}</p>
              )}
            </div>
            <Buttom>Submit</Buttom>
          </div>
        </form>
        <div className="flex flex-col items-start gap-[16px] md:px-[40px] px-[16px] py-[24px] rounded-lg drop-shadow-lg bg-white lg:w-[800px] w-full relative z-0">
          <h1 className="text-2xl font-semibold">Flight</h1>

          <div className="flex flex-row gap-[8px] items-center">
            <img
              className="md:w-[80px] w-[64px] border p-[8px] rounded-lg lg:hidden"
              src={flight?.airplane?.airline?.logo}
              alt=""
            />
            <p>{flight?.airplane?.airline?.name}</p>
          </div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center w-full items-start gap-[16px] lg:gap-0 border-b-2 pb-[16px]">
            <div className="flex flex-row gap-[16px] md:items-center w-full">
              <div className="hidden lg:block">
                <img
                  className="w-[80px] border p-[8px] rounded-lg"
                  src={flight?.airplane?.airline?.logo}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-[8px] items-start">
                <h1 className="font-bold lg:text-xl text-base">
                  {flight?.std?.hours}
                </h1>
                <span className="lg:text-lg text-sm">
                  {flight?.fromAirport?.iata}
                </span>
              </div>
              <div className="flex flex-row items-center w-[100px]">
                <div className="flex flex-col items-center gap-[8px] w-full">
                  <span className="text-sm text-gray-300">
                    {flight?.estimated}
                  </span>
                  <span className="border-b-2 w-full"></span>
                  <span className="text-sm text-gray-300">Directly</span>
                </div>
                <div>
                  <PaperAirplaneIcon className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] items-start">
                <h1 className="font-bold lg:text-xl text-base">
                  {flight?.sta?.hours}
                </h1>
                <span className="lg:text-lg text-sm">
                  {flight?.toAirport?.iata}
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between w-full lg:items-center gap-[8px] items-end">
            <h5 className="font-semibold lg:text-xl">Total Pembayaran</h5>
            <h5 className="font-semibold lg:text-2xl text-xl text-blue-500">
              Rp{" "}
              {numeral(Number(passenger) * price[0]?.price.raw).format("0,0")}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormChart;
