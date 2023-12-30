import React from 'react';

const ContentContainer = ({ children }) => {
  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-40">
      {children}
    </div>
  );
};

export default ContentContainer;
