import React from "react";

const AllContent = () => {
  const purchases = [
    { id: 1, name: "Product name", clicks: 60, views: 231, image: "/icons/content_image1.png" },
    { id: 2, name: "Link name", clicks: 60, views: 231, image: "/icons/content_image2.svg" },
    { id: 3, name: "Product name", clicks: 60, views: 231, image: "/icons/content_image3.png" },
    { id: 4, name: "Product name", clicks: 60, views: 231, image: "/icons/purchase_image2.png" },
    { id: 5, name: "Extra Product", clicks: 45, views: 190, image: "/icons/purchase_image3.png" },
    // Add all the content here, or fetch it dynamically
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">All Content</h3>
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
                <p className="text-xs text-gray-500">{purchase.clicks} Clicks</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold ml-[26px]">{purchase.views}</p>
              <p className="xxxl:text-[11px] xxl:text-[10px] text-gray-600 ml-[23px]">Views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContent;
