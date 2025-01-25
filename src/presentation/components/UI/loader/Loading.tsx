import React from 'react';
import {motion }from 'framer-motion';
import "./loader.css"
const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex items-center justify-center"
    >
      <div className="loader">
        <div id="first">
          <div id="second">
            <div id="third"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
