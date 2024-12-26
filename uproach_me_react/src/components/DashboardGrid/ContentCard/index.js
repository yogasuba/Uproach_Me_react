import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming react-router is used

const ContentCard = () => {
  const purchases = [
    { id: 1, name: "Product name", clicks: 60, views: 231, image: "/icons/content_image1.png" },
    { id: 2, name: "Link name", clicks: 60, views: 231, image: "/icons/content_image2.svg" },
    { id: 3, name: "Product name", clicks: 60, views: 231, image: "/icons/content_image3.png" },
    { id: 4, name: "Product name", clicks: 60, views: 231, image: "/icons/purchase_image2.png" },
    { id: 5, name: "Extra Product", clicks: 45, views: 190, image: "/icons/purchase_image3.png" },
    // You can add more items if needed
  ];

  const navigate = useNavigate();
  const MAX_VISIBLE_ITEMS = 4; // Number of items to show initially

  return (
    <div>
      {/* Title */}
      <h3 className="text-lg font-semibold">Content</h3>

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
                  <p className="text-xs text-gray-500">{purchase.clicks} Clicks</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold ml-[26px]">{purchase.views}</p>
                <p className="xxxl:text-[11px] xxl:text-[10px] text-gray-600 ml-[23px]">Views</p>
              </div>
            </div>
          ))}

          {/* View All Content Button */}
          {purchases.length > MAX_VISIBLE_ITEMS && (
            <button
              onClick={() => navigate("/content")}
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

export default ContentCard;
