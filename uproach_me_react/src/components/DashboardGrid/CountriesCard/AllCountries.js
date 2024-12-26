import React from "react";

const AllCountries = () => {
  const data = [
    { name: "Argentina", flag: "/icons/country_flag1.svg", users: "1,231" },
    { name: "US", flag: "/icons/country_flag2.svg", users: 231 },
    { name: "Canada", flag: "/icons/country_flag3.svg", users: 111 },
    { name: "India", flag: "/flag-icons/in.png", users: 980 },
    { name: "Germany", flag: "/flag-icons/de.png", users: 450 },
    { name: "Australia", flag: "/flag-icons/au.png", users: 320 },
    { name: "Brazil", flag: "/flag-icons/br.png", users: 210 },
    { name: "UK", flag: "/flag-icons/gb.png", users: 500 },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">All Countries</h3>
      <table className="w-full text-left mt-4">
        <thead>
          <tr>
            <th className="text-[12px] text-[#5C5C5C] font-medium">COUNTRY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((country) => (
            <tr className="border-b" key={country.name}>
              <td className="flex items-center gap-2 py-2 text-[14px] mr-[129px]">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-[24px] h-[24px] rounded"
                />
                {country.name}
              </td>
              <td className="text-[12px] text-[#5C5C5C]">{country.users}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCountries;
