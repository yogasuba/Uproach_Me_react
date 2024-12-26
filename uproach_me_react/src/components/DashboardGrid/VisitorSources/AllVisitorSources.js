const AllVisitorSources = () => {

  
    const visitorData = [
      { platform: 'Instagram', username: '@vignesh03', followers: '30k Followers', views: 231 },
      { platform: 'Linkedin', username: '@vignesh03', followers: '30k Followers', views: 500 },
      { platform: 'Youtube', username: '@vignesh03', followers: '30k Followers', views: 231 },
      { platform: 'Facebook', username: '@vignesh03', followers: '30k Followers', views: 350 },
      { platform: 'X', username: '@vignesh03', followers: '30k Followers', views: 231 },
      { platform: 'TikTok', username: '@vignesh03', followers: '30k Followers', views: 100 },
    ];
  
    const platformBackgrounds = {
      Instagram: 'bg-gradient-to-t via-[#ff5050] from-[#ffcc00] to-[#c91ff8]',
      Linkedin: 'bg-blue-700',
      Youtube: 'bg-red-600',
      Facebook: 'bg-[#0866FF]',
      X: 'bg-black',
      TikTok: 'bg-gradient-to-r from-[#00f1f1] to-[#ff0050]',
    };
  
    const platformIcons = {
      Instagram: '/social-icons/ion_logo-instagram.svg',
      Linkedin: '/social-icons/linkedin.svg',
      Youtube: '/social-icons/youtube.svg',
      Facebook: '/social-icons/facebook.svg',
      X: '/social-icons/twitter.svg',
      TikTok: '/social-icons/tiktok.svg',
    };
  
    const VisitorSourceItem = ({ platform, username, followers, views }) => {
      const fillPercentage = Math.min((views / 500) * 100, 100); 
  
      return (
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className={`xxxl:w-10 xxxl:h-10 xxl:w-9 xxl:h-9 flex items-center justify-center rounded-full ${platformBackgrounds[platform]}`}>
              <img
                src={platformIcons[platform] || '/icons/default.png'}
                alt={`${platform} icon`}
                className="xxxl:w-[28px] xxxl:h-[28px] xxl:w-[24px] xxl:h-[24px] object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{platform}</p>
              <p className="xxxl:text-[12px] xxl:text-[11px] text-gray-500">
                {username} &bull; {followers}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="relative w-[40px] h-[8px] bg-gray-200 rounded-full mb-2">
              <div className="absolute top-0 left-0 h-2 rounded-full bg-blue-500" style={{ width: `${fillPercentage}%` }}></div>
            </div>
            <p className="xxxl:text-[12px] xxl:text-[11px] font-medium mt-1">{views > 0 ? `${views} Views` : '0 Views'}</p>
          </div>
        </div>
      );
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold">All Visitor Sources</h3>
        <div className="mt-2 xxl:space-y-2 xxxl:space-y-3">
          {visitorData.map((source, index) => (
            <div key={index}>
              <VisitorSourceItem {...source} />
              <hr className="border-t border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AllVisitorSources;
  