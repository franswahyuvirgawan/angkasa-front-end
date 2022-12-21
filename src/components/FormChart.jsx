import React, { useRef, useState, useEffect } from "react";
import Buttom from "./Buttom";
import FormInput from "./FormInput";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../redux/actions/FlightAction";
import { useSearchParams, Link } from "react-router-dom";

function FormChart() {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  let flightId = searchParams.get("flightId");
  const { flight } = useSelector((state) => state.flight);

  useEffect(() => {
    dispatch(getFlight(flightId));
  }, [dispatch]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    fullname: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMsg: "Username 3-16 and and shouldn't include any special character",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMsg: "It should be valid email address",
      label: "Email",
      required: true,
    },
  ];

  // console.log(username);
  const handleSubmit = (e) => {
    // console.log(usernameRef);
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex xl:flex-row flex-col gap-[16px] mt-[32px] items-start">
        <div className="w-full flex flex-col gap-[16px] items-end">
          <div className="flex flex-col items-start gap-[16px] px-[40px] py-[24px] rounded-lg drop-shadow-lg bg-white w-full">
            <h2 className="text-xl font-semibold">Detail Pemesan</h2>
            <form className="w-full" onSubmit={handleSubmit}>
              {inputs.map((input) => {
                return (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                );
              })}
              <Buttom>Submit</Buttom>
            </form>
          </div>
          <Link to="/chart">
            <Buttom color="yellow">Lanjutkan Ke Pembayaran</Buttom>
          </Link>
        </div>
        <div className="flex flex-col items-start gap-[16px] xl:px-[40px] px-[24px] py-[24px] rounded-lg drop-shadow-lg bg-white xl:w-[800px] ">
          <h1 className="text-2xl font-semibold">Penerbangan</h1>

          <div>{flight?.airplane?.airline?.name}</div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center w-full items-start gap-[16px] xl:gap-0 border-b-2 pb-[16px]">
            <div className="flex flex-row gap-[16px] xl:items-center">
              <div className="">
                <img
                  className="w-[80px] border p-[8px] rounded-lg"
                  src={flight?.airplane?.airline?.logo}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-[8px] items-start">
                <h1 className="font-bold text-xl">{flight?.std?.hours}</h1>
                <span className="text-lg">{flight?.fromAirport?.iata}</span>
              </div>
              <div className="flex flex-row items-center w-[100px]">
                <div className="flex flex-col items-center gap-[8px] w-full">
                  <span className="text-sm text-gray-300">
                    {flight?.estimated}
                  </span>
                  <span className="border-b-2 w-full"></span>
                  <span className="text-sm text-gray-300">Langsung</span>
                </div>
                <div>
                  <PaperAirplaneIcon className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] items-start">
                <h1 className="font-bold text-xl">{flight?.sta?.hours}</h1>
                <span className="text-lg">{flight?.toAirport?.iata}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            <h5 className="font-semibold xl:text-xl">Total Pembayaran</h5>
            <h5 className="font-semibold xl:text-2xl text-blue-500">
              {flight?.class?.map((price) => {
                return price?.price?.formatted;
              })}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormChart;
