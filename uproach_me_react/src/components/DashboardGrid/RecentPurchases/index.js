import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming react-router is used

const RecentPurchase = () => {
  const purchases = [
    { id: 1, name: "Name - Patrick", price: "₹500", quantity: 4, image: "/icons/purchase_image1.png" },
    { id: 2, name: "BPW 2024 - Patrick Bet-David Masterclass Session 2024", price: "₹500", quantity: 4, image: "/icons/purchase_image2.png" },
    { id: 3, name: "Workshop - Leadership Essentials", price: "₹750", quantity: 2, image: "/icons/purchase_image1.png" },
    { id: 4, name: "Seminar - Growth Strategies", price: "₹600", quantity: 3, image: "/icons/content_image1.png" },
    { id: 5, name: "Networking Event", price: "₹300", quantity: 1, image: "/icons/purchase_image1.png" },
  ];

  const navigate = useNavigate();
  const MAX_VISIBLE_ITEMS = 4; // Number of items to show initially

  return (
    <div>
      {/* Title */}
      <h3 className="text-lg font-semibold">Recent Purchase</h3>

      {purchases.length > 0 ? (
        <div className="mt-4">
          {purchases.slice(0, MAX_VISIBLE_ITEMS).map((purchase) => (
            <div
              key={purchase.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center">
                {/* Purchase Image */}
                <img
                  src={purchase.image}
                  alt={purchase.name}
                  className="w-[75px] h-[48px] rounded-lg mr-4 object-cover"
                />
                <div>
                  {/* Truncate Long Names */}
                  <p className="xxxl:text-sm xxl:text-[12px] font-medium">
                    {purchase.name.length > 20
                      ? `${purchase.name.substring(0, 17)}...`
                      : purchase.name}
                  </p>
                  <p className="text-xs text-gray-500">{purchase.price}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold ml-[26px]">{purchase.quantity}</p>
                <p className="xxxl:text-[11px] xxl:text-[10px] text-gray-600">Quantity</p>
              </div>
            </div>
          ))}

          {/* View All Button */}
          {purchases.length > MAX_VISIBLE_ITEMS && (
            <button
              onClick={() => navigate("/recent-purchases")}
              className="absolute bottom-4 left-4 text-indigo-600 text-sm font-medium hover:underline"
            >
              View All Content
            </button>
          )}
        </div>
      ) : (
        <img
          src="/icons/work-work-from-home.svg" // Update with the appropriate path for no data image
          alt="No Recent Purchases"
          className="xxxl:w-[180.65px] xxxl:h-[180.65px] xxl:w-[250px] xxl:h-[178px] mt-[78px] xxxl:ml-[65px] xxl:ml-[0px]"
        />
      )}
    </div>
  );
};

export default RecentPurchase;
