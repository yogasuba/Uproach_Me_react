import React, { useState } from "react";
import CreateEventTypeModal from "../../components/DashboardGrid/CreateEventTypeModal";
import 
{
ActivityCard,
RecentPurchase,
RevenueCard,
ContentCard,
CountriesCard,
VisitorSources,
BookingsCard,
}from '../../components';

const DashboardGrid = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };
    return (
     <div className="bg-[#F5F5F5] p-6 pb-[244px] min-h-screen flex flex-col ">
       <div className="grid gap-6 grid-cols-1">
         
       <div className="lg:col-span-3 flex xl:space-x-4 xxl:space-x-10 sm:space-x-3 sm:overflow-x-auto xxl:overflow-visible sm:flex-nowrap ">
       <button
            className="bg-secondary text-secondary-foreground xxl:w-[356px] xxl:h-[115px] sm:w-[316px] p-6 rounded-[8px] flex items-center justify-between sm:relative"
            style={{
              background: "linear-gradient(0deg, #D8CCFC 0%, #D8CCFC 100%), #E7EBF7",
            }}
            onClick={() => handleOpenModal("createEvent")}
          >
            <div className="xxl:text-[16px] xxxl:text-[22px] mb-[11px] sm:w-[242px] xxl:w-[127px] xxxl:w-[156px]">
              <h3 className="custom-cards-events mb-[11px] sm:ml-[-158px] xxl:ml-0 xxxl:ml-0">
                Create event
              </h3>
              <button className="bg-white text-[14px] p-2 rounded-[70px] text-[#25077D] font-semibold shadow-sm w-[74px] sm:ml-[-166px] xxl:ml-0 xxxl:ml-0">
                Set Up
              </button>
            </div>
            <img
              src="/icons/create-event.svg"
              alt="Create Event"
              className="sm:absolute sm:transform sm:scale-105 xxl:scale-110 xxl:right-[12px] xxl:bottom-[-21px] sm:right-[12px] sm:bottom-[8px] xxxl:w-[134px] xxxl:h-[150px] xxl:w-[135px] xxl:h-[150px] object-contain"
            />
          </button>

          {/* Link in Bio Card */}
          <button
            className="bg-[rgba(236,183,218,1)] text-secondary-foreground p-6 rounded-[8px] xxl:w-[356px] xxl:h-[115px] xl:w-[323px] sm:w-[316px] flex items-center justify-between relative"
            onClick={() => alert("Link in Bio clicked!")}
          >
            <div className="sm:w-[242px] xxl:w-[127px]">
              <h3 className="custom-cards-events text-[#7D215E] xxl:text-[16px] xxxl:text-[22px] mb-[11px]  sm:ml-[-158px] xxl:ml-0 xxxl:ml-0">
                Link in Bio
              </h3>
              <button className="bg-white text-sm p-2 rounded-[70px] text-[#25077D] font-semibold shadow-sm w-[74px] sm:ml-[-166px] xxl:ml-0 xxxl:ml-0">
                Set Up
              </button>
            </div>
            <img
              src="/icons/link-in-bio.svg"
              alt="Link in Bio"
              className="sm:absolute sm:transform sm:scale-100 xxl:scale-110 xxl:right-[12px] xxl:bottom-[-18px] sm:right-[10px] sm:bottom-0 xxxl:w-[134px] xxxl:h-[150px] xxl:w-[135px] xxl:h-[150px] object-contain"
            />
          </button>

          {/* Sell Products Card */}
          <button
            className="bg-[rgba(168,224,250,1)] text-secondary-foreground p-6 rounded-[8px] xxl:w-[356px] xxl:h-[115px] xl:w-[323px] sm:w-[316px] flex items-center justify-between relative"
            onClick={() => alert("Sell Products clicked!")}
          >
            <div className="sm:w-[242px] xxl:w-[127px] xxxl:w-[156px]">
              <h3 className="custom-cards-events text-[#096590] xxl:text-[16px] xxxl:text-[22px] mb-[11px]  sm:ml-[-158px] xxl:ml-0 xxxl:ml-0 ">
                Sell Products
              </h3>
              <button className="bg-white text-sm p-2 rounded-[70px] text-[#25077D] font-semibold shadow-sm w-[74px] sm:ml-[-166px] xxl:ml-0 xxxl:ml-0">
                Set Up
              </button>
            </div>
            <img
              src="/icons/sell-products.svg"
              alt="Sell Products"
              className="sm:absolute sm:transform sm:scale-100 xxl:scale-110 xxl:right-[12px] xxl:bottom-[-18px] sm:right-0 sm:bottom-0 xxxl:w-[134px] xxxl:h-[150px] xxl:w-[135px] xxl:h-[150px] object-contain"
            />
          </button>
        </div>

        {/* Conditionally Render Modals */}
        {activeModal === "createEvent" && (
          <CreateEventTypeModal onClose={handleCloseModal} />
        )}

        {/* Templates You May Like - Button Grid */}
        <div className="lg:col-span-3 grid grid-cols-1">
          <div className="relative bg-white xxxl:w-full xxl:w-full sm:w-[303px] rounded-lg inline-flex items-center justify-between px-4 py-2 shadow">
            <div className="inline-flex items-center">
              <img
                src="/icons/addtemplate-icon.svg"
                alt="Document Icon"
                className="w-[22px] h-[22px] mr-2"
              />
              <h2 className="xxxl:text-[18px] xxl:text-[14px] font-semibold">
                Templates You May Like
              </h2>
            </div>

            <div className="flex items-center cursor-pointer space-x-1 text-sm font-medium text-gray-500">
              <span>Hide</span>
              <img
                src="/icons/chevron-up.svg"
                alt="Upward Arrow"
                className="w-4 h-4"
              />
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="grid xxxl:gap-4 xxl:gap-4 sm:gap-8 sm:grid-cols-1 sm:w-[295px] xxl:w-full xxl:grid-cols-3">
              <div className="flex items-center xxxl:p-4 xxl:p-4 sm:p-0 rounded-lg">
                <div
                  className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4 sm:ml-[17px] xxl:ml-0"
                  style={{
                    background: "linear-gradient(155deg, #36D1DC 2.31%, #5B86E5 94.57%)",
                  }}
                >
                  <img
                    src="/icons/workout-icon.svg"
                    alt="Sell a Workout"
                    className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px]"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">
                    Sell a Workout
                  </h3>
                  <p className="xxxl:text-[14px] xxl:text-xs text-gray-500 mr-[-80px]">
                    Monetize exercise
                  </p>
                </div>
                <span className="custom-setup xxxl:text-[14px] xxl:text-[12px]">
                  SET UP
                </span>
              </div>

            <div className="flex items-center p-4 rounded-lg">
            <div className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4"
                    style={{
                        background: "linear-gradient(153deg, #F77EF1 16.67%, #8282EF 100%)",
                      }}>

            <img
                src="/icons/audiobook-icon.svg"
                alt="Sell Audio Book"
                className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px] "
            />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">Sell Audio Book</h3>
                <p className="xxxl:text-[14px] xxl:text-xs text-gray-500">Monetize your exercise routine</p>
            </div>
            <span className="custom-setup xxxl:text-[14px] xxl:text-[12px] sm:mr-[-18px] xxl:mr-0">SET UP</span>
            </div>

            <div className="flex items-center p-4 rounded-lg">
            <div className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4"
                    style={{
                        background: "linear-gradient(153deg, #EF7B70 16.67%, #BF54EC 100%)",
                      }}>

            <img
                src="/icons/giftme-icon.svg"
                alt="Gift Me"
                className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px]"
            />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">Gift Me</h3>
                <p className="xxxl:text-[14px] xxl:text-xs text-gray-500">Gift the gift of giving</p>
            </div>
            <span className="custom-setup xxxl:text-[14px] xxl:text-[12px] sm:mr-[-18px] xxl:mr-0">SET UP</span>
            </div>
        </div>

      {/* Horizontal Line */}
      <hr className="my-6 border-t border-gray-300 w-full" />

{/* Second Row */}
<div className="grid xxxl:gap-4 xxl:gap-4 sm:gap-8 sm:grid-cols-1 sm:w-[295px] xxl:w-full xxl:grid-cols-3">
    <div className="flex items-center xxxl:p-4 xxl:p-4 sm:p-0 rounded-lg">
    <div className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4 sm:ml-[17px] xxl:ml-0"
            style={{
                background: "linear-gradient(156deg, #F0B54D 15.33%, #F06161 95.16%)",
              }}>
    <img
        src="/icons/affiliatelinks-icon.svg"
        alt="Affiliate Links"
        className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px] "
    />
    </div>
    <div className="flex-1">
        <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">Affiliate Links</h3>
        <p className="xxxl:text-[14px] xxl:text-xs text-gray-500">Monetize your links</p>
    </div>
    <span className="custom-setup xxxl:text-[14px] xxl:text-[12px]">SET UP</span>
    </div>

    <div className="flex items-center p-4 rounded-lg">
    <div className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4"
            style={{
                background: "linear-gradient(153deg, #F0548C 16.67%, #F26556 100%)",
              }}>
    <img
        src="/icons/lovejar-icon.svg"
        alt="Love Jar"
        className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px] "
    />
    </div>
    <div className="flex-1">
        <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">Love Jar</h3>
        <p className="xxxl:text-[14px] xxl:text-xs text-gray-500">Share the love</p>
    </div>
    <span className="custom-setup xxxl:text-[14px] xxl:text-[12px] sm:mr-[-18px] xxl:mr-0">SET UP</span>
    </div>

    <div className="flex items-center p-4 rounded-lg">
    <div className="xxxl:w-14 xxxl:h-14 xxl:w-10 xxl:h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-[12px] mr-4"
            style={{
                background: "linear-gradient(153deg, #F28080 16.67%, #EC2D30 100%)",
              }}>
    <img
        src="/icons/music-icon.svg"
        alt="Music Stream Link"
        className="xxxl:w-[32px] xxxl:h-[32px] xxl:w-[21px] xxl:h-[21px] sm:w-[21px] sm:h-[21px]"
    />
    </div>
    <div className="flex-1">
        <h3 className="font-semibold xxxl:text-[18px] xxl:text-sm xxxl:mb-2 xxl:mb-0">Music Stream Link</h3>
        <p className="xxxl:text-[14px] xxl:text-xs text-gray-500">Share your music</p>
    </div>
    <span className="custom-setup xxxl:text-[14px] xxl:text-[12px] sm:mr-[-18px] xxl:mr-0">SET UP</span>
    </div>
</div>
  </div>
</div>

   
{/* Activity and Bookings */}
<div className="xl:col-span-2 xxl:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg xxxl:h-[476px] xxxl:w-[756px] xxl:h-[465px] xxl:w-[648px] sm:w-[303px] md:w-[343px] md:ml-[3px] ml-0">
<ActivityCard />

<div className="bg-muted mt-4 rounded"></div>
</div>


<div className="lg:col-span-3 xl:col-span-1 xxl:col-span-1 bg-white p-6 rounded-lg relative xxxl:w-[356px] xxxl:h-[476px] xxl:w-[305px] xxl:h-[465px] sm:w-[303px] md:w-[343px] sm:h-[479px] md:ml-[3px] ml-0">
<BookingsCard />

  {/* Content */}
  <div className="bg-muted h-[250px] mt-4 rounded"></div>
</div>

{/* Revenue and Recent Purchase */}
<div className="lg:col-span-3 xl:col-span-2 xxl:col-span-1  bg-[#F9EDD7] p-6 rounded-lg xxxl:w-[371px] xxxl:h-[454px] xxl:w-[316px] xxl:h-[430px] relative overflow-hidden sm:w-[303px] md:w-[343px] md:ml-[3px] ml-0 ">
  {/* Gradient border at the top */}
  <div className="absolute top-0 left-0 w-full h-[4px]"
  style={{background : "linear-gradient(90deg, #1B7B72 0%, #536FD5 33.5%, #F87FF2 62.5%, #F15558 100%)"}}></div>

  <div className="flex flex-col items-center mt-4">
    {/* Image */}
    <img
      src="/icons/boombox.svg" // Update the path to your image
      alt="Sell Products"
      className="w-[150.648px] h-[150.648px] mb-4"
    />

    {/* Heading */}
    <h3 className="tracking-tightest text-[22px] font-bold">Unlock Powerful Insights</h3>

    {/* Description */}
    <p className="text-[14px] text-[#595959]  mb-4 mt-1">
      Find out how your Linktree is performing with a free 30-day trial.
    </p>

    {/* Button */}
    <button className="bg-black text-white py-2 px-6 w-[264px] rounded-full text-[16px] font-semibold mb-2 mt-5">
      Try pro for free
    </button>

    {/* Pricing Text */}
    <p className="text-[14px] text-[#595959] mt-[10px]">$9/Month After</p>
  </div>
</div>

<div className="lg:col-span-3 xl:col-span-1  xxl:col-span-1 bg-white p-6 rounded-lg  xxxl:w-[356px] xxxl:h-[454px] xxl:w-[305px] xxl:h-[430px] sm:w-[303px] md:w-[343px] sm:h-[479px] md:ml-[3px] ml-0">
<RevenueCard />
  <div className="bg-muted h-[250px] mt-4 rounded"></div>
</div>


<div className="lg:col-span-3 xl:col-span-2  xxl:col-span-1 bg-white p-6 rounded-lg relative xxxl:w-[356px] xxxl:h-[454px] xxl:w-[305px] xxl:h-[430px] sm:w-[303px] md:w-[343px] sm:h-[479px] md:ml-[3px] ml-0">
<RecentPurchase />

  {/* Content */}
  <div className="bg-muted h-[250px] mt-4 rounded"></div>
</div>

<div className="lg:col-span-3 xl:col-span-1 xxl:col-span-1 bg-white p-6 rounded-lg relative xxxl:w-[371px] xxxl:h-[476px] xxl:w-[316px] xxl:h-[430px] sm:w-[303px] md:w-[343px] sm:h-[479px] md:ml-[3px] ml-0">
  <ContentCard />

  {/* Placeholder content */}
  <div className="bg-muted h-[250px] mt-4 rounded"></div>
</div>

<div className="lg:col-span-3 xl:col-span-1 xxl:col-span-1 bg-white p-6 rounded-lg relative xxxl:w-[356px] xxxl:h-[476px] xxl:w-[305px] xxl:h-[430px] sm:w-[303px] md:w-[343px] sm:h-[479px] md:ml-[3px] ml-0">
  <CountriesCard />

  {/* Placeholder content */}
  <div className="bg-muted h-[250px] mt-4 rounded"></div>
</div>


<div className="lg:col-span-3 xl:col-span-2 xxl:col-span-1 bg-white p-6 rounded-lg relative xxxl:w-[356px] xxxl:h-[476px] xxl:w-[305px] xxl:h-[430px] sm:w-[303px] md:w-[343px] sm:h-[549px] md:ml-[3px] ml-0">
<VisitorSources />

  {/* Content */}
  <div className="bg-muted h-[250px] mt-4 rounded"></div>


</div>

</div>
</div>  
     );
   }
export default DashboardGrid;