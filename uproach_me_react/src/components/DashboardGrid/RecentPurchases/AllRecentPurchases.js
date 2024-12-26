import React from "react";

const AllRecentPurchases = () => {
  const purchases = [
    { id: 1, name: "Name - Patrick", price: "₹500", quantity: 4, image: "/icons/purchase_image1.png" },
    { id: 2, name: "BPW 2024 - Patrick Bet-David Masterclass Session 2024", price: "₹500", quantity: 4, image: "/icons/purchase_image2.png" },
    { id: 3, name: "Workshop - Leadership Essentials", price: "₹750", quantity: 2, image: "/icons/purchase_image1.png" },
    { id: 4, name: "Seminar - Growth Strategies", price: "₹600", quantity: 3, image: "/icons/content_image1.png" },
    { id: 5, name: "Networking Event", price: "₹300", quantity: 1, image: "/icons/purchase_image1.png" },
    // Add all the recent purchases here, or fetch them dynamically
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">All Recent Purchases</h3>
      <div className="mt-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="flex items-center justify-between mb-4 border-b pb-2">
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
      </div>
    </div>
  );
};

export default AllRecentPurchases;
