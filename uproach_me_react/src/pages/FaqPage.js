// app/faq/page.js

import React, { useState,useEffect } from 'react';

const FAQPage = () => {
  useEffect(() => {
    document.title = 'faq'; // Set your desired page title here
  }, []);

  const [expanded, setExpanded] = useState(null);

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "How to copy and paste components into Figma?",
      answer:
        "Firstly choose which component you need to copy by using our super-fast search page, then copy the respective screen size you need by clicking on the copy button. Now you have the Figma Component in your clipboard you can paste it ('cmd + v' or 'ctrl + v') anywhere in your design files.",
      articleLink: "https://www.google.com/search?q=how+to+copy+and+paste+components+into+Figma",
    },
    {
      question: "How Frequently You will update the components?",
      answer: "Components will be updated on a monthly basis with new features and improvements.",
      articleLink: "https://www.google.com/search?q=component+update+frequency",
    },
    {
      question: "How Frequently You will update the components?",
      answer: "Components will be updated on a monthly basis with new features and improvements.",
      articleLink: "https://www.google.com/search?q=component+update+frequency",
    },
    {
      question: "How Frequently You will update the components?",
      answer: "Components will be updated on a monthly basis with new features and improvements.",
      articleLink: "https://www.google.com/search?q=component+update+frequency",
    },
    {
      question: "How Frequently You will update the components?",
      answer: "Components will be updated on a monthly basis with new features and improvements.",
      articleLink: "https://www.google.com/search?q=component+update+frequency",
    },
    {
      question: "How Frequently You will update the components?",
      answer: "Components will be updated on a monthly basis with new features and improvements.",
      articleLink: "https://www.google.com/search?q=component+update+frequency",
    },
  ];

  return (
    <div className="p-8 w-full xxl:min-h-screen sm:h-[1024px] bg-gray-50">
      <h1 className="text-[22px] font-semibold text-gray-800">FAQs</h1>
      <hr className="border-gray-300 mb-3 mt-3" />
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 xxl:w-[615px] sm:w-[295px] xxl:ml-[149px] xxxl:ml-[237px] rounded-[10px] mt-8"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2
                className={`font-medium ${
                  expanded === index ? "text-[22px] font-semibold" : "text-[16px]"
                } text-[#333333] transition-all duration-300`}
              >
                {faq.question}
              </h2>

              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg font-bold text-gray-700 hover:bg-gray-100"
              >
                {expanded === index ? "×" : "+"}
              </button>
            </div>
            {expanded === index && (
              <div className="mt-2">
                <p className="text-gray-600 text-[14px]">{faq.answer}</p>
                {faq.articleLink && (
                  <a
                    href={faq.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center mt-4 bg-[#F6F6F9] text-[#333333] p-4 xxl:w-[581px] sm:w-[262px] rounded-lg border border-[#E7E7EF] font-medium"
                  >
                    Article related to this Question comes here 
                    <img
                      src="/icons/left_arrow.svg" // Replace with your arrow image path
                      alt="Arrow Icon"
                      className=" w-[24px] h-[24px]"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
