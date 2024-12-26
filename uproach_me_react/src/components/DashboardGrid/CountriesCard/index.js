import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CountriesCard = () => {
  const data = [
    { name: "Argentina", flag: "/icons/country_flag1.svg", users: "1,231" },
    { name: "US", flag: "/icons/country_flag2.svg", users: 231 },
    { name: "Canada", flag: "/icons/country_flag3.svg", users: 111 },
    { name: "India", flag: "/icons/country_flag4.svg", users: 1000},
    { name: "Germany", flag: "/icons/country_flag5.svg", users: 450 },
  ];

  const navigate = useNavigate();
  const MAX_VISIBLE_ITEMS = 3; // Number of rows to show in the card

  return (
    <div>
      <h3 className="text-lg font-semibold">Countries</h3>

      {data.length === 0 ? (
        <img
          src="/icons/marketing-digital.svg"
          alt="Sell Products"
          className="xxxl:w-[180.65px] xxxl:h-[180.65px] xxl:w-[250px] xxl:h-[178px] mt-[78px] xxxl:ml-[65px] xxl:ml-[0px]"
        />
      ) : (
        <div>
          <img src="/icons/map.svg" alt="Countries Map" className="mt-4 mb-2" />
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-[12px] text-[#5C5C5C] font-medium">COUNTRY</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, MAX_VISIBLE_ITEMS).map((country) => (
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

          {data.length > MAX_VISIBLE_ITEMS && (
            <button
              onClick={() => navigate("/countries")}
              className="absolute bottom-4 left-4 text-indigo-600 text-sm font-medium hover:underline"
            >
              View All Content
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CountriesCard;
