import React, { useState } from "react";
import "./FAQ.css"; 

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "",
      answer: ""
    },
    {
      question: "",
      answer: ""
    },
    {
      question: "",
      answer: ""
    }
  ];

  return (
    <div className="faq-container">
      <h1>FAQ – Często Zadawane Pytania</h1>
      {faqs.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
          </div>
          {openIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;