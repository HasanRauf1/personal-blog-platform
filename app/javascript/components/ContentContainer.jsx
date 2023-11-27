import React from 'react';

const ContentContainer = ({ children }) => {
  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20"> {/* Adjust the padding-top value based on your navbar's height */}
      {children}
    </div>
  );
};

export default ContentContainer;
